const express = require('express');
const router = express.Router();

// Define the route handler for /api/itemsSellerApi
router.get('/', (req, res) => {
  const items = [
    { name: 'Item 1', price: 10, stock: 5, description: 'Item 1 description' },
    { name: 'Item 2', price: 20, stock: 3, description: 'Item 2 description' },
  ];

  res.json(items);
});

module.exports = router;
