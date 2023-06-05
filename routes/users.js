/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();

// Handle GET request for the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle GET request for the users page
router.get('/', (req, res) => {
  res.render('users');
});

// Handle POST request for the registration form submission
router.post('/register', (req, res) => {
  const { email, password, city, province, phone } = req.body;
  console.log('Submitted form data:');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('City:', city);
  console.log('Province:', province);
  console.log('Phone Number:', phone);

  // Redirect or render a success page if needed
});

module.exports = router;
