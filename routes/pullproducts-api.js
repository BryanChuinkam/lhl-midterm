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
    // Acquire a client from the pool
    const client = await pool.connect();

    // Execute a query to fetch items
    const queryResult = await client.query('SELECT * FROM items');

    // Release the client back to the pool
    client.release();

    // Send the query result as the response
    res.json(queryResult.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

module.exports = router;
