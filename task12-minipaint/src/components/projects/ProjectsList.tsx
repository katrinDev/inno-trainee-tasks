import { Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <>
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Stack>
    </>
  );
}
