/* Using jsdom to scrape a dynamic HTML */

const jsdom = require('jsdom');
const jqueryPath = './node_modules/jquery/dist/jquery.js'; //specifies the jQuery path

//HTML with no static values but a script that dynamically inserts the values
const html = `
<div class="book">
  <h2></h2>
  <h3></h3>
  <script>
    document.querySelector('h2').innerHTML = 'Catch-22';
    document.querySelector('h3').innerHTML = 'Joseph Heller';
  </script>
</div>
`;

//create an object that represents the document
const doc = jsdom.jsdom(html);
const window = doc.defaultView;

//insert jQuery into the document
jsdom.jQueryify(window, jqueryPath, function() {
  var $ = window.$;
  $('.book').each(function() {
    var $el = $(this);
    //extract book values
    console.log({
      title: $el.find('h2').text(),
      author: $el.find('h3').text()
    });
  });
});
