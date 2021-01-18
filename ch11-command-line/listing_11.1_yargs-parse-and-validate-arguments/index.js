/* Using yargs to parse and validate command-line arguments */

// as example we use command-line application that reads JSON and prints it if it’s valid
// a command line for this example should look like: "node index.js -f test.json"

const readFile = require('fs').readFile;
const yargs = require('yargs');

const argv = yargs
  .usage('parse-json [options]') //provide usage text
  .help('h') //convention here is to print the usage text when -h or --help is passed
  .alias('h', 'help') //convention here is to print the usage text when -h or --help is passed
  .demand('f') //requires –f to run
  .nargs('f', 1) //tells yargs –f needs one argument after it  
  .describe('f', 'JSON file to parse')  
  .argv;

const file = argv.f;

readFile(file, (err, dataBuffer) => {
  const value = JSON.parse(dataBuffer.toString());
  console.log(JSON.stringify(value));
});
