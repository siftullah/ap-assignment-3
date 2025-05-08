import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from '../components/Layout';
import "@/styles/globals.css";
import { ThemeProvider } from '../utils/ThemeContext';
import { useMemo } from 'react';
import { useTheme } from '../utils/ThemeContext';

// Function to create theme based on mode
function ThemedApp({ Component, pageProps }) {
  const { mode } = useTheme();
  
  // Create a theme instance based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
            dark: '#1565c0',
          },
          secondary: {
            main: '#9c27b0',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? '#333333' : '#ffffff',
            secondary: mode === 'light' ? '#5a5a5a' : '#aaaaaa',
          }
        },
        typography: {
          fontFamily: 'Roboto, Arial, sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
          },
          h4: {
            fontWeight: 600,
          },
          button: {
            textTransform: 'none',
            fontWeight: 500,
          }
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#1976d2' : '#272727',
              }
            }
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 2px 10px rgba(0, 0, 0, 0.08)' 
                  : '0 2px 10px rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: mode === 'light' 
                    ? '0 8px 16px rgba(0, 0, 0, 0.1)' 
                    : '0 8px 16px rgba(0, 0, 0, 0.4)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: '4px',
                padding: '6px 16px',
              },
            },
          },
          MuiContainer: {
            styleOverrides: {
              root: {
                paddingLeft: 24,
                paddingRight: 24,
                '@media (min-width: 600px)': {
                  paddingLeft: 32,
                  paddingRight: 32,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MuiThemeProvider>
  );
}

export default function App(props) {
  return (
    <ThemeProvider>
      <ThemedApp {...props} />
    </ThemeProvider>
  );
}
