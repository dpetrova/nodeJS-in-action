#!/usr/bin/env node

/* Reading a file from stdin */

//If a file parameter is given as a hyphen (-f -), it means grab the data from stdin. 
//You can use the mississippi package to do this easily
// a command line for this example should look like: "node index.js -f -"

const concat = require('mississippi').concat;
const readFile = require('fs').readFile;
const yargs = require('yargs');

const argv = yargs
  .usage('parse-json [options]')
  .help('h')
  .alias('h', 'help')
  .demand('f') // require -f to run
  .nargs('f', 1) // tell yargs -f needs 1 argument after it
  .describe('f', 'JSON file to parse')
  .argv;

const file = argv.f;

function parse(str) {
  const value = JSON.parse(str);
  console.log(JSON.stringify(value));
}

if (file === '-') {
  process.stdin.pipe(concat(parse));
} else {
  readFile(file, (err, dataBuffer) => {
    if (err) throw err;
    else parse(dataBuffer.toString());
  });
}

//This snippet; the #!/usr/bin/env node line; and "bin": { "parse-json": "index.js" } in package json are all you need

//If you install this package with npm install –global, it will make the parse-json command available systemwide. 
//To try it, open a terminal (or command prompt in Windows) and type parse-json.