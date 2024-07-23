import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Canvas from "../../components/canvas/Canvas";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setCurrentProject } from "../../state/projects/projectsSlice";
import { Suspense, useEffect } from "react";
import Spinner from "../../components/utils/Spinner";

type ProjectParams = {
  projectId: string;
};

const BoardContainer = styled(Box)(({ theme }) => ({
  width: "45rem",
  aspectRatio: "1.3/1",
  boxShadow: "0 4px 5px grey",
  backgroundColor: "#E8E9EB",
  marginTop: theme.spacing(2),
}));

export default function ProjectPage() {
  const params = useParams<ProjectParams>();
  const projectsSlice = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const ourProject = projectsSlice.projects.find(
      (pr) => pr.id === params.projectId
    );

    if (ourProject) dispatch(setCurrentProject(ourProject));
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
          {projectsSlice.currentProject?.project_name && (
            <Typography variant="h6">
              {projectsSlice.currentProject.project_name}
            </Typography>
          )}
          <BoardContainer>
            <Canvas />
          </BoardContainer>
        </Box>
      </Suspense>
    </>
  );
}
