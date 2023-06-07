// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const loginRoutes = require('./routes/login');
const path = require('path');
const mime = require('mime');
const pullProductsApiRoutes = require('./routes/pullproducts-api');
const additemRoutes = require('./routes/additem');
const additemApiRoutes = require('./routes/additem-api');
const itemsSeller = require('./routes/itemsSeller');
const itemsSellerApi = require('./routes/itemsSellerApi');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Replace 'views' with the path to your views directory

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static(__dirname + '/public'));
app.use('/addItem', additemRoutes);
app.use('/api/additem', additemApiRoutes);
app.use('/itemsSeller', itemsSeller);
app.use('/api/itemsSellerApi', itemsSellerApi);
app.use('/', loginRoutes);

// Set MIME type for JavaScript files
app.use('/public/scripts', (req, res, next) => {
  const filePath = path.join(__dirname, 'public', 'scripts', req.path);
  const mimeType = mime.getType(filePath);

  if (mimeType === 'text/javascript') {
    res.setHeader('Content-Type', mimeType);
    next();
  } else {
    res.status(404).send('Not Found');
  }
});

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const productSearch = require('./routes/product_search');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/search', productSearch);
app.use('/api/pullproducts', pullProductsApiRoutes);


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
