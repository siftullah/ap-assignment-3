import { query } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genres = await query(`
      SELECT 
        g.id,
        g.name,
        COUNT(m.id) as movieCount
      FROM genres g
      LEFT JOIN movies m ON g.id = m.genreId
      GROUP BY g.id, g.name
      ORDER BY g.name ASC
    `);
    
    res.status(200).json({ genres });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching genres',
      error: error.message 
    });
  }
}