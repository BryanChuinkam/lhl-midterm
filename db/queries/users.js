const db = require('../connection');

// A function that takes the entered user data and adds it to the DB
const createUser = (user_name, email, password, city, province, phone_number) => {
  const contact_preference = '';
  const user_type = '';

  return db.query(
    'INSERT INTO users (user_name, email, password, city, province, phone_number, contact_preference, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);',
    [user_name, email, password, city, province, phone_number, contact_preference, user_type]
  );
};

const getUserByEmailOrPhoneNumber = (email, phone_number) => {
  return db.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2;', [email, phone_number])
    .then((data) => {
      return data.rows[0];
    });
};

module.exports = {
  createUser,
  getUserByEmailOrPhoneNumber,
};
