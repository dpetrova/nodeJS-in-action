/* Parsing form requests */

const connect = require('connect');
const bodyParser = require('body-parser');

connect()
  .use(bodyParser.urlencoded({ extended: false })) //add the body parser to the middleware stack (when extended=true, this option causes the body parser to use another library to parse the query-string format)
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You sent: ' + JSON.stringify(req.body) + '\n'); //return the request body as a string
  })
  .listen(3000);