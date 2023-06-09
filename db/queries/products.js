const db = require('../connection');


const fetchProducts = () => {
  return db.query('SELECT * FROM products;')
    .then(data => {
      return data.rows;
    });
};


const fetchProduct = (prodName) => {
  let values = [prodName];
  let queryString = `
    SELECT products.name, products.price, products.stock, products.description, products.thumbnail_photo_url, products.sold
    FROM products
    WHERE name LIKE $1;
  `;

  return db.query(queryString, values)
    .then((product) => {
      if (!product.rows) {
        return null;
      }
      return product.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};


module.exports = { fetchProducts, fetchProduct };
