const express = require('express');
const router = express.Router();
const loginModel = require('../../models/admin/login');
const requireAdminAuth = require('../../middleware/auth')

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
    res.render('admin/addUser', { user: req.session.user });
  });


  router.get('/dashboard/addcategory', requireAdminAuth, (req, res) => {
    res.render('admin/addCategory', { user: req.session.user });
  });

  router.get('/dashboard/addauthor', requireAdminAuth, (req, res) => {
    res.render('admin/addAuthor', { user: req.session.user });
  });

module.exports = router;
