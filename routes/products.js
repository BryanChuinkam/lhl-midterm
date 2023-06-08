const express = require('express');
const router = express.Router();
const db = require('../db/queries/products');

router.get('/details', (req, res) => {
  db.fetchProduct(req.query.prodName)
    .then((product) => {
      res.json({ product });
    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/:product_name', (req, res) => {
  const templateVars = { prodName: req.params.product_name.replace(':', '') };
  res.render('productDetails', templateVars);
});



module.exports = router;
