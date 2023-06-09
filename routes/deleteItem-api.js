const express = require('express');
const router = express.Router();
const itemQueries = require('../db/queries/deleteitem');

router.delete('/', function (req, res) {
  console.log("reached route");

  const itemId = req.body.d;
  console.log(itemId);
  if (!req.body) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  itemQueries.deleteProductQuery(itemId)
    .then(() => {
      console.log('successful');
      res.json(`item has been added `);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });;

});

module.exports = router;