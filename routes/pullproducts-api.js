const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/additem');

// Define the route handler for /api/itemsSellerApi
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;
