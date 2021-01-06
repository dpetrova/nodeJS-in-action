const hogan = require('hogan.js');

//template code used for partial
const studentTemplate = `
  <p>
    Name: {{name}},
    Age: {{age}} years old
  </p>
`;

//main template code
const mainTemplate = `
  {{#students}}
    {{>student}}
  {{/students}}
`;

const context = {
  students: [{
    name: 'Jane Narwhal',
    age: 21
  }, {
    name: 'Rick LaRue',
    age: 26
  }]
};

//compiling the main and partial templates
const template = hogan.compile(mainTemplate);
const partial = hogan.compile(studentTemplate);

//rendering the main template and partial
const html = template.render(context, { student: partial });
console.log(html);
