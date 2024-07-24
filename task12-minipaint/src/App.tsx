import { useEffect } from "react";
import { supabase } from "./supabase/supabaseClient";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthorized,
  updateUserAuthInfo,
} from "./state/authInfo/authInfoSlice";
import { AppDispatch, RootState } from "./state/store";
import { closeSnackbar } from "./state/snackbar/snackbarSlice";
import InfoSnackbar from "./components/utils/InfoSnackbar";

function App() {
  const snackbarProps = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setIsAuthorized());

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event) => {
      dispatch(updateUserAuthInfo());
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway" && event) {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <>
      <RouterProvider router={router} />
      <InfoSnackbar
        isOpen={snackbarProps.isOpen}
        severity={snackbarProps.severity}
        text={snackbarProps.text}
        handleClose={handleClose}
      />
    </>
  );
}

export default App;
