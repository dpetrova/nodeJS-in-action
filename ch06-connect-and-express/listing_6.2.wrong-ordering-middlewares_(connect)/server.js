const connect = require('connect');
function logger(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
}
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}
const app = connect()
  .use(hello)
  .use(logger) //logger will never be invoked because hello doesn’t call next().
  .listen(3000);

