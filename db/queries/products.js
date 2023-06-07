const db = require('../connection');

// const fetchProducts = () => {
//   console.log("hello")
//   const query = 'SELECT * FROM products';
//   return db.query(query).then((result) => result.rows);
// };

const fetchProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      return data.rows;
    });
};




module.exports = { fetchProducts };
