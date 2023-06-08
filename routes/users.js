const express = require('express');
const router = express.Router();
const db = require('../db/queries/users');

// Handle GET request for the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle GET request for the users page
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
