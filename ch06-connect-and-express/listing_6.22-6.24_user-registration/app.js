const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const entries = require('./routes/entries');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const register = require('./routes/register');
const session = require('express-session'); //sessions support middleware module 
const users = require('./routes/users');
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.locals.user = {};

app.use(logger('dev'));
//when form data is submitted, the bodyParser() middleware populates req.body with the submitted data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.methodOverride());
//mount cookie middleware
app.use(cookieParser());
//mount session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
//mount message middleware
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);

app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit);
app.get('/register', register.form);
app.post('/register', register.submit);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
