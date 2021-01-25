/* Parsing Multipart form data */

const connect = require('connect');
const multipart = require('connect-multiparty');

//handling uploaded files
connect()
  .use(multipart()) //add the multipart middleware component
  .use((req, res, next) => {
    console.log(req.files); //log the files that were sent
    res.end('Upload received\n');
  })
  .listen(3000);

  /* example output:
  { 
      fieldName: 'file', 
      originalFilename: 'index.js',
      path: '/var/folders/d0/_jqj3lf96g37s5wrf79v_g4c0000gn/T/60201-p4pohc.js',
      headers:
        { 'content-disposition': 'form-data; name="file"; filename="index.js"',
        'content-type': 'application/octet-stream' }
  }
 */