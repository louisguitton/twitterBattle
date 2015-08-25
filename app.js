var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mongoose = require('mongoose');
// var passport = require('passport');
var flash = require('connect-flash');

var app = express();

var configDB = require('./scripts/config/database.js');

var routes = require('./routes/index');
var auth = require('./routes/auth');
var connect = require('./routes/connect');
var unlink = require('./routes/unlink');
var createBattle = require('./routes/createBattle');

//=================
// CONFIGURATION
//=================

mongoose.connect(configDB.url); // connect to our database

var passport = require('./scripts/config/passport') //(passport); // pass passport for configuration
  //maybe here it's an other variable

// setup Express application
app.use(express.static('public')); // app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
// passport configuration
app.use(session({
  secret: 'laguittemh'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//=================
// ROUTES
//=================
app.use('/', routes);
app.use('/auth', auth);
app.use('/connect', connect);
app.use('/unlink', unlink);
app.use('/create', createBattle);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//=================
// ERROR HANDLERS
//=================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;