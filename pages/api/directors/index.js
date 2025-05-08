import { query } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directors = await query(`
      SELECT 
        d.id,
        d.name,
        d.biography,
        COUNT(m.id) as movieCount
      FROM directors d
      LEFT JOIN movies m ON d.id = m.directorId
      GROUP BY d.id, d.name, d.biography
      ORDER BY d.name ASC
    `);
    
    res.status(200).json({ directors });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching directors',
      error: error.message 
    });
  }
}