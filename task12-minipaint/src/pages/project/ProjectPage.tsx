import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Canvas from "../../components/canvas/Canvas";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setCurrentProject } from "../../state/projects/projectsSlice";
import { memo, Suspense, useEffect } from "react";
import Spinner from "../../components/utils/Spinner";
import * as ProjectsService from "../../services/ProjectsService";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";

type ProjectParams = {
  id: string;
};

const BoardContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "34rem",
    aspectRatio: "1.2/1",
  },
  [theme.breakpoints.down("sm")]: {
    width: "24rem",
    aspectRatio: "1/1.5",
  },

  width: "45rem",
  aspectRatio: "1.3/1",
  boxShadow: "0 4px 5px grey",
  backgroundColor: "#E8E9EB",
  marginTop: theme.spacing(2),
}));

const ProjectPage = () => {
  const { id } = useParams<ProjectParams>();
  const projectsSlice = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const { data, error } = await ProjectsService.getProjectById(id);

          if (data) dispatch(setCurrentProject(data[0]));
          else throw new Error(error.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setSnackbarProps({ severity: "error", text: err.message }));
        }
      }
    };

    fetchProject();
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {id && projectsSlice.currentProject?.project_name && (
            <Typography variant="h6">
              {projectsSlice.currentProject.project_name}
            </Typography>
          )}
          <BoardContainer>
            <Canvas isNew={!id} />
          </BoardContainer>
        </Box>
      </Suspense>
    </>
  );
};

export default memo(ProjectPage);
