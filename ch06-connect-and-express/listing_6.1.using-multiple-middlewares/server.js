const connect = require('connect');

//define two middleware functions and add them both to the application
function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  //always calls next(), so subsequent middleware is invoked
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

//Connect provides a method called use for combining middleware components
connect()
  .use(logger)
  .use(hello)
  .listen(3000);