import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { Suspense } from "react";
import Spinner from "../utils/Spinner";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <Suspense fallback={<Spinner />}>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 16 }}>
        {projects.map((project) => (
          <Grid
            item
            key={project.id}
            xs={4}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Suspense>
  );
}
