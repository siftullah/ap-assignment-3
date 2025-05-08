import { useRouter } from 'next/router';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Custom404() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 3
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: '8rem',
            background: 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          404
        </Typography>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Page Not Found
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          The page you are looking for does not exist.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/')}
          sx={{ 
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Go Home
        </Button>
      </Paper>
    </Container>
  );
} 