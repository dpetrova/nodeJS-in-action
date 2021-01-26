/* Using serve-static module for automatically serving files to the browser */

const connect = require('connect');
const serveStatic = require('serve-static')
 
var app = connect()
 
app
 //serve up public folder
.use(serveStatic('public')) //files nested within directories are served as you’dexpect
.listen(3000)

//suppose you have a file foo.js in /public folder
//request to GET /foo.js will transfer the foo.js file