-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  province VARCHAR(255),
  city VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  contact_preference VARCHAR(255) NOT NULL,
  user_type VARCHAR(255) NOT NULL
);
