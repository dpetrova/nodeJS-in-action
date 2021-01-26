/* Using Logger otions, such as: stream, immediate, buffer to tweak how morgan behaves */

const fs = require('fs');
const morgan = require('morgan');
const log = fs.createWriteStream('/var/log/myapp.log', { flags: 'a' })

//using stream (allows you to pass a Node Stream instance that the logger will write to instead of stdout)
connect()
 .use(morgan({ format: ':method :url', stream: log }))
 .use('/error', error)
 .use(hello)
 .listen(3000);

 //using immediate (writes the log line when the request is first received, rather than waiting for the response)
connect()
 .use(connect.logger({ immediate: true }))
 .use('/error', error)
 .use(hello)
 .listen(3000);