import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

const CanvasToolbar = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  height: theme.custom.canvasToolbarHeight,
  boxShadow: "0 2px 3px grey",
  gap: theme.spacing(0.5),
}));

const ColorInput = styled("input")(() => ({
  width: "2rem",
  border: "none",
  background: "transparent",

  marginRight: "1rem",
}));

const CanvasContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: `calc(100% - ${theme.custom.canvasToolbarHeight} * 2)`,
}));

const CanvasBlock = styled("canvas")(() => ({
  backgroundColor: "white",
  border: "1px solid grey",
}));

const NumberInput = styled("input")(() => ({
  border: "none",
  width: "3rem",
  textAlign: "center",
  marginLeft: "0.5rem",
  marginRight: "1rem",
}));

export { CanvasToolbar, ColorInput, CanvasContainer, CanvasBlock, NumberInput };
