const redis = require('redis');
const db = redis.createClient();

db.on('connect', () => console.log('Redis client connected to server.'));
db.on('ready', () => console.log('Redis server is ready.'));
db.on('error', err => console.error('Redis error', err));

//list is an ordered collection of string values

//add a value to a list
db.lpush('tasks', 'Paint the bikeshed red.', redis.print);
db.lpush('tasks', 'Paint the bikeshed green.', redis.print);

//retrieves a range of values, using start and end indices (-1 argument signifies the last item of the list)
db.lrange('tasks', 0, -1, (err, items) => {
  if (err) throw err;
  items.forEach(item => console.log(` ${item}`));
});


