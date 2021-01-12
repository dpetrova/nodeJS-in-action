//it’s common for serialization to be a key bottleneck on a web server

const bytes = require('pretty-bytes');
const obj = {};
for (let i = 0; i < 200000; i++) {
  obj[i] = {
    [Math.random()]: Math.random()
  };
}

//JSON.stringify and JSON.parse are native functions and have been thoroughly optimized, but they can easily be overwhelmed when handle megabytes of data. 
//serialize
console.time('serialise');
const jsonString = JSON.stringify(obj);
console.timeEnd('serialise');
console.log('Serialised Size', bytes(Buffer.byteLength(jsonString)));

//deserialize
console.time('deserialise');
const obj2 = JSON.parse(jsonString);
console.timeEnd('deserialise');
