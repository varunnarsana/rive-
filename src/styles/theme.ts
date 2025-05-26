import type { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: {
      champagneBeige: '#F5E6D3',
      dustyRose: '#E8B4B8',
      sageGreen: '#B4C5B0',
      slateBlue: '#6B7A8F',
    },
    secondary: {
      lightBeige: '#FFF9F5',
      darkRose: '#D49EA2',
      darkSage: '#95A691',
      darkSlate: '#4A5564',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5D6D7E',
      light: '#8395A7',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F5',
    },
  },
  typography: {
    primary: "'Playfair Display', serif",
    secondary: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif",
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
};

export { theme }; 