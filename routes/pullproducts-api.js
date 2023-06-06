const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Create a new pool instance with your PostgreSQL connection details
const pool = new Pool({
  user: 'labber',
  host: 'localhost',
  database: 'midterm',
  password: 'labber',
  port: 5432,
});

// Define the route handler for /api/itemsSellerApi
router.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const queryResult = await client.query('SELECT * FROM items');

    client.release();
    res.json(queryResult.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;
