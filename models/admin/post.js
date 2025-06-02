const db = require('../db');

const fetchPostmaterials = async () => {
    try {
      const authorSql = 'SELECT id, name FROM author';
      const categorySql = 'SELECT id, name FROM catagory';
  
      const authorResult = await db.query(authorSql);
      const categoryResult = await db.query(categorySql);
  
      return {
        author: authorResult.rows,
        category: categoryResult.rows
      };
    } catch (error) {
      console.error('Error fetching post materials:', error);
      throw error;
    }
  };


  const CreatePost = async ({ title, category, author, summary, content, postman_id }) => {
    try {
      const catSql = 'SELECT id, name FROM catagory WHERE id = $1';
      const authorSql = 'SELECT id, name FROM author WHERE id = $1';
      const titleSql = 'SELECT * FROM posts WHERE title = $1';
  
      const [authorResult, categoryResult, titleResult] = await Promise.all([
        db.query(authorSql, [author]),
        db.query(catSql, [category]),
        db.query(titleSql, [title.trim()])
      ]);
  
      if (!authorResult.rows.length || !categoryResult.rows.length) {
        console.error('Invalid author or category ID');
        return null;
      }
  
      if (titleResult.rows.length > 0) {
        console.warn('Duplicate post title');
        return null;
      }
  
      const insertSql = `
        INSERT INTO posts (catagory, catid, title, summary, post, author, author_id, postman_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
  
      const result = await db.query(insertSql, [
        categoryResult.rows[0].name,
        categoryResult.rows[0].id,
        title.trim(),
        summary,
        content,
        authorResult.rows[0].name,
        authorResult.rows[0].id,
        postman_id
      ]);
  
      return result.rows[0];
    } catch (error) {
      console.error('CreatePost Error:', error);
      throw error;
    }
  };
  

  const deletePost = async (postId) => {
    try {
      const deleteSql = 'DELETE FROM posts WHERE id = $1 RETURNING *';
      const result = await db.query(deleteSql, [postId]);
      return result.rows[0]; // returns the deleted post or undefined if not found
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };
  
  
  

module.exports = { fetchPostmaterials, CreatePost , deletePost};