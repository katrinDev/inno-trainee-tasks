import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";
import Spinner from "../components/utils/Spinner";
import { SIGN_IN } from "./paths";

export default function RequireAuth({ children }: React.PropsWithChildren) {
  const authInfo = useSelector((state: RootState) => state.authInfo);

  return authInfo.isLoading === true ? (
    <Spinner />
  ) : authInfo.isUserAuthorized === true ? (
    children
  ) : (
    <Navigate to={SIGN_IN} replace />
  );
}
