/* Using vhost which routes requests via the Host request header */

const connect = require('connect');
const server = connect();
const vhost = require('vhost');
const app = require('./sites/expressjs.js');

//it takes two arguments: first is the hostname string that this vhost instance will match against; second is the http.Server instance
server.use(vhost('expressjs.dev', app));
server.listen(3000);