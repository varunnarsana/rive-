// This file contains type definitions for your theme.
// It extends the styled-components DefaultTheme interface.

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        champagneBeige: string;
        dustyRose: string;
        sageGreen: string;
        slateBlue: string;
      };
      secondary: {
        lightBeige: string;
        darkRose: string;
        darkSage: string;
        darkSlate: string;
      };
      text: {
        primary: string;
        secondary: string;
        light: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
    };
    typography: {
      primary: string;
      secondary: string;
      body: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
