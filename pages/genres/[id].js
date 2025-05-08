import MovieCard from '../../components/MovieCard';
import { 
  Typography, 
  Grid, 
  Box, 
  Paper, 
  Button
} from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GenreDetail({ genre, movies }) {
  const router = useRouter();

  if (!genre) {
    return (
      <Box sx={{ textAlign: 'center', p: 5 }}>
        <Typography variant="h4">Genre not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/genres')}
        sx={{
          mb: 2,
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)'
          }
        }}
      >
        Back to Genres
      </Button>

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
          {genre.name}
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            position: 'relative',
            display: 'inline-block',
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
          Movies in this Genre
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, display: 'flex' }}>
                <MovieCard movie={movie} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/genres/${params.id}/movies`);
    const data = await res.json();

    if (!data.genre) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        genre: data.genre,
        movies: data.movies,
      },
    };
  } catch (error) {
    console.error('Error fetching genre and movies:', error);
    return {
      notFound: true
    };
  }
}