import { TextStyle } from 'react-native';

export const theme = {
  colors: {
    primary: '#C5A059', // Gold/Amber
    background: '#121212', // Very dark gray, almost black
    surface: '#1E1E1E', // Dark gray card background
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    border: '#27272A',
    error: '#EF4444',
    success: '#10B981',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    header: {
      fontSize: 28,
      fontWeight: '700' as TextStyle['fontWeight'],
      color: '#FFFFFF',
    },
    subheader: {
      fontSize: 20,
      fontWeight: '600' as TextStyle['fontWeight'],
      color: '#FFFFFF',
    },
    body: {
      fontSize: 16,
      color: '#A1A1AA',
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as TextStyle['fontWeight'],
      color: '#121212',
    },
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    full: 9999,
  },
};

export type Theme = typeof theme;
