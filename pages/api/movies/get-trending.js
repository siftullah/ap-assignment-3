import { query } from '../../../utils/db';

export default async function handler(req, res) 
{
  if (req.method !== 'GET') 
  {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try 
  {
    // Get top 4 trending movies sorted by rating
    const movies = await query(`
      SELECT 
        m.id,
        m.title,
        m.description,
        m.releaseYear,
        m.rating
      FROM movies m
      ORDER BY m.rating DESC
      LIMIT 4
    `);

    res.status(200).json({ 
      movies 
    });
  } 
  catch (error) 
  {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching trending movies',
      error: error.message 
    });
  }
}