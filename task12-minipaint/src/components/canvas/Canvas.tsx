import { IconButton } from "@mui/material";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import Crop54RoundedIcon from "@mui/icons-material/Crop54Rounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
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

type ToolButton = {
  icon: React.ReactElement;
  onClick: () => void;
};

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let colorBeforeEraser = useRef<string | CanvasGradient | CanvasPattern>("");
  let isPrevEraser = useRef<boolean>(false);

  useEffect(() => {
    if (canvasRef.current) {
      dispatch(setTool(new Brush(canvasRef.current)));
    }
  }, []);

  const eraserColorCheck = () => {
    if (isPrevEraser.current && canvasRef.current) {
      let context = canvasRef.current.getContext("2d");
      context!.strokeStyle = colorBeforeEraser.current;
      isPrevEraser.current = false;
    }
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
      onClick: () => {},
    },
    { icon: <RedoRoundedIcon />, onClick: () => {} },
    { icon: <SaveRoundedIcon />, onClick: () => {} },
  ];

  return (
    <>
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
        <CanvasBlock ref={canvasRef} width={600} height={400} />
      </CanvasContainer>
    </>
  );
}
