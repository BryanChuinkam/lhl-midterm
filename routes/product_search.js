const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/product_search');


router.get('/', (req, res) => {
  if (!req.query) {
    res.status(400).json({ error: 'invalid request: category not found' });
    return res.redirect('index.ejs');
  }

  const templateVars = { categorySearch: req.query.query };
  res.render('search_results', templateVars);
});

router.get('/products', (req, res) => {
  if (!req.query) {
    res.status(400).json({ error: 'invalid request: category not found' });
    return res.redirect('index.ejs');
  }

  userQueries.getProducts(req.query.productCategory)
    .then((products) => {
      userQueries.getMaxPrice(req.query.productCategory)
        .then((maxPrice) => {
          console.log("maxPRICE", maxPrice)
          if (products.length > 0) {
            return res.json({ products, maxPrice });
          }
          else {
            return res.send('NOT FOUND');
          }

        });

    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.get('/products/filtered', (req, res) => {
  userQueries.productsByPriceRange(req.query.productCategory, req.query.minPrice, req.query.maxPrice)
    .then((products) => {
      res.json({ products });
    }).catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
