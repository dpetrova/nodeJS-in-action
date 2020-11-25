const app = require('connect')();
//the function passed to app.use is a middleware component that ends the request by sending back the Hello, world! text as a response
app.use((req, res, next) => {
  res.end('Hello, world!');
});
app.listen(3000);

//a middleware component is a JS function that by convention accepts three arguments:
//a request object, a response object, and an argument commonly named next,
//which is a callback function indicating that the component is done and the subsequent middleware component can be executed