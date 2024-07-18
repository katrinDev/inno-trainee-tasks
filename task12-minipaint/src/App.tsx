import { useEffect } from "react";
import { supabase } from "./supabase/supabaseClient";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import { Alert, CssBaseline, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSession, updateUserAuthInfo } from "./state/authInfo/authInfoSlice";
import { AppDispatch, RootState } from "./state/store";
import { closeSnackbar } from "./state/snackbar/snackbarSlice";

function App() {
  const snackbarProps = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(updateUserAuthInfo());
      dispatch(setSession(session));
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
      <CssBaseline />
      <RouterProvider router={router} />
      <Snackbar
        open={snackbarProps.isOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarProps.severity}
          variant="standard"
          sx={{ width: "100%" }}
        >
          {snackbarProps.text}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
