const db = require('../db'); // replace with your actual DB module

const CreateCategory = async ({ category }) => {
  try {
    const normalizedCategory = category.trim(); // Optional: Normalize input

    // 1. Check for existing category
    const checkSql = 'SELECT * FROM catagory WHERE name = $1';
    const checkResult = await db.query(checkSql, [normalizedCategory]);

    if (checkResult.rows.length > 0) {
      console.log('Category already exists.');
      return null;
    }

    // 2. Insert new category
    const catInsertSql = `
      INSERT INTO catagory (name)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await db.query(catInsertSql, [normalizedCategory]);

    console.log('Category inserted successfully.');
    return result.rows[0];
  } catch (error) {
    console.error('Category Insert Error:', error);
    throw error;
  }
};


const { pool } = require('../db');

const deleteCategory = async (categoryId) => {
  const client = await pool.connect(); // ✅ use pool.connect()

  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM posts WHERE catid = $1', [categoryId]);
    const result = await client.query(
      'DELETE FROM catagory WHERE id = $1 RETURNING *',
      [categoryId]
    );
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting category:', error);
    throw error;
  } finally {
    client.release(); // always release the client
  }
};



module.exports = { CreateCategory,deleteCategory};