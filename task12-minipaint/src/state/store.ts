import { configureStore } from "@reduxjs/toolkit";
import authInfoReducer from "./authInfo/authInfoSlice.ts";
import snackbarReducer from "./snackbar/snackbarSlice.ts";
import toolReducer from "./tool/toolSlice.ts";
import projectsReducer from "./projects/projectsSlice.ts";
import canvasUndoReducer from "./canvasUndo/canvasUndoSlice.ts";

export const store = configureStore({
  reducer: {
    authInfo: authInfoReducer,
    snackbar: snackbarReducer,
    tool: toolReducer,
    projects: projectsReducer,
    canvasUndo: canvasUndoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
