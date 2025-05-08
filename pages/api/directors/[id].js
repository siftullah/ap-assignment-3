import { query } from '../../../utils/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get director details
    const [director] = await query(`
      SELECT id, name, biography 
      FROM directors 
      WHERE id = ?
    `, [id]);
    
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }

    // Get all movies by this director
    const movies = await query(`
      SELECT id, title, description, releaseYear, rating
      FROM movies
      WHERE directorId = ?
    `, [id]);
    
    res.status(200).json({ 
      director,
      movies 
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching director details',
      error: error.message 
    });
  }
}