import { useRouter } from 'next/router';
import { 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Card, 
  CardContent, 
  CardActionArea,
  Chip
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export default function Genres({ genres }) {
  const router = useRouter();

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
          Movie Genres
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item key={genre.id} xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, display: 'flex' }}>
              <Card 
                sx={{ 
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    '& .MuiTypography-root, & .MuiChip-label': {
                      color: 'white',
                    },
                    '& .MuiChip-root': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => router.push(`/genres/${genre.id}`)}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'center'
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      height: '100%',
                      width: '100%'
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 3
                      }}
                    >
                      {genre.name}
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1 
                      }}
                    >
                      <LocalMoviesIcon sx={{ mr: 1, opacity: 0.7 }} />
                      <Chip 
                        variant="outlined" 
                        label={`${genre.movieCount} movies`} 
                        sx={{ 
                          borderRadius: '16px',
                          fontSize: '0.9rem'
                        }} 
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch('http://localhost:3000/api/genres');
    const data = await res.json();

    return {
      props: {
        genres: data.genres,
      },
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: {
        genres: [],
      },
    };
  }
}