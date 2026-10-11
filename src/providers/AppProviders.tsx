import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import type { PropsWithChildren } from "react";

import { store } from "../store/store";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
  },
});

const AppProviders = ({ children }: PropsWithChildren): React.ReactElement => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>{children}</Provider>
  </ThemeProvider>
);

export default AppProviders;