var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var fetch = require("node-fetch");
var sessions = require('express-session');

var loginRouter = require('./routes/login.routes');
var tableRouter = require('./routes/table.routes');
var menuRouter = require('./routes/menu.routes');
var orderRouter = require('./routes/order.routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Connecting to database
mongoose.connect("mongodb://127.0.0.1:27017/soa_final",
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((result) => {
  console.log("Successfully connected to db");
}).catch((err) => {
  console.log("Failed to connect to db");
});

app.use('/', loginRouter);
app.use('/table', tableRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
