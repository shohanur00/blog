const bcrypt = require('bcrypt');
const db = require('../db'); // replace with your actual DB module

const CreateUser = async ({ username, email, password, role }) => {
  try {
    // 1. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2. Insert into database
    const userInsertSQL = `
      INSERT INTO "user" (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(userInsertSQL, [username, email, hashedPassword, role]);
    
    return result.rows[0]; // return the inserted user
  } catch (error) {
    console.error('User Insert Error:', error);
    throw error;
  }
};





module.exports = { CreateUser };
