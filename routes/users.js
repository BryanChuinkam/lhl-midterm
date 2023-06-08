const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/queries/users');



router.get('/', (req, res) => {
  res.render('users');
});

router.get('/landing', (req, res) => {
  db.getBuyerFavourites(req.query.userName.replace(':', ''))
    .then((products) => {
      res.json({ products });
    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:user_name', (req, res) => {
  const templateVars = { userName: req.params.user_name.replace(':', '') };
  res.render('users_landing_page', templateVars);
});
// Handle GET request for the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle GET request for the users page
router.get('/', (req, res) => {
  res.render('users');
});

// Handle GET request for the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.getUserByEmailOrPhoneNumber(email, email)
    .then((user) => {
      if (!user) {
        return res.redirect('/');
      }
      bcrypt.compare(password, user.password)
        .then((passwordMatch) => {
          if (!passwordMatch) {
            return res.redirect('/users/login');
          }
          req.session.user = user;
          res.redirect('/');
        })
        .catch((err) => {
          res.redirect('/users/login');
        });
    })
    .catch((err) => {
      console.log('Error retrieving user:', err);
      res.redirect('/users/login');
    });
});

// Handle logout form submission
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Handle POST request for the registration form submission
router.post('/register', (req, res) => {
  console.log('Reached the /users/register route handler');
  const { user_name, email, password, city, province, phone_number } = req.body;
  console.log('Submitted form data:');
  console.log('Name:', user_name);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('City:', city);
  console.log('Province:', province);
  console.log('Phone Number:', phone_number);

  db.getUserByEmailOrPhoneNumber(email, phone_number)
    .then((existingUser) => {
      if (existingUser) {
        const errorMessage = 'Invalid credentials - This information has already been used.';
        res.render('register', { errorMessage });
      } else {
        return db.createUser(user_name, email, password, city, province, phone_number)
          .then(() => {
            console.log('User created successfully');
            res.redirect('/');
          });
      }
    })
    .catch((err) => {
      console.error('Error creating user:', err);
      res.redirect('/users/register');
    });
});

module.exports = router;
