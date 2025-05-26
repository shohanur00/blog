
const { Pool } = require('pg')
const { error } = require('console')

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
})
  

 const query = async (text, params) => {

    try {
        const res = await pool.query(text, params);
        return res;
    } catch (err) {
        console.error('Database query error:', err);
        throw err; // Re-throw so the calling function can handle it
    }

}
   

module.exports = {query}