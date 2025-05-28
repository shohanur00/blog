const db = require('./db');

const getPost = async (postId) => {
    const postSql = 'SELECT id, title, catagory, catid, author, post, time, summary, author_id FROM public."posts" WHERE id = $1';

    try {
        const result = await db.query(postSql, [postId]);
        return result.rows; // return array of posts (usually length 1)
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw error; // Let caller handle the error
    }
};



module.exports = { getPost };