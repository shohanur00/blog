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

const getRecentPost = async ({ limit }) => {
    const postSql = `
        SELECT id, title 
        FROM public."posts"
        ORDER BY time DESC
        LIMIT $1 ;
    `;
    //const countSql = 'SELECT COUNT(*) FROM public."posts";';

    const postsResult = await db.query(postSql, [limit]);
    //const countResult = await db.query(countSql);

    return {
        post: postsResult.rows
    };
};


const getArchive = async () => {
    const postSql = `
        SELECT DISTINCT 
        TO_CHAR(time, 'Month') AS month_name,
        EXTRACT(YEAR FROM time) AS year,
        EXTRACT(MONTH FROM time) AS month_num
        FROM posts
        ORDER BY year, month_num;
    `;
    //const countSql = 'SELECT COUNT(*) FROM public."posts";';

    const postsResult = await db.query(postSql);
    //const countResult = await db.query(countSql);

    return {
        archive: postsResult.rows
    };
};

const getIndexData = async ({ catid,limit, offset }) => {
    try {
        const [author, post, category,archive,recentPost] = await Promise.all([
            getAuthor(),
            getPost({ catid,limit, offset }),
            getCategory(),
            getArchive(),
            getRecentPost(limit)
        ]);

        return {
            author,
            post,
            category,
            archive,
            recentPost
        };
    } catch (error) {
        console.error('Error in getIndexData:', error);
        throw error;
    }
};

module.exports = { getIndexData };
