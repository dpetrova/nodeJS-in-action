/*  Comparison of getting data with localStorage vs. localForage */

/* SETTING DATA */
//localStorage set data:
localStorage.setItem('key', JSON.stringify('value'));

//localForage set data:
localforage.setItem('somekey', 'some value').then(function (value) {
  // Do other things once the value has been saved.
  console.log(value);
}).catch(function(err) {
  // This code runs if there were any errors
  console.log(err);
});

/* GETTING DATA */
//localStorage: blocking, synchronous 
const value = localStorage.getItem('key');
console.log(value);

//localForage: nonblocking, asynchronous using promises
localforage.getItem('somekey')
 .then((value) => {
   // This code runs once the value has been loaded   
   console.log(value)
  })
 .catch(function(err) {
  // This code runs if there were any errors
  console.log(err);
});

//localForage: nonblocking, asynchronous call using node callback-style
localforage.getItem('somekey', (err, value) => {
  // This code runs once the value has been loaded
 console.log(value);
});

//localForage: nonblocking, asynchronous call using async/await
try {
  const value = await localforage.getItem('somekey');
  // This code runs once the value has been loaded  
  console.log(value);
} catch (err) {
  // This code runs if there were any errors.
  console.log(err);
}


/* CONFIGURE STORAGE MECHANISM */
//localForage utilizes the best storage mechanism available in the current browser environment (if IndexedDB is available, localForage will use that, otherwise, it’ll try to fall back to WebSQL or even using web storage if required)
//configure the order in which the stores will be tried and even blacklist certain options
localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]) //this will never fall back to using localStorage