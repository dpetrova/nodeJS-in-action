//Example of how the order in which asynchronous code executes can lead to confusion

"use strict";

function asyncFunction(callback) {
  setTimeout(callback, 200);
}

let color = "blue";

asyncFunction(() => {
  console.log("The color is", color); //This is executed last (200 ms later)
});

color = "green";
console.log(color);
