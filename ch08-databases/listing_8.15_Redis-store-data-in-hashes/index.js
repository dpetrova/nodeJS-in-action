const redis = require('redis');
const db = redis.createClient();

db.on('connect', () => console.log('Redis client connected to server.'));
db.on('ready', () => console.log('Redis server is ready.'));
db.on('error', err => console.error('Redis error', err));

//hash is a collection of key/value pairs

//set hash key/value pairs (hmset command takes a key and an object representing the key/value pairs of the hash)
db.hmset('camping', {
  shelter: '2-person tent',
  cooking: 'campstove'
}, redis.print);

//get the “camping.cooking” value
db.hget('camping', 'cooking', (err, value) => {
  if (err) throw err;
  console.log('Will be cooking with:', value);
});

//get hash keys as an array
db.hkeys('camping', (err, keys) => {
  if (err) throw err;
  keys.forEach(key => console.log(`  ${key}`));
});

