const redis = require('redis');
const db = redis.createClient(); //instantiate Redis client

class Entry {
  constructor(obj) {
    //iterate keys in the object passed
    for (let key in obj) {
      this[key] = obj[key]; //merge values
    }
  }

  save(cb) {
    const entryJSON = JSON.stringify(this); //convert saved entry data to JSON string
    //save JSON string to Redis list
    db.lpush(
      'entries',
      entryJSON,
      (err) => {
        if (err) return cb(err);
        cb();
      }
    );
  }
}

module.exports = Entry;
