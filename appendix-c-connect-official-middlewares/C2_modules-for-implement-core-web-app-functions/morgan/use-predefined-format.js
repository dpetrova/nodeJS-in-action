/* Using of a predefined formats (such as "short", "tiny", "dev") */

connect()
 .use(morgan('dev'))
 .use(hello)
 .listen(3000);
