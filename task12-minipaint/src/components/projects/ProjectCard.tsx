import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import StorageService from "../../services/StorageService";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import { Link } from "react-router-dom";
import Spinner from "../utils/Spinner";

export default function ProjectCard({ project }: { project: Project }) {
  const [projectUrl, setProjectUrl] = useState<string>("");
  const email = useSelector((state: RootState) => state.authInfo.email);

  useEffect(() => {
    async function getUrl() {
      const { data } = await StorageService.getFileUrl(project.file_name);

      setProjectUrl(data.publicUrl);
    }

    getUrl();
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Card
        sx={{
          width: "18rem",
          filter: "drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.1))",
        }}
      >
        <CardHeader title={project.project_name} subheader={email}></CardHeader>
        <CardMedia
          component="img"
          height="150rem"
          image={projectUrl}
          alt="Canvas image"
        />
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Link to={`/projects/${project.id}`}>
            <IconButton aria-label="edit" sx={{ color: "primary.main" }}>
              <DrawRoundedIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" sx={{ color: "error.main" }}>
            <DeleteRoundedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Suspense>
  );
}
