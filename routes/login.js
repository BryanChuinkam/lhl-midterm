const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/queries/users');

// Handle GET request for the login page
router.get('/', (req, res) => {
  res.render('login');
});

console.log('testing logs');
// Handle login form submission
router.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  db.getUserByEmailOrPhoneNumber(email, email)
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then((passwordMatch) => {
            if (passwordMatch) {
              res.redirect('/');
            } else {
              res.redirect('/login');
            }
          })
          .catch((error) => {
            console.log('Error comparing passwords:', error);
            res.redirect('/login');
          });
      } else {
        res.redirect('/login');
      }
    })
    .catch((error) => {
      console.log('Error retrieving user:', error);
      res.redirect('/login');
    });
});

module.exports = router;
