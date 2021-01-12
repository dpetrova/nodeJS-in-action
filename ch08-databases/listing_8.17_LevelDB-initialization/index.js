const level = require('level');

//when initialize a LevelDB you need to provide a path to the directory that will store the data
//because LevelDB can store arbitrary data of any type for both keys and values, it’s up to the calling application to handle data serialization and deserialization
//LevelUp can be configured to encode keys and values by using various data types (by default, both keys and values are encoded as UTF-8 strings)
const db = level('./app.db', {
  valueEncoding: 'json' //keys will remain as UTF-8 strings, but values are encoded/decoded as JSON
});
