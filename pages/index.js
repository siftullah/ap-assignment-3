import MovieCard from '../components/MovieCard';
import { Typography, Grid, Box } from '@mui/material';

export default function Home({ trendingMovies }) 
{
  return (
    <>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 2
          }}
        >
          <Box component="span" sx={{ color: '#1976d2' }}>Discover Amazing </Box>
          <Box component="span" sx={{ color: '#9c27b0' }}>Movies</Box>
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
          Explore our curated collection of trending movies
        </Typography>
      </Box>

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
          Trending Movies
        </Typography>

        <Grid 
          container 
          spacing={3} 
          sx={{ 
            mt: 3,
          }}
        >
          {trendingMovies.map((movie) => (
            <Grid 
  item 
  key={movie.id} 
  xs={12} 
  sm={6} 
  md={3} 
  sx={{ 
    display: 'flex', 
    flexDirection: 'column'
  }}
>
  <Box sx={{ flex: 1, display: 'flex' }}>
    <MovieCard movie={movie} />
  </Box>
</Grid>

          ))}
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`http://localhost:3000/api/movies/get-trending`);
    const data = await res.json();

    if (!data.movies || data.movies.length === 0) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        trendingMovies: data.movies,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return {
      notFound: true
    };
  }
}
