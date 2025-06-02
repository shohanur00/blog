const db = require('../db'); // assume this exports a pg.Pool or pg.Client
const bcrypt = require('bcrypt');


const getAuthenticate = async ({ username, password }) => {
    try {
      const loginSql = 'SELECT * FROM "user" WHERE username = $1 LIMIT 1';
      const result = await db.query(loginSql, [username]);
  
      if (result.rows.length === 0) return null;
  
      const user = result.rows[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : null;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };
  
module.exports = { getAuthenticate };
