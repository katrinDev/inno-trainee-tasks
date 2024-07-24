import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CanvasUndoState = {
  undoList: string[];
  redoList: string[];
};

type CanvasData = {
  height: number;
  width: number;
  context: CanvasRenderingContext2D;
};

const initialState: CanvasUndoState = {
  undoList: [],
  redoList: [],
};

const canvasUndoSlice = createSlice({
  name: "canvasUndo",
  initialState,
  reducers: {
    pushToUndo: (state, action: PayloadAction<string>) => {
      state.undoList = [...state.undoList, action.payload];
    },
    pushToRedo: (state, action: PayloadAction<string>) => {
      state.undoList = [...state.redoList, action.payload];
    },

    undo: (state, action: PayloadAction<CanvasData>) => {
      if (state.undoList.length > 0) {
        // state.undoList = state.undoList.slice(0, -1);
        let undoListCopy = state.undoList.slice();

        let dataUrl = undoListCopy.pop();
        let img = new Image();
        img.src = dataUrl ?? "";
        img.onload = () => {
          const { width, height, context } = action.payload;

          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0, width, height);
        };
        state.undoList = undoListCopy;
      }
    },
  },
});

export const { pushToUndo, pushToRedo, undo } = canvasUndoSlice.actions;
export default canvasUndoSlice.reducer;
