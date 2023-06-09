DROP TABLE IF EXISTS order_history CASCADE;
CREATE TABLE order_history (
  id SERIAL PRIMARY KEY NOT NULL,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_date date
);
