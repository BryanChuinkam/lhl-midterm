// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const db = require('../db/queries/users');

// // Handle GET request for the login page
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// console.log('testing logs');
// // Handle login form submission
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   db.getUserByEmailOrPhoneNumber(email, email)
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.password)
//           .then((passwordMatch) => {
//             if (passwordMatch) {
//               res.redirect('/');
//             } else {
//               res.redirect('/login');
//             }
//           })
//           .catch((err) => {
//             console.log('Error comparing passwords:', err);
//             res.redirect('/login');
//           });
//       } else {
//         res.redirect('/login');
//       }
//     })
//     .catch((err) => {
//       console.log('Error retrieving user:', err);
//       res.redirect('/login');
//     });
// });

// module.exports = router;
