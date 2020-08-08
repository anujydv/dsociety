var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('../src/dbConnect/mongoose');
var session = require('express-session');
const mongodbsession = require('connect-mongodb-session')(session);
var createError = require('http-errors');
const compression = require('compression');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const helmet = require('helmet');
var logger = require('morgan');
var path = require('path');
const csrf = require('csurf');
var app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
// Routes

var defaultRoute = require('../routes/defaultRoute');
var UserAdminDashRoute = require('../routes/UserAdminDashRoute');
var commomManagerRoute = require('../routes/networkAdminRoutes/commomManagerRoute');
var cardManagerRoute = require('../routes/networkAdminRoutes/cardManagerRoute');
var identityManagerRoute = require('../routes/networkAdminRoutes/identityManagerRoute');
var networkManagerRoute = require('../routes/networkAdminRoutes/networkManagerRoute');
var participantManagerRoute = require('../routes/networkAdminRoutes/participantManagerRoute');
var transactionManagerRoute = require('../routes/networkAdminRoutes/transactionManagerRoute');
var PeerAdminDashRoute = require('../routes/PeerAdminDashRoute');
var commonRoute = require('../routes/commonRoute');

// session db selection
var store = new mongodbsession({
  uri: process.env.DB_URL_SERVER,
  collection: "session"
});

// view engine setup
var csrfProtection = csrf();
app.use(express.static(path.join(__dirname, '../public')));
app.use(compression());
app.use(helmet());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// print log in terminal
// app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'devil',
  saveUninitialized: false,
  resave: false,
  store: store,
  cookie: {
    maxAge: 3600000
  }
}));
// app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  // res.locals.csrfToken = req.csrfToken();
  res.locals.validate = req.session.validate;
  res.locals.status = req.session.status;
  res.locals.type = req.session.type;
  next();
});
app.use('/', defaultRoute);
app.use('/user', UserAdminDashRoute);
app.use('/network', commomManagerRoute);
app.use('/network', cardManagerRoute);
app.use('/network', identityManagerRoute);
app.use('/network', networkManagerRoute);
app.use('/network', participantManagerRoute);
app.use('/network', transactionManagerRoute);
app.use('/peer', PeerAdminDashRoute);
app.use('/common', commonRoute);
app.use((req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});
app.listen(port, function () {
  console.log("Server started at :", port);
});