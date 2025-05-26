export const theme = {
  colors: {
    primary: {
      slateBlue: '#6B7280',
      dustyRose: '#E11D48',
      sageGreen: '#059669'
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
      tertiary: '#E5E7EB'
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      light: '#6B7280'
    }
  },
  typography: {
    primary: "'Playfair Display', serif",
    secondary: "'Montserrat', sans-serif",
    body: "'Inter', sans-serif"
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  },
  transitions: {
    default: 'all 0.3s ease'
  }
} as const;

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: {
      primary: '#1F2937',
      secondary: '#374151',
      tertiary: '#4B5563'
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      light: '#9CA3AF'
    }
  }
} as const;

export type Theme = typeof theme; 