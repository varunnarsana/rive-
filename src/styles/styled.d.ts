import 'styled-components';

type ColorPalette = {
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

type Typography = {
  primary: string;
  secondary: string;
  body: string;
};

type Spacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

type BorderRadius = {
  sm: string;
  md: string;
  lg: string;
  full: string;
};

type Shadows = {
  sm: string;
  md: string;
  lg: string;
};

type Transitions = {
  default: string;
  fast: string;
  slow: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorPalette;
    typography: Typography;
    spacing: Spacing;
    borderRadius: BorderRadius;
    shadows: Shadows;
    transitions: Transitions;
  }
} 