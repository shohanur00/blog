const bcrypt = require('bcrypt');
const db = require('../db'); // replace with your actual DB module

const CreateUser = async ({ username, email, password, role }) => {
  try {
    // 1. Check if user already exists by email or username
    const checkUserSQL = `
      SELECT * FROM "user"
      WHERE email = $1 OR username = $2
    `;
    const existing = await db.query(checkUserSQL, [email, username]);

    if (existing.rows.length > 0) {
      throw new Error('User with this email or username already exists.');
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Insert into the database
    const insertUserSQL = `
      INSERT INTO "user" (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(insertUserSQL, [username, email, hashedPassword, role]);

    // 4. Return safe user object (exclude hashed password)
    const { password: _, ...safeUser } = result.rows[0];
    return safeUser;
  } catch (error) {
    console.error('User Insert Error:', error);
    throw error;
  }
};


const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT id, username, email FROM "user" ORDER BY id DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};



const deleteUser = async (userId) => {
  try {
    const result = await db.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};




module.exports = { CreateUser, getAllUsers, deleteUser };
