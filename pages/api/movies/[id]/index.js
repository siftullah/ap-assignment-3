import { query } from '../../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const [movie] = await query(`
      SELECT 
        m.id,
        m.title,
        m.directorId,
        m.description,
        m.releaseYear,
        m.genreId,
        m.rating,
        d.name as directorName,
        d.biography as directorBiography,
        g.name as genreName
      FROM movies m
      LEFT JOIN directors d ON m.directorId = d.id
      LEFT JOIN genres g ON m.genreId = g.id
      WHERE m.id = ?
    `, [id]);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ movie });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching the movie',
      error: error.message 
    });
  }
}