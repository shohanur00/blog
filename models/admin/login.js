const db = require('../db'); // assume this exports a pg.Pool or pg.Client

const getAuthenticate = async ({ username, password }) => {
    try {
        const loginSql = 'SELECT * FROM "user" WHERE username = $1 AND password = $2 LIMIT 1';
        const result = await db.query(loginSql, [username, password]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};

module.exports = { getAuthenticate };
