import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CanvasState = {
  value: HTMLCanvasElement | null;
};

const initialState: CanvasState = {
  value: null,
};

const canvas = {
  current: null,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<HTMLCanvasElement | null>) => {
      //   state.value = action.payload;
    },
  },
});
