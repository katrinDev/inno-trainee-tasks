import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";
import { SIGN_IN } from "./paths";
import Spinner from "../components/utils/Spinner";

export default function RequireAuth({ children }: React.PropsWithChildren) {
  const authInfo = useSelector((state: RootState) => state.authInfo);

  return authInfo.isLoading ? (
    <Spinner />
  ) : authInfo.isUserAuthorized ? (
    children
  ) : (
    <Navigate to={SIGN_IN} replace />
  );
}
