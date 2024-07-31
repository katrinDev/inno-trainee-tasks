import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {
  setCurrentPrName,
  setProjects,
} from "../../state/projects/projectsSlice";
import * as StorageService from "../../services/StorageService";
import * as ProjectsService from "../../services/ProjectsService";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Spinner from "../utils/Spinner";

type ModalAskProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  minWidth: "25rem",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  padding: theme.spacing(4),
}));

const ModalPaper = styled(Paper)(({ theme }) => ({
  height: "16rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",

  padding: theme.spacing(2),
}));

type ProjectNameForm = {
  projectName: string;
};

export default function ModalAsk({
  isOpen,
  setIsOpen,
  canvasRef,
  isLoading,
  setIsLoading,
}: ModalAskProps) {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.authInfo.userId);
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProjectNameForm>();

  const fetchProjects = async () => {
    const { data: projectsData, error: projectsError } =
      await ProjectsService.getAllUserProjects(userId);

    if (projectsError) throw new Error(projectsError.message);

    dispatch(setProjects(projectsData));
  };

  const formSubmit: SubmitHandler<ProjectNameForm> = async (
    formData,
    event
  ) => {
    event?.preventDefault();

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      dispatch(setCurrentPrName(formData.projectName));
      try {
        if (canvasRef.current) {
          canvasRef.current.toBlob(async (blob) => {
            const { data, error } = await StorageService.fileUpload(blob!);

            if (error) throw new Error(error.message);

            const fileName = data.path.split("/")[1];

            const { data: dbData, error: dbError } =
              await ProjectsService.insertProject({
                file_name: fileName,
                project_name: formData.projectName,
                user_id: userId,
              });

            if (dbError) throw new Error(dbError.message);

            await fetchProjects();
            navigate(`/projects/${dbData[0].id}`);

            dispatch(
              setSnackbarProps({
                severity: "success",
                text: "Changes were saved successfully!",
              })
            );
          });
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setSnackbarProps({ severity: "error", text: err.message }));
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return isLoading ? (
    <Spinner />
  ) : (
    <StyledModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-title"
    >
      <ModalPaper elevation={3}>
        <IconButton onClick={() => setIsOpen(false)} sx={{ alignSelf: "end" }}>
          <CloseRoundedIcon />
        </IconButton>
        <Typography variant="h6" id="modal-title">
          Specify the name of your project:
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(formSubmit)}
          noValidate
          sx={{ mx: 4 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="project-name"
            autoFocus
            error={!!errors.projectName}
            {...register("projectName", {
              required: "Required field",
              maxLength: { value: 15, message: "Name is too long" },
            })}
            helperText={errors.projectName ? errors.projectName.message : null}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </ModalPaper>
    </StyledModal>
  );
}
