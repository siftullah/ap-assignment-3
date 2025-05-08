import { useRouter } from 'next/router';
import { 
  Typography, 
  Box, 
  Paper, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';

export default function HelpPage() 
{
  const router = useRouter();
  
  const helpTopics = [
    { 
      title: 'Homepage', 
      icon: <HomeIcon color="primary" />,
      description: 'View trending movies on our homepage'
    },
    { 
      title: 'Movies', 
      icon: <MovieIcon color="primary" />,
      description: 'Browse all movies in our database'
    },
    { 
      title: 'Directors', 
      icon: <PeopleIcon color="primary" />,
      description: 'Learn about film directors and their works'
    },
    { 
      title: 'Genres', 
      icon: <CategoryIcon color="primary" />,
      description: 'Explore movies by genre categories'
    }
  ];

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
          Help Center
        </Typography>
      </Paper>

      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
        >
          Welcome to the Movie House help center. Find information about how to use our site below.
        </Typography>
        
        <Card sx={{ mb: 4, borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <InfoIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                Help Topics
              </Typography>
            </Box>
            
            <List sx={{ width: '100%' }}>
              {helpTopics.map((topic, index) => (
                <Box key={topic.title}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      {topic.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {topic.title}
                        </Typography>
                      } 
                      secondary={
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {topic.description}
                        </Typography>
                      } 
                    />
                  </ListItem>
                  {index < helpTopics.length - 1 && <Divider variant="inset" component="li" />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
        
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mt: 4 }}
        >
          Current path: <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>/help</Box>
        </Typography>
      </Box>
    </Box>
  );
} 