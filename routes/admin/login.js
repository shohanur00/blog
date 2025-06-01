const express = require('express');
const router = express.Router();
const loginModel = require('../../models/admin/login');
const requireAdminAuth = require('../../middleware/auth')
const addUserModel = require('../../models/admin/user')
const addCategoryModel = require('../../models/admin/category')
const addAuthorModel = require('../../models/admin/author')
const addPostModel = require('../../models/admin/post')



// Middleware to protect admin routes
router.get('/', (req, res) => {
    if (req.session.user) {
      return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { error: null });
  });
  
  // POST: Handle login form submission
  router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    if (req.session.user) {
      return res.redirect('/admin/dashboard');
    }
  
    try {
      const user = await loginModel.getAuthenticate({ username, password });
  
      if (user) {
        // Set session
        req.session.user = {
          id: user.id,
          username: user.username,
          role: user.role
        };
  
        // Save session before redirecting
        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            return res.status(500).send('Internal Server Error');
          }
          res.redirect('/admin/dashboard');
        });
      } else {
        // Failed login
        res.render('admin/login', { error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // GET: Admin Dashboard
  router.get('/dashboard', requireAdminAuth, (req, res) => {
    res.render('admin/dashboard', { user: req.session.user });
  });


  router.get('/dashboard/adduser', requireAdminAuth, (req, res) => {
    res.render('admin/addUser', { user: req.session.user,message: 2 });
  });


  router.get('/dashboard/addcategory', requireAdminAuth, (req, res) => {
    res.render('admin/addCategory', { user: req.session.user,message: 2  }); 
  });

  router.get('/dashboard/addauthor', requireAdminAuth, (req, res) => {
    res.render('admin/addAuthor', { user: req.session.user,message: 2  });
  });

  
  router.get('/dashboard/addpost', requireAdminAuth, async (req, res) => {
    try {
      const fetch_data = await addPostModel.fetchPostmaterials();
      console.log(fetch_data.author)
      res.render('admin/addPost', {
        user: req.session.user,
        author: fetch_data.author,
        category: fetch_data.category
      });
    } catch (error) {
      console.error('Error loading add post page:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  


router.post('/dashboard/adduser', requireAdminAuth, async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const result = await addUserModel.CreateUser({ username, email, password, role });

    if (result) {
      res.render('admin/addUser', { user: req.session.user, message: 1 });
    } else {
      res.render('admin/addUser', { user: req.session.user, message: 0 });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.render('admin/addUser', { user: req.session.user, message: 0 });
  }
});


router.post('/dashboard/addcategory', requireAdminAuth, async (req, res) => {
  const { category } = req.body;

  try {
    const result = await addCategoryModel.CreateCategory({ category });

    if (result) {
      // Successfully inserted
      res.render('admin/addCategory', { user: req.session.user, message: 1 });
    } else {
      // Category already exists
      res.render('admin/addCategory', { user: req.session.user, message: 0 });
    }
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/dashboard/addauthor', requireAdminAuth, async (req, res) => {
    const { authorName, designation, bio } = req.body;
    console.log(authorName);
  
    try {
      const result = await addAuthorModel.CreateAuthor({ authorName, designation, bio });
  
      if (result) {
        // Successfully inserted
        res.render('admin/addAuthor', { user: req.session.user, message: 1 });
      } else {
        // Author already exists
        res.render('admin/addAuthor', { user: req.session.user, message: 0 });
      }
    } catch (error) {
      console.error('Error adding author:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  router.post('/dashboard/addpost', requireAdminAuth, async (req, res) => {
    const { title, category , author, summary, content } = req.body;
  
    try {
      const result = await addPostModel.CreatePost({ title, category, author, summary, content });
  
      const fetch_data = await addPostModel.fetchPostmaterials(); // to refill dropdowns
  
      if (result) {
        res.render('admin/addPost', {
          user: req.session.user,
          category: fetch_data.category,
          author: fetch_data.author,
          message: 1
        });
      } else {
        res.render('admin/addPost', {
          user: req.session.user,
          category: fetch_data.category,
          author: fetch_data.author,
          message: 0
        });
      }
    } catch (error) {
      console.error('Error adding post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  




module.exports = router;
