const { Pool } = require('pg');

// Check for required environment variables
const requiredEnv = ['USER', 'HOST', 'DATABASE', 'PASSWORD', 'DBPORT'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

// Create a new connection pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    ssl: {
        rejectUnauthorized: false // Accept self-signed certs
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down database connection pool...');
    pool.end()
        .then(() => {
            console.log('Database connection pool closed.');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error during pool shutdown:', err);
            process.exit(1);
        });
});

// Query wrapper function
const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (err) {
        console.error('Database query error:', err);
        throw err; // Re-throw so the calling function can handle it
    }
};

module.exports = { query };