//To “freeze” the contents of the color variable, you can use a JavaScript closure

"use strict";

function asyncFunction(callback) {
  setTimeout(callback, 200);
}

let color = "blue";

// wrap the call to asyncFunction in an anonymous function that takes a color argument.
// You then execute the anonymous function immediately, sending it the current contents of color.
// By making color an argument for the anonymous function, it becomes local to the scope of that function,
//and when the value of color is changed outside the anonymous function, the local version is unaffected
((color) => {
  asyncFunction(() => {
    console.log("The color is", color);
  });
})(color);

color = "green";
console.log(color);
