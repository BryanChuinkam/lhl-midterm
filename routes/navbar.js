const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/queries/users');
app.set('view engine', 'ejs');


// Handle GET request for the login page
app.get('/users/login', (req, res) => {
  res.render('login', { isLoggedIn: false }); // Assuming the initial state is false
});

// Handle POST request for the login form submission
app.post('/users/login', (req, res) => {
  isLoggedIn = true;
  res.redirect('/users/login');
});

// Handle GET request for the register page
app.get('/users/register', (req, res) => {
  res.render('register', { isLoggedIn: false });
});

// Handle POST request for the register form submission
app.post('/users/register', (req, res) => {
  res.redirect('/users/register');
});

// Handle GET request for the post page
app.get('/post', (req, res) => {
  if (isLoggedIn) {
    res.render('post-item');
  } else {
    res.redirect('/users/login');
  }
});

// Handle GET request for the logout page
app.get('/logout', (req, res) => {
  isLoggedIn = false;
  res.redirect('/');
});

