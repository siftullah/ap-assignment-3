import { useRouter } from 'next/router';
import { 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  Button, 
  Rating, 
  Divider,
  Stack 
} from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import DirectorChairIcon from '@mui/icons-material/Chair';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';

export default function MovieDetails({ movie }) {
  const router = useRouter();

  if (!movie) {
    return (
      <Box sx={{ textAlign: 'center', p: 5 }}>
        <Typography variant="h4">Movie not found</Typography>
      </Box>
    );
  }

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
          {movie.title}
        </Typography>
      </Paper>
      
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {movie.description}
          </Typography>
        </CardContent>
      </Card>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalMoviesIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Genre:
                  </Typography>
                  <Chip 
                    label={movie.genreName} 
                    color="primary" 
                    variant="outlined" 
                    sx={{ 
                      ml: 2,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      }
                    }}
                    onClick={() => router.push(`/genres/${movie.genreId}`)}
                  />
                </Box>
                
                <Divider />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectorChairIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Director:
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary"
                    onClick={() => router.push(`/movies/${movie.id}/director`)}
                    sx={{ 
                      ml: 1,
                      '&:hover': {
                        color: '#fff'
                      }
                    }}
                  >
                    {movie.directorName}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarTodayIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Release Year:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {movie.releaseYear}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon color="primary" sx={{ mr: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Rating:
                  </Typography>
                  <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                    <Rating 
                      value={movie.rating / 2} 
                      precision={0.5} 
                      readOnly 
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      ({movie.rating}/10)
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => router.back()}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`http://localhost:3000/api/movies`);
    const data = await res.json();

    const paths = data.movies.map((movie) => ({
      params: { id: movie.id.toString() },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${params.id}`);
    const data = await res.json();

    if (!data.movie) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        movie: data.movie,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      notFound: true,
    };
  }
}