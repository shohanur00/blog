const db = require('./db');

const getPost = (postid, callback) => {
    const postSql = 'SELECT id, title,catagory,catid ,author, post, time, summary, author_id FROM public."posts" WHERE id = $1';

    //console.log(postSql);

    db.query(postSql, [postid])  // <- Fix: add [postid] as parameter array
        .then(results => {
            //console.log(results.rows);
            callback(null, results.rows);
        })
        .catch(error => {
            console.error('Error fetching post by ID:', error);
            callback(error, null);
        });
};

module.exports = { getPost };