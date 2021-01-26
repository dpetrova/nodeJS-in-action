/* Using serve-index to generate directory listings */

const connect = require('connect');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');

connect()
.use(serveIndex('public'))
.use(serveStatic('public'))
.listen(3000);

//in this example request GET / serves the ./public directory