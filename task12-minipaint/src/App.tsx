import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAuthInfo } from "./state/authInfo/authInfoSlice";
import { AppDispatch, RootState } from "./state/store";
import { closeSnackbar } from "./state/snackbar/snackbarSlice";
import InfoSnackbar from "./components/utils/InfoSnackbar";
import Spinner from "./components/utils/Spinner";

function App() {
  const snackbarProps = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event) => {
      setIsLoading(true);
      dispatch(updateUserAuthInfo());
      setIsLoading(false);
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

  return isLoading ? (
    <Spinner />
  ) : (
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
