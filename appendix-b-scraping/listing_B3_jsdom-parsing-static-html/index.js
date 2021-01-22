/* Using jsdom to scrape a static HTMl page */

const jsdom = require('jsdom');

//a suitable HTML fragment
const html = `
<div class="book">
  <h2>Catch-22</h2>
  <h3>Joseph Heller</h3>
  <p>A satirical indictment of military madness.</p>
</div>
`;

//parses the document and loads jQuery
jsdom.env(html, ['./node_modules/jquery/dist/jquery.js'], scrape);

function scrape(err, window) {
  var $ = window.$; //aliases the jQuery object for convenience
  //iterates over the books using jQuery’s $.each method
  $('.book').each(function() {
    var $el = $(this);
    //uses jQuery’s traversal methods to get the values of the book
    console.log({
      title: $el.find('h2').text(),
      author: $el.find('h3').text(),
      description: $el.find('p').text()
    });
  });
}
