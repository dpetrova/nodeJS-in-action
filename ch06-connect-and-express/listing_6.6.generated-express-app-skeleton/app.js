var express = require('express');
var path = require('path');
var favicon = require('serve-favicon'); //serve default favicon
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//configure app
//view engine setup
app.set('views', path.join(__dirname, 'views')); //specifies the directory that Express will use during view lookup
app.set('view engine', 'ejs');
//JSON will be printed in a more readable format
app.set('json spaces', 2);

//under the settings.prop can be accessed prop that is set by app.set('prop', 'value')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //output development-friendly colored logs
app.use(bodyParser.json()); //parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //serve static files from ./public

//specify application routes
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
