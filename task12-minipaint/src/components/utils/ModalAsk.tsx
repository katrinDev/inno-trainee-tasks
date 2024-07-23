import { Button, Modal, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Dispatch, SetStateAction, useState } from "react";

type ModalAskProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  minWidth: "25rem",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  padding: theme.spacing(4),
}));

export default function ModalAsk({ isOpen, setIsOpen }: ModalAskProps) {
  const [projectName, setProjectName] = useState<string>("");

  const handleClick = () => {};

  return (
    <StyledModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-title"
    >
      <div>
        <Typography variant="h6" id="modal-title">
          Specify the name of your new project:
        </Typography>

        <TextField
          margin="normal"
          required
          fullWidth
          autoFocus
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleClick}
        >
          Confirm
        </Button>
      </div>
    </StyledModal>
  );
}
