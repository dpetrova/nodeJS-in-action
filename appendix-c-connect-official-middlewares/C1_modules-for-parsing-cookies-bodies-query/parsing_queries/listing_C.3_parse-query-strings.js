/* Parsing query strings */

const connect = require('connect');
const qs = require('qs');

connect()
  .use((req, res, next) => {
    console.log(req._parsedUrl.query);
    req.query = qs.parse(req._parsedUrl.query); //use qs to parse the query string
    next();
  })
  .use((req, res) => {
    console.log('query string:', req.query); //display the parsed query string
    res.end('\n');
  })
  .listen(3000);