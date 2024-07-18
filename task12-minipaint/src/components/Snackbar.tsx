import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type AlertSeverity = "error" | "warning" | "info" | "success";

type SnackbarProps = {
  isOpen: boolean;
  severity: AlertSeverity;
  text: string;
};

export default function InfoSnackbar({
  isOpen,
  severity,
  text,
}: SnackbarProps) {
  const [open, setIsOpen] = useState<boolean>(isOpen);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway" && event) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="standard"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
