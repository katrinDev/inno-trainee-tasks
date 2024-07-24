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
        let undoListCopy = state.undoList.slice();
        let redoListCopy = state.redoList.slice();

        let dataUrl = undoListCopy.pop();

        redoListCopy.push(dataUrl!);

        let img = new Image();
        img.src = dataUrl ?? "";
        img.onload = () => {
          const { width, height, context } = action.payload;

          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0, width, height);
        };

        state.undoList = undoListCopy;
        state.redoList = redoListCopy;

        console.log("undo");
        console.log(state.undoList, state.redoList);
      }
    },

    redo: (state, action: PayloadAction<CanvasData>) => {
      if (state.redoList.length > 0) {
        let redoListCopy = state.redoList.slice();
        let undoListCopy = state.undoList.slice();

        let dataUrl = redoListCopy.pop();

        undoListCopy.push(dataUrl!);

        const img = new Image();
        img.src = dataUrl ?? "";
        img.onload = () => {
          const { width, height, context } = action.payload;

          context.clearRect(0, 0, width, height);
          context.drawImage(img, 0, 0, width, height);
        };

        state.undoList = undoListCopy;
        state.redoList = redoListCopy;

        console.log("redo");
        console.log(state.undoList, state.redoList);
      }
    },
  },
});

export const { pushToUndo, pushToRedo, undo, redo } = canvasUndoSlice.actions;
export default canvasUndoSlice.reducer;
