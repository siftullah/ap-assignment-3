import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import MovieIcon from '@mui/icons-material/Movie';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../utils/ThemeContext';

export default function Layout({ children }) {
  const router = useRouter();
  const { mode, toggleColorMode } = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <MovieIcon sx={{ mr: 1.5, fontSize: 28 }} />
          
          <Typography 
            variant="h6" 
            component="div"
            onClick={() => router.push('/')}
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              fontSize: '1.25rem',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            Movie House
          </Typography>
          
          <Button 
            color="inherit" 
            startIcon={<HomeIcon />}
            onClick={() => router.push('/')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 0,
              py: 2.3,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            HOME
          </Button>

          <Button 
            color="inherit" 
            startIcon={<LocalMoviesIcon />}
            onClick={() => router.push('/movies')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 0,
              py: 2.3,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            MOVIES
          </Button>

          <Button 
            color="inherit" 
            startIcon={<PersonIcon />}
            onClick={() => router.push('/directors')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 0,
              py: 2.3,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            DIRECTORS
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<CategoryIcon />}
            onClick={() => router.push('/genres')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 0,
              py: 2.3, 
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            GENRES
          </Button>
          
          <Button 
            color="inherit"
            startIcon={<HelpOutlineIcon />}
            onClick={() => router.push('/help')}
            sx={{ 
              fontWeight: 500,
              borderRadius: 0,
              py: 2.3,
              px: 2, 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            HELP
          </Button>
          
          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton 
              color="inherit" 
              onClick={toggleColorMode} 
              sx={{ ml: 1 }}
              aria-label="toggle theme"
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 4, maxWidth: 'lg' }}>
        {children}
      </Container>
      
      <Box
        component="footer"
        sx={{
          py: 2.5,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.mode === 'light' ? '#1976d2' : '#272727',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
            Movie House - Your ultimate movie database
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 0.5 }}>
            &copy; {new Date().getFullYear()} Movie House. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
} 