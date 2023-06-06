const express = require('express');
const router  = express.Router();
const SellerQueries = require('../db/queries/ItemsSeller');

router.get('/', (req, res) => {
  SellerQueries.getProductsBySellerId()
    .then((items )=> {
      // console.log(items.rows);
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;