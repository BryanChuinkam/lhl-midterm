const db = require('../connection');

const addItemDatabase = (product,seller_id) => {
  console.log("enter the db", product.name,
  product.description,
  product.product_image,
  product.category_name,
  product.price,
  product.stock);
  return db.query(
    'INSERT INTO products (seller_id, name, description, thumbnail_photo_url, category_name, price, stock, promotion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      seller_id,
      product.name,
      product.description,
      product.product_image,
      product.category_name,
      product.price,
      product.stock,
      true
    ])
};

module.exports = { addItemDatabase };
