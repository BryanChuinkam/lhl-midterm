const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/additem');

router.get('/', (req, res) => {
  res.render('addItem');
}); 


module.exports = router;


// app.post("/login", (req, res) => {
//   let email = req.body["email"];
//   let password = req.body["password"];
//   let databaseUser = getUserByEmail(email, users);
//   if (databaseUser) {
//     if (bcrypt.compareSync(password, databaseUser.password)) {
//       req.session.user_id = databaseUser.id;
//       return res.redirect(`/urls`);
//     } else {
//       return res.status(403).send("password does not match");
//     }
//   } else {
//     return res.status(403).send("user is not registered");
//   }
// });
// router.get('/', (req, res) => {
//   userQueries.getUsers()
//     .then(users => {
//       res.json({ users });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
