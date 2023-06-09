const express = require('express');
const router = express.Router();
const itemQueries = require('../db/queries/itemSold');

router.put('/', function (req, res) {
  console.log("reached route");

  const itemId = req.body.d;
  console.log(itemId);
  if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  itemQueries.productSold(itemId)
    .then(() => {
      console.log('successful');
      res.json(`item is Sold! `);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });;

});

module.exports = router;