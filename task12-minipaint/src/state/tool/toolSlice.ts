import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Tool from "../../tools/Tool";

type ToolState = {
  value: Tool | null;
};

const initialState = {} as ToolState;

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool | null>) => {
      state.value = action.payload;
    },
    setFillColor(state, action: PayloadAction<string>) {
      if (state.value) {
        state.value.fillColor = action.payload;
      }
    },
    setStrokeColor(state, action: PayloadAction<string>) {
      if (state.value) {
        state.value.strokeColor = action.payload;
      }
    },
    setLineWidth(state, action: PayloadAction<number>) {
      if (state.value) {
        state.value.lineWidth = action.payload;
      }
    },
  },
});

export const { setTool, setFillColor, setStrokeColor, setLineWidth } =
  toolSlice.actions;

export default toolSlice.reducer;
