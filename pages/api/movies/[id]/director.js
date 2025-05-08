import { query } from '../../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get movie and its director details
    const [movieAndDirector] = await query(`
      SELECT 
        m.title as movieTitle,
        d.id as directorId,
        d.name as directorName,
        d.biography as directorBiography
      FROM movies m
      LEFT JOIN directors d ON m.directorId = d.id
      WHERE m.id = ?
    `, [id]);

    if (!movieAndDirector) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (!movieAndDirector.directorId) {
      return res.status(404).json({ message: 'Director not found for this movie' });
    }

    // Get other movies by this director
    const otherMovies = await query(`
      SELECT id, title, description, releaseYear, rating
      FROM movies
      WHERE directorId = ? AND id != ?
    `, [movieAndDirector.directorId, id]);

    res.status(200).json({
      movieTitle: movieAndDirector.movieTitle,
      director: {
        id: movieAndDirector.directorId,
        name: movieAndDirector.directorName,
        biography: movieAndDirector.directorBiography
      },
      otherMovies
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching movie director details',
      error: error.message 
    });
  }
}