const db = require('./db');

const getAuthor = async () => {
    const authorSql = 'SELECT * FROM public."author" ORDER BY id ASC';
    const result = await db.query(authorSql);
    return result.rows;
};

const getCategory = async () => {
    const categorySql = 'SELECT id, name FROM public."catagory" ORDER BY id ASC';
    const result = await db.query(categorySql);
    return result.rows;
};

const getPost = async ({ catid,limit, offset }) => {
    const postSql = `
        SELECT id, title, author, time, summary, catagory, catid, author_id
        FROM public."posts"
        WHERE catid = $1
        ORDER BY time DESC
        LIMIT $2 OFFSET $3;
    `;
    const countSql = 'SELECT COUNT(*) FROM public."posts" WHERE catid = $1;';

    const postsResult = await db.query(postSql, [catid,limit, offset]);
    const countResult = await db.query(countSql,[catid]);

    return {
        post: postsResult.rows,
        totalCount: parseInt(countResult.rows[0].count, 10)
    };
};

const getIndexData = async ({ catid,limit, offset }) => {
    try {
        const [author, post, category] = await Promise.all([
            getAuthor(),
            getPost({ catid,limit, offset }),
            getCategory()
        ]);

        return {
            author,
            post,
            category
        };
    } catch (error) {
        console.error('Error in getIndexData:', error);
        throw error;
    }
};

module.exports = { getIndexData };
