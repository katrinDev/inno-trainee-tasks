import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      headerHeight: string;
      canvasToolbarHeight: string;
    };
  }

  interface ThemeOptions {
    custom: {
      headerHeight: string;
      canvasToolbarHeight: string;
    };
  }
}

const theme = createTheme({
  custom: {
    headerHeight: "3rem",
    canvasToolbarHeight: "2rem",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "3rem",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "@media (min-width:0px)": {
            minHeight: "2rem",
          },
        },
      },
    },
  },
});

export default theme;
