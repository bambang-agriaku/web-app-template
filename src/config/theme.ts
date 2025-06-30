import { createTheme } from "@mui/material";
import React from "react";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#9333aa",
      main: "#780095",
      dark: "#540068",
      contrastText: "#fff",
    },
    neutral: "#ECF1F9",
  },
  typography: {
    fontFamily: '"Inter Variable", sans-serif',
    header: {
      fontWeight: "700", // bold
      fontSize: "20px",
      lineHeight: "26px",
    },
    title1: {
      fontWeight: "700", // bold
      fontSize: "18px",
      lineHeight: "24px",
    },
    title2: {
      fontWeight: "700", // bold
      fontSize: "16px",
      lineHeight: "22px",
    },
    title3: {
      fontWeight: "600", // semi bold
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "0.1px",
    },
    title4: {
      fontWeight: "500", // medium
      fontSize: "14px",
      lineHeight: "18px",
      letterSpacing: "0.1px",
    },
    description: {
      fontWeight: "400", // regular
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0px",
    },
    text: {
      fontWeight: "400", // regular
      fontSize: "14px",
      lineHeight: "20px",
    },
    caption1: {
      fontWeight: "400", // regular
      fontSize: "14px",
      lineHeight: "18px",
    },
    caption2: {
      fontWeight: "400", // regular
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    caption3: {
      fontWeight: "600", // semi bold
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    category: {
      fontWeight: "700", // bold
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
    buttonL: {
      fontWeight: "400", // regular
      fontSize: "14px",
      lineHeight: "22px",
    },
    buttonM: {
      fontWeight: "400", // regular
      fontSize: "14px",
      lineHeight: "20px",
    },
    buttonS: {
      fontWeight: "400", // regular
      fontSize: "14px",
      lineHeight: "16px",
      letterSpacing: "0.1px",
    },
  },
});

theme.components = {
  MuiCssBaseline: {
    styleOverrides: () => {
      return {
        body: {
          backgroundColor: "white",
        },
      };
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: {
        color: theme.palette.error.main,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: "8px 16px",
        textTransform: "capitalize",
        fontWeight: 600,
        fontSize: "16px",
        borderRadius: "16px",
        boxShadow: "none",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: "16px",
      },
    },
  },
};

declare module "@mui/material/styles" {
  interface TypographyVariants {
    header: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
    description: React.CSSProperties;
    text: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    caption3: React.CSSProperties;
    category: React.CSSProperties;
    buttonL: React.CSSProperties;
    buttonM: React.CSSProperties;
    buttonS: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    header?: React.CSSProperties;
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    title3?: React.CSSProperties;
    title4?: React.CSSProperties;
    description?: React.CSSProperties;
    text?: React.CSSProperties;
    caption1?: React.CSSProperties;
    caption2?: React.CSSProperties;
    caption3?: React.CSSProperties;
    category?: React.CSSProperties;
    buttonL?: React.CSSProperties;
    buttonM?: React.CSSProperties;
    buttonS?: React.CSSProperties;
  }

  interface Palette {
    neutral: string;
  }

  interface PaletteOptions {
    neutral: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    header: true;
    title1: true;
    title2: true;
    title3: true;
    title4: true;
    description: true;
    text: true;
    caption1: true;
    caption2: true;
    caption3: true;
    category: true;
    buttonL: true;
    buttonM: true;
    buttonS: true;

    // disable default
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}
