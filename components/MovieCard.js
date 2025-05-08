import { Card, CardContent, CardActionArea, Typography, Box, Rating } from '@mui/material';
import { useRouter } from 'next/router';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';

export default function MovieCard({ movie }) {
  const router = useRouter();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <Card sx={{ 
      width: '100%',
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'flex-start',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#1976d2',
        color: 'white',
        '& .MuiTypography-root': {
          color: 'white',
        },
        '& .MuiRating-root': {
          color: 'white',
        },
        '& .ratingText': {
          color: 'white',
        }
      }
    }}>
      <CardActionArea 
        onClick={() => router.push(`/movies/${movie.id}`)}
        sx={{ 
          width: '100%',
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        <CardContent 
          sx={{ 
            width: '100%', 
            p: 2.5, 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            flexGrow: 1
          }}
        >
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1.5, 
              fontSize: '1.125rem',
              color: isDarkMode ? '#fff' : '#333'
            }}
          >
            {movie.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              fontSize: '0.875rem',
              lineHeight: 1.5,
              color: isDarkMode ? '#ddd' : '#666',
              flexGrow: 1
            }}
          >
            {movie.description}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center', 
            width: '100%',
            pt: 1,
            mt: 'auto'
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: isDarkMode ? '#ddd' : '#666',
                fontSize: '0.875rem' 
              }}
            >
              {movie.releaseYear}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <Rating 
                value={movie.rating / 2} 
                precision={0.5} 
                size="small" 
                readOnly 
                icon={<StarIcon fontSize="small" />}
                emptyIcon={<StarIcon fontSize="small" style={{ opacity: 0.55 }} />}
              />
              <Typography 
                variant="body2"
                className="ratingText" 
                sx={{ 
                  ml: 0.5,
                  color: isDarkMode ? '#ddd' : '#666',
                  fontSize: '0.875rem'
                }}
              >
                {movie.rating}/10
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 