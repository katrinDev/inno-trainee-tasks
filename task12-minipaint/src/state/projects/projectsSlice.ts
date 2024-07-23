import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProjectsSlice = {
  projects: Project[];
  currentProject: Project | null;
};

const initialState: ProjectsSlice = {
  projects: [],
  currentProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject } = projectsSlice.actions;
export default projectsSlice.reducer;
