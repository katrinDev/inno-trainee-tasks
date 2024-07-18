import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Canvas from "../../components/canvas/Canvas";

type ProjectParams = {
  projectId: string;
};

const ProjectContainer = styled(Box)(() => ({
  width: "45rem",
  aspectRatio: "1.3/1",
  boxShadow: "0 4px 5px grey",
  backgroundColor: "#E8E9EB",
}));

export default function ProjectPage() {
  const params = useParams<ProjectParams>();

  return (
    <>
      {/* Project Page {params.projectId} */}
      <ProjectContainer>
        <Canvas />
      </ProjectContainer>
    </>
  );
}
