/* Validating form requests */

const connect = require('connect');
const bodyParser = require('body-parser');

function verifyRequest(req, res, buf, encoding) {
  //throws an error when the format is incorrect  
  if (!buf.toString().match(/^name=/)) {
    throw new Error('Bad format');
  }
}

connect()
  .use(bodyParser.urlencoded({
    extended: false,
    limit: 10, //set the request limit (in bytes)
    verify: verifyRequest //add a verify function
  }))
  .use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You sent: ' + JSON.stringify(req.body) + '\n');
  })
  .listen(3000);