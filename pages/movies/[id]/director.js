import { useRouter } from 'next/router';
import MovieCard from '../../../components/MovieCard';
import { 
  Typography, 
  Box, 
  Paper, 
  Card, 
  CardContent, 
  Avatar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';

export default function DirectorDetails({ movieTitle, director, otherMovies }) {
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <Box>
      {/* Header section */}
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
          {movieTitle}
        </Typography>
      </Paper>
      
      {/* Director Section */}
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 1, 
          fontWeight: 'bold',
          color: isDarkMode ? '#fff' : '#333'
        }}
      >
        Directed by {director.name}
      </Typography>
      
      {/* Director Biography Card */}
      <Card sx={{ mb: 5, overflow: 'hidden' }}>
        <Box sx={{ 
          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(25, 118, 210, 0.05)', 
          p: 3, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
          <Avatar 
            sx={{ 
              width: 56, 
              height: 56, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            <PersonIcon sx={{ fontSize: '2rem' }} />
          </Avatar>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: isDarkMode ? '#fff' : 'inherit' }}>
            Director Biography
          </Typography>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ lineHeight: 1.7, color: isDarkMode ? '#ddd' : '#555' }}>
            {director.biography}
          </Typography>
        </CardContent>
      </Card>

      {/* Other Movies Section */}
      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            position: 'relative',
            display: 'inline-block',
            color: isDarkMode ? '#fff' : 'inherit',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '3px',
              bottom: '-10px',
              left: '0',
              backgroundColor: '#1976d2',
              borderRadius: '2px',
            }
          }}
        >
          Other Movies by {director.name}
        </Typography>

        {otherMovies.length > 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            margin: '-12px',
            mt: 3
          }}>
            {otherMovies.map((movie) => (
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
        ) : (
          <Paper 
            elevation={0} 
            sx={{ 
              mt: 4, 
              p: 3, 
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', 
              borderRadius: 1,
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" sx={{ color: isDarkMode ? '#ddd' : 'text.secondary' }}>
              No other movies found for this director.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${id}/director`);
    const data = await res.json();

    if (!data) {
      return { notFound: true };
    }

    return {
      props: {
        movieTitle: data.movieTitle,
        director: data.director,
        otherMovies: data.otherMovies
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return { notFound: true };
  }
}