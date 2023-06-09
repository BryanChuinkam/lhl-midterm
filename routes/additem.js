const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/additem');

// router.get('/', (req, res) => {
//   res.render('addItem');
// });

router.get('/', (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;
  res.render('addItem', { userId });
});


module.exports = router;

