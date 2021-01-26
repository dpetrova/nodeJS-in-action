/* Through the use of middleware mounting, you can prefix both the server-static and serve-index modules to any path you like */

const connect = require('connect');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');

connect()
.use('/files', serveIndex('public', { icons: true, hidden: true })) //icons option is used to enable icons, and hidden option allow viewing of hidden files
.use('/files', serveStatic('public', { hidden: true })) //hidden option allow serving of hidden files
.listen(3000);

//in this example request GET /files serves the ./public directory