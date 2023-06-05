/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;


// ROUTING FOR REGISTER
// ----------------------------
// Handle GET request for the registration page
router.get('/register', (req, res) => {
  res.sendFile('lhl-midterm/views/register.html'); // Replace with the actual path to your HTML file
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

  res.redirect('/home');
});

module.exports = router;
