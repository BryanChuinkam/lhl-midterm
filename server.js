// Load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');
const mime = require('mime');






const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Replace 'views' with the path to your views directory

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


// Separate Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const productSearch = require('./routes/product_search');
const additemRoutes = require('./routes/additem');
const additemApiRoutes = require('./routes/additem-api');
const itemsSeller = require('./routes/itemsSeller');
const itemsSellerApi = require('./routes/itemsSellerApi');
const deleteItemApi = require('./routes/deleteItem-api');
const itemSoldApi = require('./routes/itemSold-api');

const messagingPageRoute = require('./routes/messaging');
const messagingApiRoute = require('./routes/messaging-api');
const getMessagesRoute = require('./routes/getmessages-api');
const pullProductsApiRoutes = require('./routes/pullproducts-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);

app.use('/users', usersRoutes);
app.use('/search', productSearch);
app.use('/api/pullproducts', pullProductsApiRoutes);
app.use('/addItem', additemRoutes);
app.use('/api/additem', additemApiRoutes);
app.use('/itemsSeller', itemsSeller);
app.use('/api/itemsSellerApi', itemsSellerApi);
app.use('/api/deleteItem', deleteItemApi);
app.use('/api/updateItemSold', itemSoldApi);
app.use('/search', productSearch);
app.use('/api/pullproducts', pullProductsApiRoutes);
app.use('/messaging', messagingPageRoute);
app.use('/api/messaging', messagingApiRoute);
app.use('/api/getAllMessagesApi', getMessagesRoute);

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

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  const isLoggedIn = req.session.user ? true : false;
  res.render('index', { isLoggedIn });
});

// Note: mount other resources here, using the same pattern above

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});