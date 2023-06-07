const db = require('../connection');

const getProducts = (category_name) => {
  let queryString = 'SELECT * FROM products';
  let values = [];

 if(category_name){
    values.push(category_name);
    queryString += ` WHERE category_name = $${values.length};`
  } else {
    queryString += ';'
  }
  return db.query(queryString, values)
    .then((products) => {
      if (!products.rows) {
        return null;
      }
      return products.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

const getMaxPrice = (category_name) => {
  let queryString = 'SELECT max(price) FROM products';
  let values = [];

  if(category_name){
    values.push(category_name);
    queryString += ` WHERE category_name = $${values.length};`
  } else {
    queryString += ';'
  }

  return db.query(queryString, values)
    .then((products) => {
      if (!products.rows) {
        return null;
      }
      return products.rows[0].max;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

const productsByPriceRange = (category_name, min_price, max_price) => {
  const queryString = `SELECT *
                       FROM products
                       WHERE category_name = $1
                       AND price >=$2 and price <=$3 ;`;
  const values = [category_name, min_price, max_price];

  return db.query(queryString, values)
    .then((products) => {
      if (!products.rows) {
        return null;
      }
      return products.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getProducts, getMaxPrice, productsByPriceRange };
