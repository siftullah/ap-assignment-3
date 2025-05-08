import { useRouter } from 'next/router';
import { 
  Typography, 
  Box, 
  Paper, 
  Card, 
  CardContent,
  Alert,
  Button
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function HelpPage() 
{
  const router = useRouter();
  const { slug } = router.query;
  
  // Only proceed if slug is available (client-side)
  if (!slug) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  
  const path = '/help' + (Array.isArray(slug) ? '/' + slug.join('/') : '');
  
  return (
    <Box>
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 4, 
          p: 3, 
          backgroundColor: 'primary.main', 
          color: 'white',
          borderRadius: 2 
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Help - {path}
        </Typography>
      </Paper>
      
      <Box sx={{ mb: 4 }}>
        
        <Card sx={{ mb: 4, overflow: 'hidden' }}>
          <Box sx={{ 
            backgroundColor: 'rgba(25, 118, 210, 0.05)', 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <HelpOutlineIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              Help Information
            </Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              You are trying to reach: <strong>{path}</strong>
            </Alert>
            
            <Typography variant="body1" paragraph>
              This is a sample page.
            </Typography>
          
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/help')}
              >
                Back to Help Center
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
} 