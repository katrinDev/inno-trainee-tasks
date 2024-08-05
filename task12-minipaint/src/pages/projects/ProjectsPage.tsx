import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { Suspense, useEffect } from "react";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";
import * as ProjectsService from "../../services/ProjectsService";
import { setProjects } from "../../state/projects/projectsSlice";
import { Container } from "@mui/material";
import ProjectsList from "../../components/projects/ProjectsList";
import Spinner from "../../components/utils/Spinner";

export default function ProjectsPage() {
  const authInfo = useSelector((state: RootState) => state.authInfo);
  const userProjects = useSelector(
    (state: RootState) => state.projects.projects
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.keys(authInfo).length !== 0) {
          const { data, error } = await ProjectsService.getAllUserProjects(
            authInfo.userId
          );
          if (data) dispatch(setProjects(data));
          else throw new Error(error.message);
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setSnackbarProps({ severity: "error", text: err.message }));
        }
      }
    };

    fetchData();
  }, [authInfo]);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <ProjectsList projects={userProjects!} />
        </Container>
      </Suspense>
    </>
  );
}
