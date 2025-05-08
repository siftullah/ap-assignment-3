import { query } from '../../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // First check if the genre exists
    const [genre] = await query(`SELECT * FROM genres WHERE id = ?`, [id]);
    
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    
    // Get all movies for this genre with full details
    const movies = await query(`
      SELECT 
        m.id,
        m.title,
        m.description,
        m.releaseYear,
        m.rating,
        d.id as directorId,
        d.name as directorName,
        d.biography as directorBiography,
        g.id as genreId,
        g.name as genreName
      FROM movies m
      LEFT JOIN directors d ON m.directorId = d.id
      LEFT JOIN genres g ON m.genreId = g.id
      WHERE m.genreId = ?
      ORDER BY m.releaseYear DESC, m.title ASC
    `, [id]);
    
    res.status(200).json({ 
      genre,
      movies 
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching movies by genre',
      error: error.message 
    });
  }
}