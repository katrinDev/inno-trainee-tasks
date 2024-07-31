import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";
import { SIGN_IN } from "./paths";

export default function RequireAuth({ children }: React.PropsWithChildren) {
  const isUserAuthorized = useSelector(
    (state: RootState) => state.authInfo.isUserAuthorized
  );

  return isUserAuthorized ? children : <Navigate to={SIGN_IN} replace />;
}
