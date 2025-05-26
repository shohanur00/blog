const db = require('./db')


const categorySql = 'SELECT id, name FROM public."catagory" ORDER BY id ASC';
const postSql = 'SELECT id,title,author,time,readtime,image,summary,authid FROM public."posts" ORDER BY time DESC LIMIT 10';
// const PosttagSql = 'SELECT postid,tagid,tagname FROM public.tagstopost ORDER BY id ASC ';
// const tagSql  = 'SELECT * FROM public."tags" ORDER BY id ASC';
const authorSql = 'SELECT * FROM public."author" ORDER BY id ASC';


const getPost = (callback) => {
    db.query(postSql, (error, results) => {
        if (error) {
            console.error('Error fetching post:', error);
            callback(error, null); // Ensure the callback is called with the error
            return;
        }
        callback(null, results.rows); // Pass the results to the callback
    });
};

// const getTags = (callback) => {
//     db.query(tagSql, (error, results) => {
//         if (error) {
//             console.error('Error fetching tags:', error);
//             callback(error, null); // Ensure the callback is called with the error
//             return;
//         }
//         callback(null, results.rows); // Pass the results to the callback
//     });
// };


const getAuthor = (callback) => {
    db.query(authorSql, (error, results) => {
        if (error) {
            console.error('Error fetching author:', error);
            callback(error, null); // Ensure the callback is called with the error
            return;
        }
        callback(null, results.rows); // Pass the results to the callback
    });
};



const getCategory = (callback) => {
    db.query(categorySql, (error, results) => {
        if (error) {
            console.error('Error fetching categories:', error);
            callback(error, null); // Ensure the callback is called with the error
            return;
        }
        callback(null, results.rows); // Pass the results to the callback
    });
};

// const getPostTag = (callback)=>{
//     db.query(PosttagSql, (error, results) => {
//         if (error) {
//             console.error('Error fetching categories:', error);
//             callback(error, null); // Ensure the callback is called with the error
//             return;
//         }
//         callback(null, results.rows); // Pass the results to the callback
//     });

// }


const getIndexData = (callback) => {
    let data = {
        author: '',
        post: '',
        category: ''
    };

    const getAuthorPromise = new Promise((resolve, reject) => {
        getAuthor((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            data.author = res;
            resolve();
        });
    });

    const getPostPromise = new Promise((resolve, reject) => {
        getPost((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            data.post = res;
            resolve();
        });
    });

    

    const getCategoryPromise = new Promise((resolve, reject) => {
        getCategory((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            data.category = res;
            resolve();
        });
    });

 

    Promise.all([getAuthorPromise, getPostPromise, getCategoryPromise])
        .then(() => {
            callback(null,data);
        })
        .catch(error => {
            console.error('Error fetching index data:', error);
            callback(error,null);
        });
};




module.exports = {getIndexData}