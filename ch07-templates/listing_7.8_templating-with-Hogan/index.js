/* simple example */
const hogan = require('hogan.js');
const templateSource = '{{message}}';
const context = { message: 'Hello template!' };
const template = hogan.compile(templateSource);
console.log(template.render(context));


/* example of iterating through multiple values*/
const hogan = require('hogan.js');
const context = {
  students: [
    { name: 'Jane Narwhal', age: 21 },
    { name: 'Rick LaRue', age: 26 }
  ]
};
const templateSource = `
  {{! This is a section iterating through students }}
  {{#students}}
    <p>Name: {{name}}, Age: {{age}} years old</p>
  {{/students}}

  {{! This is inverted section which  display a message when no student data exists in the context }}
  {{^students}}
    <p>No students found.</p>
  {{/students}}
`;
const template = hogan.compile(templateSource);
console.log(template.render(context));


/* example of using a lambda in Hogan*/
const hogan = require('hogan.js');
//requires Markdown parser (THIS IS DEPRIVATED! Use 'marked' instead)
const md = require('github-flavored-markdown');
//Mustache template also contains Markdown formatting
const templateSource = `
  {{#markdown}}**Name**: {{name}}{{/markdown}}
`;
//template context includes a section lambda to parse Markdown in the template
const context = {
  name: 'Rick LaRue',
  markdown: () => text => md.parse(text)
};
const template = hogan.compile(templateSource);
console.log(template.render(context)); 