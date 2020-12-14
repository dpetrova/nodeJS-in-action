'use strict';
const express = require('express');
const session = require('express-session'); //sessions support middleware module
const path = require('path');
const favicon = require('serve-favicon'); //serve default favicon
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); //when form data is submitted, the bodyParser() middleware populates req.body with the submitted data
const user = require('./middleware/user');
const validate = require('./middleware/validate');

const routes = require('./routes/index');
const entries = require('./routes/entries');
const users = require('./routes/users');
const register = require('./routes/register');
const messages = require('./middleware/messages');
const page = require('./middleware/page');
const Entry = require('./models/entry');
const login = require('./routes/login');
const api = require('./routes/api');

const app = express();

/* CONFIGURE APP */
//under the settings.prop can be accessed prop that is set by app.set('prop', 'value')

// view engine setup
app.set('views', path.join(__dirname, 'views')); //specifies the directory that Express will use during view lookup
app.set('view engine', 'ejs');
app.set('json spaces', 2); //JSON will be printed in a more readable format

/* USE MIDDLEWARES */
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //output development-friendly colored logs
app.use(bodyParser.json()); //parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); //mount cookie middleware
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true })); //mount session middleware
app.use(express.static(path.join(__dirname, 'public'))); //serve static files from ./public
app.use(messages); //mount message middleware
app.use('/api', api.auth); //use authentication middleware when access routes with prefix /api
app.use(user);

/* RESTful api */
app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries); //use pagination middleware

app.get('/post', entries.form);
app.post('/post', validate.required('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit); //use route-specific-middlewares to perform form fields validation

app.use('/users', users);

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

//add callback triggers to route parameters
app.param('page', (req, res, next, id) => {
  if (!isNaN(parseInt(id, 10))) {
    next();
  } else {
    routes.notfound(req, res, next);
  }
});

app.get('/:page?', page(Entry.count, 5), entries.list);

if (process.env.ERROR_ROUTE) {
  app.get('/dev/error', (req, res, next) => {
    let err = new Error('database connection failed');
    err.type = 'database';
    next(err);
  });
}

/* ERROR HANDLING */
app.use(routes.notfound);
app.use(routes.error);

module.exports = app;
