const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const entries = require('./routes/entries');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const login = require('./routes/login');
const register = require('./routes/register');
const session = require('express-session');
const users = require('./routes/users');
const user = require('./middleware/user');
const validate = require('./middleware/validate');
const messages = require('./middleware/messages');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(messages);
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);

app.use('/users', users);

app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post',
  validate.required('entry[title]'),
  validate.lengthAbove('entry[title]', 4),
  entries.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
 
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
