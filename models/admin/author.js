const db = require('../db'); // replace with your actual DB module

const CreateAuthor = async ({ authorName, designation, bio }) => {
    try {
      const normalizedName = authorName; // Optional normalization
      console.log(authorName);
      // 1. Check if author already exists
      const checkSql = 'SELECT * FROM author WHERE name = $1';
      const checkResult = await db.query(checkSql, [normalizedName]);
  
      if (checkResult.rows.length > 0) {
        console.log('Author already exists.');
        return null;
      }
  
      // 2. Insert new author
      const insertSql = `
        INSERT INTO author (name, designation, about)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const result = await db.query(insertSql, [normalizedName, designation, bio]);
  
      console.log('Author inserted successfully.');
      return result.rows[0];
  
    } catch (error) {
      console.error('Author Insert Error:', error);
      throw error;
    }
  };
  
  

  const { pool } = require('../db');
  const deleteAuthor = async (authorId) => {
    const client = await pool.connect();
  
    try {
      await client.query('BEGIN');
  
      // Delete posts by this author first
      await client.query('DELETE FROM posts WHERE author_id = $1', [authorId]);
  
      // Then delete the author
      const result = await client.query('DELETE FROM author WHERE id = $1 RETURNING *', [authorId]);
  
      await client.query('COMMIT');
  
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting author:', error);
      throw error;
    } finally {
      client.release();
    }
  };
  


module.exports = { CreateAuthor,deleteAuthor };