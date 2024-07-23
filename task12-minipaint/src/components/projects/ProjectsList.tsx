import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { Suspense } from "react";
import Spinner from "../utils/Spinner";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={3} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
}
