/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Create a pool instance
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port: 5432,
  database: 'midterm',
});

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
  const { user_name, email, password, city, province, phone_number } = req.body;
  console.log('Submitted form data:');
  console.log('Name:', user_name);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('City:', city);
  console.log('Province:', province);
  console.log('Phone Number:', phone_number);

  // Execute the database query
  const queryString = 'INSERT INTO users (user_name, email, password, city, province, phone_number, contact_preference, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const values = [user_name, email, password, city, province, phone_number, '-', 'regular']; // Replace 'regular' with the appropriate user type

  pool.query(queryString, values)
    .then(() => {
      res.redirect('/')
    })
    .catch((error) => {
      console.error('Error executing query:', error);
      // Handle the error accordingly
    });
});



module.exports = router;
