import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../state/store";

export default function ProjectsPage() {
  const authInfo = useSelector((state: RootState) => state.authInfo);

  let arr = [1, 2, 3];
  return (
    <>
      <div className="flex flex-col gap-2">
        {arr.map((project) => (
          <Link key={project} to={`/projects/${project}`}>
            Project {project}
          </Link>
        ))}
        <div>{authInfo.session?.user?.user_metadata.full_name}</div>

        {authInfo.isEmailVerified ? (
          <div>Verified </div>
        ) : (
          <div>Unverified </div>
        )}
        {authInfo.isUserAuthorized ? (
          <div>Authorized </div>
        ) : (
          <div>Unauthorized </div>
        )}
      </div>
    </>
  );
}
