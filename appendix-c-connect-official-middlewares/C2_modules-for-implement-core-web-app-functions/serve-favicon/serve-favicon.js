/* Show address bar and bookmark icons */

const connect = require('connect');
const favicon = require('serve-favicon');

connect()
  .use(favicon(__dirname + '/favicon.ico')) //serve-favicon sending an .ico file by passing the file path as the only argument
  .use((req, res) => {
     res.end('Hello World!\n');
  });