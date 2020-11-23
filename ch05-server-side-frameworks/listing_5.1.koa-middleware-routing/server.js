const koa = require('koa');
const app = koa();

//Uses the generator syntax for middleware functions
app.use(function *(next) {
  const start = new Date;
  yield next; //Yields to run the next middleware component
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(function *() {
  this.body = 'Hello World'; //Execution passes back to the original yield here
});

app.listen(3000);
