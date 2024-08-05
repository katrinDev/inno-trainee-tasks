import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import * as StorageService from "../../services/StorageService";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import { Link } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import * as ProjectsService from "../../services/ProjectsService";
import { setProjects } from "../../state/projects/projectsSlice";

export default function ProjectCard({ project }: { project: Project }) {
  const [projectUrl, setProjectUrl] = useState<string>("");
  const email = useSelector((state: RootState) => state.authInfo.email);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.authInfo.userId);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUrl() {
      const { data } = await StorageService.getFileUrl(project.file_name);

      setProjectUrl(
        data.publicUrl + `?t=${new Date(project.updated_at).getTime()}`
      );
    }

    getUrl();
  }, [project]);

  const deleteProject = async () => {
    try {
      setIsDeleteLoading(true);
      const { error } = await StorageService.deleteFile(project.file_name);

      if (error) throw new Error(error.message);

      const { error: dbError } = await ProjectsService.deleteFile(
        project.file_name
      );

      if (dbError) throw new Error(dbError.message);

      const { data: projectsData, error: projectsError } =
        await ProjectsService.getAllUserProjects(userId);

      if (projectsError) throw new Error(projectsError.message);

      dispatch(setProjects(projectsData));

      dispatch(
        setSnackbarProps({
          severity: "success",
          text: `Project ${project.project_name} was deleted successfully`,
        })
      );

      setIsDeleteLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(setSnackbarProps({ severity: "error", text: err.message }));
      }
    }
  };

  return isDeleteLoading ? (
    <Spinner />
  ) : (
    <Suspense fallback={<Spinner />}>
      <Card
        sx={{
          width: "17rem",
          filter: "drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.1))",
        }}
      >
        <CardHeader title={project.project_name} subheader={email}></CardHeader>
        <CardMedia
          component="img"
          height="150rem"
          image={projectUrl}
          alt="Canvas image"
        />
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={`/projects/${project.id}`}>
            <IconButton aria-label="edit" sx={{ color: "primary.main" }}>
              <DrawRoundedIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            sx={{ color: "error.main" }}
            onClick={deleteProject}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Suspense>
  );
}
