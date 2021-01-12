const redis = require('redis');
//const db = redis.createClient(6379, '127.0.0.1') //create Redis client instance
const db = redis.createClient(); //create Redis client instance (use default port of 6379 on local machine)

//Redis client instance is an EventEmitter, so you can attach listeners for various Redis status events:
db.on('connect', () => console.log('Redis client connected to server.'));
db.on('ready', () => console.log('Redis server is ready.'));
db.on('error', err => console.error('Redis error', err));

//Redis can be used as a generic key/value store for strings and arbitrary binary data
//write/read is done by using set/get methods:
db.set('color', 'red', err => {
  if (err) throw err;
});

db.get('color', (err, value) => {
  if (err) throw err;
  console.log('Got:', value);
});

//check whether a key exists
db.exists('color', (err, doesExist) => {
  if (err) throw err;
  console.log('color exists:', doesExist);
});
