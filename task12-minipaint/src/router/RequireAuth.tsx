import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }: React.PropsWithChildren) {
  const authInfo = useSelector((state: RootState) => state.authInfo);

  return authInfo.isLoading === true ? (
    <div>Loading...</div>
  ) : authInfo.isUserAuthorized === true ? (
    children
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
