//Instead of using nested callbacks:

// setTimeout(() => {
//   console.log("I execute first.");
//   setTimeout(() => {
//     console.log("I execute next.");
//     setTimeout(() => {
//       console.log("I execute last.");
//     }, 100);
//   }, 500);
// }, 1000);

//Use a flow-control tool such as Async (http://caolan.github.io/async/):

("use strict");
const async = require("async");
//provides an array of functions for Async to execute, one after the other
async.series([
  (callback) => {
    setTimeout(() => {
      console.log("I execute first.");
      callback();
    }, 1000);
  },
  (callback) => {
    setTimeout(() => {
      console.log("I execute next.");
      callback();
    }, 500);
  },
  (callback) => {
    setTimeout(() => {
      console.log("I execute last.");
      callback();
    }, 100);
  },
]);
