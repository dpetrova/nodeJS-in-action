/* Using sessions in a small application that counts the number of times a given user has accessed the page */

const connect = require('connect');
const session = require('express-session');

connect()
  //initialize middleware component with basic options required to use sessions
  .use(session({
    secret: 'example secret', //determines whether the cookie used to identify the session is signed
    resave: false, //force the session to be saved on each request
    saveUninitialized: true //causes a session to be created even if no values were saved
  }))
  .use((req, res) => {
    //setting session expiration date
    // const hour = 3600000
    // req.session.cookie.expires = new Date(Date.now() + hour * 24);
    // req.session.cookie.maxAge = hour * 24;

    //manipulationg session cookies
    // req.session.cookie.path = '/admin';
    // req.session.cookie.httpOnly = false;

    //set up a “views” session variable and increments it
    req.session.views = req.session.views || 0;
    req.session.views++;
    //send the value back to the browser
    res.end('Views:' + req.session.views);
  })
  .listen(3000);

