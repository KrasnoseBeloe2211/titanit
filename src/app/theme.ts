'use client'

import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#13a749",
      light: "#13a749",
      dark: "#13a749",
    },
    secondary: {
      main: "#8b949e",
    },
    background: {
      default: "#0d1117",
      paper: "rgba(22, 27, 34, 0.8)",
    },
    text: {
      primary: "#f0f6fc",
      secondary: "#8b949e",
    },
    divider: "rgba(48, 54, 61, 0.8)",
  },
  typography: {
    fontFamily: `"Inter", "SF Pro Display", -apple-system, sans-serif`,
    h1: {
      fontSize: "64px",
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "36px",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "28px",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(22, 27, 34, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(48, 54, 61, 0.8)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px",
        },
      },
    },
  },
});
