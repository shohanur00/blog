const db = require('../db'); // replace with your actual DB module

const CreateCategory = async ({ category }) => {
  try {
    
    // 2. Insert into database
    const catInsertSql = `
      INSERT INTO catagory (name)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await db.query(catInsertSql, [category]);
    
    return result.rows[0]; // return the inserted user
  } catch (error) {
    console.error('User Insert Error:', error);
    throw error;
  }
};





module.exports = { CreateCategory };