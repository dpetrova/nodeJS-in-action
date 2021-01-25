const connect = require('connect');
const cookieParser = require('cookie-parser'); //loads the cookie parser middleware

connect()
 .use(cookieParser()) //adds cookie parser to the middleware for this application
 .use((req, res, next) => {
    res.end(JSON.stringify(req.cookies)); //responds with a string version of the cookies
 })
 .listen(3000);