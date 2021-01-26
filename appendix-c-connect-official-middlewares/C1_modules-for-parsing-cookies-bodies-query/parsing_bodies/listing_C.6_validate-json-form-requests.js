const connect = require('connect');
const bodyParser = require('body-parser');

connect()
  .use(bodyParser.json()) //add the JSON body parser
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(`Name: ${req.body.name}\n`); //get a value from the body object
  })
  .listen(3000);