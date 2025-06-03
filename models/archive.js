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

const getPost = async ({ month, year,limit, offset }) => {
    const postSql = `
        SELECT id, title, author, time, summary, catagory, catid, author_id
        FROM public."posts"
        WHERE EXTRACT(YEAR FROM time) = $1
        AND EXTRACT(MONTH FROM time) = $2
        ORDER BY time
        LIMIT $3 OFFSET $4;
    `;
    const countSql = 'SELECT COUNT(*) FROM public."posts" WHERE EXTRACT(YEAR FROM time) = $1 AND EXTRACT(MONTH FROM time) = $2';


    const postsResult = await db.query(postSql, [year,month,limit, offset]);
    //console.log(postsResult)
    const countResult = await db.query(countSql,[year,month]);

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

const getIndexData = async ({ month, year,limit, offset }) => {
    try {
        const [author, post, category,archive,recentPost] = await Promise.all([
            getAuthor(),
            getPost({ month, year,limit, offset }),
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
