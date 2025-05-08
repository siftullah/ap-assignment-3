import { useState } from 'react';
import MovieCard from '../../components/MovieCard';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const filteredMovies = selectedGenre ? movies.filter(movie => movie.genreId === selectedGenre) : movies;

  return (
    <Box>
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
          All Movies
        </Typography>
      </Paper>
      
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'flex-start' }}>
        <FormControl 
          sx={{ 
            minWidth: 220,
            '.MuiOutlinedInput-root': {
              borderRadius: 1,
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'white',
              fontSize: '0.95rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
                borderWidth: '1px',
              },
              '& .MuiSelect-icon': {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
              }
            },
            '.MuiFormLabel-root': {
              fontSize: '0.95rem',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
            }
          }}
        >
          <InputLabel id="genre-select-label">Filter by Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={selectedGenre}
            label="Filter by Genre"
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        margin: '-12px', // Counteract padding from child items
      }}>
        {filteredMovies.map((movie) => (
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
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`http://localhost:3000/api/movies`);
    const data = await res.json();

    console.log(data);


    if (!data.movies || !data.genres || data.movies.length === 0 || data.genres.length === 0) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        movies: data.movies,
        genres: data.genres,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true
    };
  }
}
