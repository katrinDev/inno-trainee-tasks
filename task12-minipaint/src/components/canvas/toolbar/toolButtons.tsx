import BrushRoundedIcon from "@mui/icons-material/BrushRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import Crop54RoundedIcon from "@mui/icons-material/Crop54Rounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

type ToolButton = {
  icon: React.ReactElement;
  onClick?: () => void;
};

export const toolButtons: ToolButton[] = [
  { icon: <BrushRoundedIcon /> },
  { icon: <HorizontalRuleRoundedIcon /> },
  { icon: <RadioButtonUncheckedRoundedIcon /> },
  { icon: <Crop54RoundedIcon /> },
  { icon: <UndoRoundedIcon /> },
  { icon: <RedoRoundedIcon /> },
  { icon: <SaveRoundedIcon /> },
];
