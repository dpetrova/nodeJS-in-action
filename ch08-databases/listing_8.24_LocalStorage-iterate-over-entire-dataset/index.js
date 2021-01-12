// You should be able to paste this into a browser

//get all keys
function getAllKeys() {
  return Object.keys(localStorage);
}

//get all values
const allValues = getAllKeys().map(key => localStorage.getItem(key));
console.log('allValues:', allValues);

//get all keys and values
function getAllKeysAndValues() {
  return getAllKeys()
    .reduce((obj, str) => { 
      obj[str] = localStorage.getItem(str); 
      return obj;
    }, {});
}
