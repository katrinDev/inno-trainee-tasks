import { IconButton } from "@mui/material";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import Crop54RoundedIcon from "@mui/icons-material/Crop54Rounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  CanvasBlock,
  CanvasContainer,
  ColorInput,
  CanvasToolbar,
  NumberInput,
} from "./styles";
import {
  setFillColor,
  setLineWidth,
  setStrokeColor,
  setTool,
} from "../../state/tool/toolSlice";
import Brush from "../../tools/Brush";
import Rectangle from "../../tools/Rectangle";
import Circle from "../../tools/Circle";
import Eraser from "../../tools/Eraser";
import Line from "../../tools/Line";
import * as StorageService from "../../services/StorageService";
import { RootState } from "../../state/store";
import Spinner from "../utils/Spinner";
import ModalAsk from "../projects/SaveProjectModal";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import { pushToUndo, redo, undo } from "../../state/canvasUndo/canvasUndoSlice";

type ToolButton = {
  icon: React.ReactElement;
  onClick: () => void;
};

type CanvasProps = {
  isNew: boolean;
};

export default function Canvas({ isNew }: CanvasProps) {
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentProject = useSelector(
    (state: RootState) => state.projects.currentProject
  );

  let colorBeforeEraser = useRef<string | CanvasGradient | CanvasPattern>("");
  let isPrevEraser = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userId = useSelector((state: RootState) => state.authInfo.userId);

  const [saveModalIsOpen, setSaveModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    async function drawCurrentProject() {
      if (canvas && currentProject) {
        let context = canvas.getContext("2d");

        const {
          data: { publicUrl },
        } = await StorageService.getFileUrl(currentProject.file_name);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = publicUrl;
        img.onload = () => {
          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
      }
    }

    if (canvas) {
      dispatch(setTool(new Brush(canvas)));
    }

    if (!isNew) {
      drawCurrentProject();
    }
  }, [currentProject]);

  const eraserColorCheck = () => {
    if (isPrevEraser.current && canvasRef.current) {
      let context = canvasRef.current.getContext("2d");
      context!.strokeStyle = colorBeforeEraser.current;
      isPrevEraser.current = false;
    }
  };

  const editProjectHandle = async () => {
    try {
      if (canvasRef.current && currentProject) {
        canvasRef.current.toBlob(async (blob) => {
          const { data, error } = await StorageService.updateFile(
            currentProject.file_name,
            blob!
          );

          if (error) throw new Error(error.message);

          dispatch(
            setSnackbarProps({
              severity: "success",
              text: `Project '${currentProject.project_name}' was updated successfully`,
            })
          );
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setSnackbarProps({ severity: "error", text: err.message }));
      }
    }
  };

  const mouseDownHandler = () => {
    if (canvasRef.current) dispatch(pushToUndo(canvasRef.current.toDataURL()));
  };

  const toolButtons: ToolButton[] = [
    {
      icon: <BrushRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          eraserColorCheck();
          dispatch(setTool(new Brush(canvasRef.current)));
        }
      },
    },
    {
      icon: <AutoFixHighRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          colorBeforeEraser.current =
            canvasRef.current.getContext("2d")!.strokeStyle;
          dispatch(setTool(new Eraser(canvasRef.current)));
          isPrevEraser.current = true;
        }
      },
    },
    {
      icon: <HorizontalRuleRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          eraserColorCheck();
          dispatch(setTool(new Line(canvasRef.current)));
        }
      },
    },
    {
      icon: <RadioButtonUncheckedRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          eraserColorCheck();
          dispatch(setTool(new Circle(canvasRef.current)));
        }
      },
    },
    {
      icon: <Crop54RoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          eraserColorCheck();
          dispatch(setTool(new Rectangle(canvasRef.current)));
        }
      },
    },
    {
      icon: <UndoRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          dispatch(
            undo({
              width: canvasRef.current.width,
              height: canvasRef.current.height,
              context: canvasRef.current.getContext("2d")!,
            })
          );
        }
      },
    },
    {
      icon: <RedoRoundedIcon />,
      onClick: () => {
        if (canvasRef.current) {
          dispatch(
            redo({
              width: canvasRef.current.width,
              height: canvasRef.current.height,
              context: canvasRef.current.getContext("2d")!,
            })
          );
        }
      },
    },
    {
      icon: <SaveRoundedIcon sx={{ color: "success.main" }} />,
      onClick: () => {
        if (isNew) setSaveModalIsOpen(true);
        else editProjectHandle();
      },
    },
  ];

  return (
    <Suspense fallback={<Spinner />}>
      <CanvasToolbar>
        {toolButtons.map((button, index) => (
          <IconButton
            key={index}
            size="medium"
            sx={
              index === 5
                ? { marginLeft: "auto", cursor: "pointer" }
                : { cursor: "pointer" }
            }
            onClick={button.onClick}
          >
            {button.icon}
          </IconButton>
        ))}
      </CanvasToolbar>

      <CanvasToolbar>
        <label htmlFor="line-width" style={{ marginLeft: "0.6rem" }}>
          Line width:
        </label>
        <NumberInput
          id="line-width"
          type="number"
          defaultValue={1}
          min={1}
          max={50}
          onChange={(e) => dispatch(setLineWidth(+e.target.value))}
        />

        <label htmlFor="">Fill:</label>
        <ColorInput
          onChange={(e) => dispatch(setFillColor(e.target.value))}
          type="color"
          id="fill-color"
        />

        <label htmlFor="stroke-color">Stroke:</label>
        <ColorInput
          onChange={(e) => dispatch(setStrokeColor(e.target.value))}
          type="color"
          id="stroke-color"
        />
      </CanvasToolbar>

      <CanvasContainer>
        <CanvasBlock
          onMouseDown={() => mouseDownHandler()}
          ref={canvasRef}
          width={600}
          height={400}
        />
      </CanvasContainer>
      <ModalAsk
        isOpen={saveModalIsOpen}
        setIsOpen={setSaveModalIsOpen}
        canvasRef={canvasRef}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Suspense>
  );
}
