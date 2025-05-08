import { query } from '../../utils/db';

export default async function handler(req, res) {
  try {
    // Drop existing tables in correct order (due to foreign key constraints)
    await query('DROP TABLE IF EXISTS movies');
    await query('DROP TABLE IF EXISTS directors');
    await query('DROP TABLE IF EXISTS genres');

    // Create tables
    await query(`
      CREATE TABLE IF NOT EXISTS genres (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS directors (
        id VARCHAR(10) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        biography TEXT
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS movies (
        id VARCHAR(10) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        directorId VARCHAR(10),
        description TEXT,
        releaseYear INT,
        genreId VARCHAR(10),
        rating DECIMAL(3,1),
        FOREIGN KEY (directorId) REFERENCES directors(id),
        FOREIGN KEY (genreId) REFERENCES genres(id)
      )
    `);

    // Insert genres data
    for (const genre of [
      ["g1", "Science Fiction"],
      ["g3", "Adventure"],
      ["g4", "Drama"], 
      ["g5", "Thriller"]
    ]) {
      await query(
        'INSERT IGNORE INTO genres (id, name) VALUES (?, ?)',
        genre
      );
    }

    // Insert directors data
    for (const director of [
      ["d1", "Christopher Nolan", "British-American director known for complex storytelling and visual innovation."],
      ["d3", "Baz Luhrmann", "Australian director known for visually extravagant films like Moulin Rouge! and The Great Gatsby."],
      ["d4", "Bong Joon-ho", "South Korean filmmaker acclaimed for combining drama, social commentary, and thrills."],
      ["d5", "The Wachowskis", "Sibling duo behind groundbreaking sci-fi films including The Matrix trilogy."],
      ["d6", "Damien Chazelle", "American director known for musical dramas like Whiplash and La La Land."]
    ]) {
      await query(
        'INSERT IGNORE INTO directors (id, name, biography) VALUES (?, ?, ?)',
        director
      );
    }

    // Insert movies data
    for (const movie of [
      ["1", "Inception", "d1", "A mind-bending thriller about dreams within dreams.", 2010, "g1", 8.8],
      ["2", "The Great Gatsby", "d3", "A mysterious millionaire throws lavish parties in 1920s New York.", 2013, "g4", 7.2],
      ["3", "Interstellar", "d1", "A team of explorers travel through a wormhole in space.", 2014, "g3", 8.6],
      ["4", "Parasite", "d4", "A poor family schemes to become employed by a wealthy household.", 2019, "g5", 8.6],
      ["5", "The Matrix", "d5", "A hacker discovers the reality he lives in is a simulation.", 1999, "g1", 8.7],
      ["6", "La La Land", "d6", "A jazz musician and an aspiring actress fall in love in Los Angeles.", 2016, "g4", 8.0]
    ]) {
      await query(
        'INSERT IGNORE INTO movies (id, title, directorId, description, releaseYear, genreId, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
        movie
      );
    }

    return res.status(200).json({
      status: 'success',
      message: 'Successfully created tables and inserted data'
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while setting up the database',
      error: error.message
    });
  }
}