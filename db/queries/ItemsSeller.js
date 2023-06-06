const db = require('../connection');

const getProductsBySellerId = () => {
  console.log("query the database");
  const queryString = 'SELECT * FROM products WHERE seller_id = $1;';
  const values = [1];
  return db.query(queryString, values)
    .then((data) => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getProductsBySellerId };
