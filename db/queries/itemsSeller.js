const db = require('../connection');

const getProductsBySellerId = (sellerID) => {
  console.log("query the database");
  const queryString = 'SELECT * FROM products WHERE seller_id = $1;';
  const values = [sellerID];
  return db.query(queryString, values)
    .then((data) => {
      return data.rows;
    });
};

module.exports = { getProductsBySellerId };
