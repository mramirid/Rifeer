const db = require('../models');

module.exports = (app) => {
  /** Register page */
  app.get('/signup/:role', (req, res) => {
    if (req.user) {
      res.redirect('/products/all');
    } else {
      // Jika user belum login
      res.render('signup/signup-page', { role: req.params.role });
    }
  });

  /** Route untuk mendaftarkan user. Jika sukses, loginkan user */
  app.post('/signup/signup-now', (req, res) => {
    db.User.create({
      user_email: req.body.user_email,
      user_phone: req.body.user_phone,
      user_address: req.body.user_address,
      user_password: req.body.user_password,
      user_name: req.body.user_name,
      user_avatar: 'default_avatar.jpg',
      user_role: req.body.user_role,
    })
      .then(() => res.redirect(307, '/login/login-now'))
      .catch((err) => res.json(err));
  });
};
