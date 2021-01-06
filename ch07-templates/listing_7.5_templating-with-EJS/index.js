const ejs = require('ejs');
const fs = require('fs');
const http = require('http');
const filename = './templates/students.ejs';  // location of template file

//data to pass to template engine
const students = [
  { name: 'Rick LaRue', age: 23 },
  { name: 'Sarah Cathands', age: 25 },
  { name: 'Bob Dobbs', age: 37 }
];

//create http server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    //read template from a file
    fs.readFile(filename, (err, data) => {
      const template = data.toString();
      const context = { students: students };
      //render template (don’t enable caching if in development and you want to see any changes you make to your template files reflected immediately)
      const output = ejs.render(template, context);
      //enable caching
      //const cache = process.env.NODE_ENV === 'production';
      //const output = ejs.render(template, { students, cache, filename });

      res.setHeader('Content-type', 'text/html');
      //sende http respond
      res.end(output);
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8000);
