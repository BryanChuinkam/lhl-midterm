const db = require('../connection');

const productSold = (itemId) => {
  console.log("query the database");
  console.log(itemId);
  const queryString = 'UPDATE products SET sold=true WHERE id = $1;';
  const values = [itemId];
  return db.query(queryString, values)
    .then(() => {
      console.log("Sold!");
    });
};

module.exports = { productSold };