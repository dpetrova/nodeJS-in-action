const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});

//trying to get a key that doesn’t exist will result in an error
//this error object will be of a particular type, NotFoundError, and has a special property, err.notFound, that can be used to differentiate it from other types of errors
db.get('this-key-does-not-exist', (err, value) => {
  if (err && !err.notFound) throw err;
  if (err && err.notFound) return console.log('Value was not found.');
  console.log('Value was found:', value);
});
