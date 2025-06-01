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


  const CreatePost = async ({ title, category , author, summary, content })=>{

        const catSql = 'SELECT id, name FROM catagory WHERE id = $1';
        const authorSql = 'SELECT id, name FROM author WHERE id = $1'
        const authorResult = await db.query(authorSql,[author]);
        const categoryResult = await db.query(catSql,[category]);
        console.log(authorResult)
        console.log(categoryResult)

  }
  

module.exports = { fetchPostmaterials, CreatePost };