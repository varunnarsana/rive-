import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        slateBlue: string;
        dustyRose: string;
        sageGreen: string;
      };
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    typography: {
      primary: string;
      secondary: string;
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
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    transitions: {
      default: string;
    };
  }
} 