/* Using method-override to support HTTP PUT */

const connect = require('connect');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//a broken user input that sends a PUT (not supported by every browsers)
function brokenEdit(req, res, next) {
    if ('GET' != req.method) return next();
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="put">'); //a form that sends a PUT instead of a GET or POST
    res.write('<input type="text" name="user[name]" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
}

//user input form that uses additional input of type=hidden with the name _method
function edit(req, res, next) {
    if ('GET' != req.method) return next();
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="post">');
    res.write('<input type="hidden" name="_method" value="put" />'); //sends a hint for the HTTP method by including the _method form variable
    res.write('<input type="text" name="user[name]" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
   }

function update(req, res, next) {
    if ('PUT' != req.method) return next(); //ensures the request has been sent with a PUT      
    res.end('Updated name to ' + req.body.user.name);
}

connect()
 .use(morgan('combined'))
 .use(bodyParser.urlencoded({ extended: false }))
 .use(methodOverride('_method')) //use the methodOverride middleware component to watch for the form variable
 .use(edit)
 .use(update)
 .listen(3000);