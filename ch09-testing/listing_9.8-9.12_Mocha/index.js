/* A small in-memory database */

'use strict';
const db = [];

//synchronous save of doc to database array
exports.saveSync = (doc, cb) => {
  db.push(doc);
};

//asynchronous save of doc to database array
exports.save = (doc, cb) => {
  db.push(doc);
  //simulate some sort of asynchronous operation
  if (cb) {
    setTimeout(() => {
      cb();
    }, 1000);
  }
};

//return first document in collection
exports.first = (obj) => {
  //select docs that match every property in obj
  return db.filter((doc) => {
    for (let key in obj) {
      //not a match; returns false and doesn’t select this doc
      if (doc[key] != obj[key]) return false;
    }
    //they all matched; returns and selects the doc
    return true;
  })
  //want only the first doc or null
  .shift();
};

//remove all the documents
exports.clear = () => {
  db.length = 0;
};


