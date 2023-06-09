const db = require('../connection');

const getMessages = (adminId) => {
  console.log("query the database");
  const queryString0 = 'SELECT * FROM messages WHERE thread_id = $1 order by created_at desc;';
  const queryString = `SELECT messages.message, messages.created_at,users.user_name,messages.thread_id,products.name
                        FROM messages 
                        JOIN threads ON messages.thread_id = threads.id
                        JOIN users ON threads.buyer_id = users.id
                        Join products on threads.product_id=products.id
                        WHERE threads.seller_id = $1
                        group by messages.message, messages.created_at, users.user_name, messages.thread_id, products.name
                        order by messages.created_at desc; `;
  const values = [adminId];
  return db.query(queryString, values)
    .then((data) => {
      return data.rows;
    }).catch((err) => {
      console.log(err.message);
    });;
};

const sendMessage = (message, threadId) => {
  console.log("enter the db", message.text);
  return db.query(
    'INSERT INTO messages (message,thread_id) VALUES ($1, $2);',
    [
      message.messageText,
      threadId
    ]).catch((err) => {
      console.log(err.message);
    });

};

const sendNewMessage = (message, buyerId) => {
  console.log("enter the db", message.messageText);
  return db.query(
    'WITH createThread AS (INSERT INTO threads (product_id, seller_id, buyer_id) VALUES ($1, $2, $3)RETURNING id) INSERT INTO messages (message, thread_id) SELECT $4, id FROM createThread;',
    [
      message.productId,
      1,
      buyerId,
      message.messageText
    ]).catch((err) => {
      console.log(err.message);
    });

};

const getSellerProduct = (productId) => {
  console.log("query the database");
  const queryString = `SELECT users.user_name, products.name,users.id
  FROM products 
  JOIN users ON products.seller_id = users.id
  WHERE products.id= $1
  group by users.user_name, products.name,users.id; `;
  const values = [productId];
  return db.query(queryString, values)
    .then((data) => {
      return data.rows;
    }).catch((err) => {
      console.log(err.message);
    });;
};


module.exports = { getMessages, sendNewMessage, sendMessage, getSellerProduct };