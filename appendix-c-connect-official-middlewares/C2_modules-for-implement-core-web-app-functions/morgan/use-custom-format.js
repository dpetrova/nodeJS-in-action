/* Customizing log format */

const connect = require('connect');
const morgan = require('morgan');

connect()
 .use(morgan(':method :url :response-time ms')) //would output something like: GET /users 15 ms
 .use(hello)
 .listen(3000);
