"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#c76b3c" },
    text: { primary: "#2b2623", secondary: "rgba(43, 38, 35, 0.7)" },
    background: { paper: "#f4efe6", default: "#e6d7c3" },
    divider: "#c8c2b8",
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        },
      },
    },
  },
});

export default function DevMuiProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
