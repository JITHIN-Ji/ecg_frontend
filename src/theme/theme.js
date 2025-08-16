// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b0ff', // A vibrant, professional blue for buttons and accents
    },
    secondary: {
      main: '#4dd0e1',
    },
    background: {
      default: '#0A0F19', // The deep, dark blue from your screenshot
      paper: '#1A202E',   // The slightly lighter card background color
    },
    text: {
      primary: '#E5E7EB', // A clean, soft white for primary text
      secondary: '#9CA3AF', // A muted grey for secondary text
    },
    error: {
      main: '#F44336', // The distinct red for the "MI Detected" card
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    overline: {
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12, // Consistent rounded corners
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // Removing the gradient border for a cleaner look
          backgroundImage: 'none',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 20px',
        },
      },
    },
    MuiAccordion: {
        styleOverrides: {
            root: {
                // Ensure accordion background matches the new paper color
                backgroundColor: '#1A202E',
                backgroundImage: 'none',
            }
        }
    }
  },
});