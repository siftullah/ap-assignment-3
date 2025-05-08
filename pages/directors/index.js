import useSWR from 'swr';
import { useRouter } from 'next/router';
import { 
  Typography, 
  Box, 
  Paper, 
  Card,
  CardActionArea, 
  Chip,
  CircularProgress,
  Alert,
  Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MovieIcon from '@mui/icons-material/Movie';
import { useTheme } from '@mui/material/styles';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Directors() {
  const router = useRouter();
  const { data, error } = useSWR('/api/directors', fetcher);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  if (error) return (
    <Alert severity="error" sx={{ mt: 4, mb: 4 }}>
      Failed to load directors. Please try again later.
    </Alert>
  );
  
  if (!data) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
      <CircularProgress />
    </Box>
  );

  const directors = data.directors;

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
          Movie Directors
        </Typography>
      </Paper>
      
      {/* Directors List - Fixed width cards with equal height */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {directors.map((director) => (
          <Card 
            key={director.id}
            sx={{ 
              width: '100%',
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 3px 6px rgba(0,0,0,0.12)',
                backgroundColor: '#1976d2',
                '& .MuiTypography-root': {
                  color: 'white',
                },
                '& .MuiAvatar-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                },
                '& .MuiChip-root': {
                  borderColor: 'white',
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                }
              }
            }}
          >
            <CardActionArea 
              onClick={() => router.push(`/directors/${director.id}`)}
              sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.1)',
                    color: '#1976d2',
                    mr: 2
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 500,
                    color: isDarkMode ? '#fff' : '#333'
                  }}
                >
                  {director.name}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isDarkMode ? '#ddd' : '#666',
                  mb: 3,
                  lineHeight: 1.6,
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'normal'
                }}
              >
                {director.biography}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Chip
                  icon={<MovieIcon fontSize="small" />}
                  label={`${director.movieCount} ${director.movieCount === 1 ? 'movie' : 'movies'}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    borderColor: isDarkMode ? '#fff' : '#1976d2',
                    color: isDarkMode ? '#fff' : '#1976d2',
                    borderRadius: 4
                  }}
                />
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}