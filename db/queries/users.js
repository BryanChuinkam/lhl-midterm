const bcrypt = require('bcrypt');
const db = require('../connection');



// A function that takes the entered user data and adds it to the DB
const createUser = (user_name, email, password, city, province, phone_number) => {
  const contact_preference = '';
  const user_type = '';

  // Generate a salt and hash the password
  return bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      return db.query(
        'INSERT INTO users (user_name, email, password, city, province, phone_number, contact_preference, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
        [user_name, email, hashedPassword, city, province, phone_number, contact_preference, user_type]
      );
    });
};

const getUserByEmailOrPhoneNumber = (email, phone_number) => {
  return db.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2;', [email, phone_number])
    .then((data) => {
      return data.rows[0];
    });
};

const getUserByEmail = (email) => {
  let values = [email];
  let queryString = 'SELECT id, user_name FROM users WHERE email = $1;';

  return db.query(queryString, values)
    .then((user) => {
      if (!user.rows) {
        return null;
      }
      return user.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

};





const getBuyerFavourites = (userName) => {
  let values = [userName];
  let queryString = `
    SELECT products.name, products.price, products.stock, products.description, products.thumbnail_photo_url, products.sold
    FROM products
    JOIN favourites ON favourites.product_id = products.id
    JOIN users ON users.id = favourites.buyer_id
    WHERE users.user_name LIKE $1;
  `;

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

const getBuyerId = (userName) => {
  let values = [userName];
  let queryString = `
    SELECT id
    FROM users
    WHERE user_name = $1;
  `;

  return db.query(queryString, values)
    .then((userId) => {
      if (!userId.rows) {
        return null;
      }
      return userId.rows;
    });
};

const getProductId = (productName) => {
  let values = [productName];
  let queryString = `
    SELECT id
    FROM products
    WHERE name = $1;
  `;

  return db.query(queryString, values)
    .then((prodId) => {
      if (!prodId.rows) {
        return null;
      }
      return prodId.rows;
    });
};

const addToFav = (buyer_id, product_id) => {
  let values = [buyer_id, product_id];
  let queryString = `INSERT INTO favourites (buyer_id, product_id) VALUES ($1, $2);`

  return db.query(queryString, values);


};

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}


module.exports = {
  createUser,
  getUserByEmailOrPhoneNumber,
  getUserByEmail,
  getBuyerFavourites,
  getBuyerId,
  getProductId,
  addToFav,
  generateUniqueId
};

