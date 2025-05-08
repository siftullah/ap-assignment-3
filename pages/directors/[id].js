import { useRouter } from 'next/router';
import useSWR from 'swr';
import MovieCard from '../../components/MovieCard';
import { 
  Typography, 
  Box, 
  Paper, 
  Card, 
  CardContent,
  CircularProgress,
  Alert,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function DirectorDetails() {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const { data, error } = useSWR(id ? `/api/directors/${id}` : null, fetcher);

  if (error) return (
    <Alert severity="error" sx={{ mt: 4, mb: 4 }}>
      Failed to load director. Please try again later.
    </Alert>
  );
  
  if (!data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const { director, movies } = data;
  
  if (!director) {
    return (
      <Alert severity="error" sx={{ mt: 4, mb: 4 }}>
        Director not found.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          mb: 4, 
          py: 2.5,
          backgroundColor: '#1976d2', 
          color: 'white',
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          sx={{ 
            fontWeight: 500,
            letterSpacing: '0.5px'
          }}
        >
          {director.name}
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>

        {/* Biography Card */}
        <Card 
          sx={{ 
            mb: 4, 
            overflow: 'hidden', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            borderRadius: 1
          }}
        >
          <Box sx={{ 
            backgroundColor: 'rgba(25, 118, 210, 0.05)', 
            p: 2.5, 
            display: 'flex', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <Avatar 
              sx={{ 
                width: 48, 
                height: 48, 
                mr: 2,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                color: '#1976d2'
              }}
            >
              <PersonIcon />
            </Avatar>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 500, color: isDarkMode ? '#fff' : '#333' }}>
              Biography
            </Typography>
          </Box>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.6, color: isDarkMode ? '#fff' : '#666' }}>
              {director.biography}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Movies Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 500,
            color: isDarkMode ? '#fff' : '#333',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: '8px',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '2px',
              bottom: '0',
              left: '0',
              backgroundColor: '#1976d2',
              borderRadius: '2px',
            }
          }}
        >
          Movies by {director.name}
        </Typography>

        {/* Two-column layout for movies */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          margin: '-12px',
          mt: 3
        }}>
          {movies.map((movie) => (
            <Box 
              key={movie.id} 
              sx={{ 
                width: '50%',
                padding: '12px',
                boxSizing: 'border-box',
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }}
            >
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
