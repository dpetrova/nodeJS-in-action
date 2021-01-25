const connect = require('connect');
const cookieParser = require('cookie-parser');

const secret = 'tobi is a cool ferret';

connect()
 .use(cookieParser(secret)) //the signed cookies are automatically added to the request object 
 .use((req, res) => {
    console.log('Cookies:', req.cookies); //access regular cookies from the request object
    console.log('Signed cookies:', req.signedCookies); //access the signed cookies from the request object
    res.end('hello\n');
 }).listen(3000);