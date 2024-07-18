import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/signIn/SignIn";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import { PROJECT, PROJECTS, SIGN_IN, SIGN_UP } from "./paths";
import ProjectsPage from "../pages/projects/ProjectsPage";
import ProjectPage from "../pages/project/ProjectPage";
import SignUp from "../pages/signUp/SignUp";
import RequireAuth from "./RequireAuth";
import BasicLayout from "../pages/layout/BasicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: SIGN_IN,
    element: <SignIn />,
  },
  {
    path: SIGN_UP,
    element: <SignUp />,
  },
  {
    path: PROJECTS,
    element: (
      <RequireAuth>
        <BasicLayout>
          <ProjectsPage />
        </BasicLayout>
      </RequireAuth>
    ),
  },

  {
    path: PROJECT,
    element: (
      <RequireAuth>
        <BasicLayout>
          <ProjectPage />
        </BasicLayout>
      </RequireAuth>
    ),
  },
]);

export default router;
