/* using alternative back ends */

//some examples of alternative back ends are as follows: MySQL, Redis, MongoDB, JSON files, Google spreadsheets, AWS DynamoDB, Windows Azure table storage, Browser web storage (IndexedDB/localStorage)

const level = require('levelup')
//a commonly used alternative back end is memdown, which stores values entirely in memory rather than disk (particularly useful in a test environment)
const memdown = require('memdown')

//for memdown, the “path” here can be any string, since it doesn’t use the disk
const db = level('./level-articles.db', {
  keyEncoding: 'json',
  valueEncoding: 'json',
  db: memdown //passing memdown as the db parameter
});
