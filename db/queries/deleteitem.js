const db = require('../connection');

const deleteProductQuery = (itemId) => {
  console.log("query the database");
  console.log(itemId);
  const queryString = 'DELETE FROM products WHERE id =$1;';
  const values = [itemId];
  return db.query(queryString, values)
    .then(() => {
      console.log("delete success");
      // return data.rows;
    });
};

module.exports = { deleteProductQuery };