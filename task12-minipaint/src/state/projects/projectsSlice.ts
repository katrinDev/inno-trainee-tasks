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
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    setCurrentPrName: (state, action: PayloadAction<string>) => {
      if (state.currentProject) {
        state.currentProject.project_name = action.payload;
      }
    },
    updateCurrentProject: (state, action: PayloadAction<Project | null>) => {
      const updatedProjects = state.projects.map((proj) =>
        proj.id === state.currentProject?.id ? action.payload : proj
      );

      state.projects = updatedProjects as Project[];
    },
  },
});

export const {
  setProjects,
  setCurrentProject,
  setCurrentPrName,
  updateCurrentProject,
} = projectsSlice.actions;

export default projectsSlice.reducer;
