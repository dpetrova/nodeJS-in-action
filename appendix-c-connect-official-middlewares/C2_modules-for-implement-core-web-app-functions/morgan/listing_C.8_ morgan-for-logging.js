/* Using morgan module for logging */

const connect = require('connect');
const morgan = require('morgan');

connect()
  .use(morgan('combined')) //invoke morgan as a function to return a middleware function (by using the "combined" logging format argument, this Connect application will output the Apache log format)
  .use((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end('Logging\n'); //responds to the request with a message
  })
  .listen(3000);