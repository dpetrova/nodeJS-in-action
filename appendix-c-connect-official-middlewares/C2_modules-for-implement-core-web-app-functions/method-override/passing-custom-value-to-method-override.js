/* Allow the server to get a hint about which HTTP method to use by passing a custom value to methodOverride */

//by default, the HTML input name is _method, but you can pass a custom value to methodOverride
const connect = require('connect');
const methodOverride = require('method-override');

connect()
 .use(methodOverride('__method__'))
 .listen(3000)