import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AlertSeverity = "error" | "warning" | "info" | "success";

type SnackbarProps = {
  isOpen: boolean;
  severity: AlertSeverity;
  text: string;
};

const initialState: SnackbarProps = {
  isOpen: false,
  severity: "success",
  text: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarProps: (
      state,
      action: PayloadAction<Omit<SnackbarProps, "isOpen">>
    ) => {
      state.isOpen = true;
      state.severity = action.payload.severity;
      state.text = action.payload.text;
    },
    closeSnackbar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setSnackbarProps, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
