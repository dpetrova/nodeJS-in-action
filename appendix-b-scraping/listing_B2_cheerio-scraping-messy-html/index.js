const fs = require('fs');
//load html from a file
const html = fs.readFileSync('./messy_html_example.html', 'utf8');
const cheerio = require('cheerio');

const $ = cheerio.load(html);

const book = {
  title: $('table tr td a').first().text(), //use cheerio’s first() method to get the specific link
  href: $('table tr td a').first().attr('href'), //use cheerio’s attr() method to get the URL
  author: $('table tr td').eq(1).text() //use cheerio’s eq() method to skip to the second element
};

console.log(book);
