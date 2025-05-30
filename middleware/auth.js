function requireAdminAuth(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/admin');
    }
    next();
  }
  
  module.exports = requireAdminAuth;
  