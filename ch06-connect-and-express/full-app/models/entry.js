'use strict';
const redis = require('redis');
const db = redis.createClient(); //instantiate Redis client


class Entry {
  constructor(obj) {
    //iterate keys in the object passed
    for (let key in obj) {
      this[key] = obj[key]; //merge values
    }
  }

  //retrieve a range of entries
  static getRange(from, to, cb) {
    //use Redis lrange function to retrieve entries
    db.lrange('entries', from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      //decode entries previously stored as JSON
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
  }

   //save entry to Redis
  save(cb) {
    //convert saved entry data to JSON string
    const entryJSON = JSON.stringify(this);
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

  static count(cb) {
    db.llen('entries', cb);
  }
}

module.exports = Entry;
