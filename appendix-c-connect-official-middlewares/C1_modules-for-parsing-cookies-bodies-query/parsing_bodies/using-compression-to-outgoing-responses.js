/*  Compressing outgoing responses */

const connect = require('connect');
const compression = require('compression');

//compress the response
connect()
  //add compression high in the Connect stack, because it wraps the res.write() and res.end() methods
  .use(compression({ threshold: 0, level: 3, memLevel: 8 })) //set compression level=3 for less but faster compression, and memLevel=8 for faster compression by using more memory
  .use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('This response is compressed!\n');
  })
  .listen(3000);