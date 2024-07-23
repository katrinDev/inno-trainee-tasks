import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type AlertSeverity = "error" | "warning" | "info" | "success";

type SnackbarProps = {
  isOpen: boolean;
  severity: AlertSeverity;
  text: string;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

export default function InfoSnackbar({
  isOpen,
  severity,
  text,
  handleClose,
}: SnackbarProps) {
  return (
    <Snackbar
      open={isOpen}
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
