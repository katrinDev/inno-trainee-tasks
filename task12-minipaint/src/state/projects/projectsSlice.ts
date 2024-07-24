import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsSlice = {
  projects: Project[];
  currentProject: Project | null;
  updated: boolean;
};

const initialState: ProjectsSlice = {
  projects: [],
  currentProject: null,
  updated: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    setCurrentPrName: (state, action: PayloadAction<string>) => {
      if (state.currentProject) {
        state.currentProject.project_name = action.payload;
      }
    },
    setUpdated: (state, action: PayloadAction<boolean>) => {
      state.updated = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject, setCurrentPrName, setUpdated } =
  projectsSlice.actions;
export default projectsSlice.reducer;
