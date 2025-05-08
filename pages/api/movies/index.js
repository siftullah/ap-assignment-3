import { query } from '../../../utils/db';

export default async function handler(req, res) 
{
  if (req.method !== 'GET') 
  {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try 
  {
    // Get movies
    const movies = await query(`
      SELECT 
        m.id,
        m.title,
        m.directorId,
        m.description,
        m.releaseYear,
        m.genreId,
        m.rating
      FROM movies m
    `);

    // Get genres for dropdown filter
    const genres = await query(`
      SELECT id, name
      FROM genres
    `);

    res.status(200).json({ 
      movies,
      genres
    });
  } 
  catch (error) 
  {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching movies and genres',
      error: error.message 
    });
  }
}