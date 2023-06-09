const express = require('express');
const router = express.Router();
const sellerQueries = require('../db/queries/itemsSeller');

router.get('/', (req, res) => {
  sellerQueries.getProductsBySellerId(1)//change the value to req.session.user_id
    .then((items) => {
      // console.log(items);
      res.json(items);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;