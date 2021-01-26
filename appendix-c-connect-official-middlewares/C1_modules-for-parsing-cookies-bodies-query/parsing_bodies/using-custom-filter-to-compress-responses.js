/* Using a custom filter function to compress response */

const connect = require('connect');
const compression = require('compression');

//by default, compression includes the MIME types text/*, */json, and */javascript in the default filter function to avoid compressing these data types:
function defaultfilter(req, res){
  const type = res.getHeader('Content-Type') || '';
  return type.match(/json|text|javascript/);
};

//to alter this behavior, you can pass a filter in the options object, which will compress only plain text:
function filter(req) {
 const type = req.getHeader('Content-Type') || '';
 return 0 === type.indexOf('text/plain');
}

connect()
 .use(compression({ filter: filter }))
 .use((req, res) => {
   res.setHeader('Content-Type', 'text/plain');
   res.end('This response is compressed!\n');
 })
 .listen(3000);