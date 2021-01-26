/* Using serve-static with mounting */

//Sometimes applications prefix pathnames with /public, /assets, /static

const connect = require('connect');
var serveStatic = require('serve-static')
 
var app = connect()
 
app 
.use('/app/files', serveStatic('public'))
//.use('/app/files', connect.static('public')) //use relative path
//.use('/app/files', connect.static(__dirname + '/public')) //use absolute path
.listen(3000)

//suppose you have a file foo.js in /public folder
//original request of GET /foo.js won’t work anymore
//but the prefixed version GET /app/files/foo.js will transfer the file