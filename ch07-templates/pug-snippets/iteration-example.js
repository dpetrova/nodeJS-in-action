const pug = require('pug');
const fs = require('fs');
//const template = fs.readFileSync('./template-js-iteration.pug');
const template = fs.readFileSync('./template-non-js-iteration.pug');
const context = {
  messages: [
    'You have logged in successfully.',
    'Welcome back!'
  ]
};
const fn = pug.compile(template);
console.log(fn(context));