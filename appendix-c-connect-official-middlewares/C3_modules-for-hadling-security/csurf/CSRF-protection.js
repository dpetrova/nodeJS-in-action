/* CSRF protection */

//Cross-site request forgery (CSRF) is a form of attack that exploits the trust that a web browser has in a site. 
//The attack works by having an authenticated user on your application visit a different site that an attacker has either created or compromised, 
//and then making requests on the user’s behalf without them knowing about it

const bodyParser = require('body-parser');
const connect = require('connect');
const csurf = require('csurf');
const session = require('express-session');

const sesionOptions = {
 resave: false,
 saveUninitialized: false,
 secret: '1234'
};

connect()
 .use(bodyParser.urlencoded({ extended: false }))
 .use(session(sesionOptions))
 //load the csurf middleware component after the body parser and session handler
 .use(csurf())
 //shows authentication form for the / route
 .use((req, res, next) => {   
   if ('/' != req.url) return next();
   const token = req.csrfToken(); //get the current CSRF token by using this method added by csurf
   const html = `
      <form method="post" action="/save">
        <input type="text" name="_csrf" value="${token}">
        <button type="submit">Submit</button>
      </form>`;
   res.setHeader('Content-Type', 'text/html');
   res.end(html);
 })
 //this function will run after a POST with the right token
 .use((req, res) => {   
   const html = `
     <p>Body: ${req.body._csrf}</p>
     <p>Session secret: ${req.session.csrfSecret}</p>
    `;
   res.end(html);
 })
 //this is an error handler for when the token is incorrect
 .use((err, req, res, next) => {
   console.error(err);
   res.end('Did you get the csrf token wrong?');
 })
 .listen(3000);