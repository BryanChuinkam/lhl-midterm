// Import required modules
const express = require('express');
const app = express();

// Define route handlers
app.get('/users/login', (req, res) => {
  res.send('Login page');
});

app.get('/users/register', (req, res) => {
  res.send('Register page');
});

app.get('/post', (req, res) => {
  res.send('Post an Item page');
});

app.get('/logout', (req, res) => {
  res.send('Logout page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
