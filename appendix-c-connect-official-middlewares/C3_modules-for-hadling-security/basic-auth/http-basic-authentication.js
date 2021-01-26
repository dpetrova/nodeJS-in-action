/* Using the basic-auth module */
//basic-auth module allows you to get the credentials from the HTTP Authorization header field

//when your application has the basic-auth module in use, web browsers will prompt for credentials the first time the user attempts to connect to your application

const auth = require('basic-auth');
const connect = require('connect');

//checks the password is valid using a hardcoded username
function passwordValid(credentials) {
  return credentials && credentials.name === 'tj' && credentials.pass === 'tobi';
}

connect()
  .use((req, res, next) => {
    const credentials = auth(req);
    //pass to next middleware if password is correct
    if (passwordValid(credentials)) next();
    //send back the WWWAuthenticate header when the password is incorrect
    else {      
      res.writeHead(401, {'WWW-Authenticate': 'Basic realm="example"' });
      res.end();
    }
  })
  .use((req, res) => {
    res.end('This is the secret area\n'); //next() will cause execution to continue to the protected parts of the application when authentication has succeeded
  })
  .listen(3000);
 