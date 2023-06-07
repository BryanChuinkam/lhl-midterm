const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/additem');

router.get('/', (req, res) => {
  res.render('addItem');
});


module.exports = router;

