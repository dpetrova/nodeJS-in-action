const level = require('level');

const db = level('./app.db', {
  valueEncoding: 'json'
});

const key = 'user';
const value = { name: 'Alice' };

//use put(key, value) to write a value
db.put(key, value, err => {
  if (err) throw err;

  //use get(key) to read a value
  db.get(key, (err, result) => {
    if (err) throw err;
    console.log('got value:', result);

    //use del(key) to deleate a value
    db.del(key, (err) => {
      if (err) throw err;
      console.log('value was deleted');
    });
  });
});

