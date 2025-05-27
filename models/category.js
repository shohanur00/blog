const db = require('./db');

const getCat = (catid, callback) => {
    const postSql = 'SELECT id, title,catagory,catid ,author, time, summary, author_id FROM public."posts" WHERE catid = $1';

    //console.log(postSql);

    db.query(postSql, [catid])  // <- Fix: add [postid] as parameter array
        .then(results => {
            //console.log(results.rows);
            callback(null, results.rows);
        })
        .catch(error => {
            console.error('Error fetching post by ID:', error);
            callback(error, null);
        });
};

module.exports = { getCat };