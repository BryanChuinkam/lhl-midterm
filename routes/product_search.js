const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/product_search');


router.get('/', (req, res) => {
  if (!req.query) {
    res.status(400).json({ error: 'invalid request: category not found' });
    return res.redirect('index.ejs');
  }

  const templateVars = { categorySearch: req.query.productSearched };
  res.render('search_results', templateVars);
});

router.get('/products', (req, res) => {
  userQueries.getProducts(req.query.productCategory)
    .then((products) => {
      userQueries.getMaxPrice()
        .then((maxPrice) => {
          res.json({ products, maxPrice });
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
