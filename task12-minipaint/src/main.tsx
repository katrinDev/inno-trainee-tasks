import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </StrictMode>
);
