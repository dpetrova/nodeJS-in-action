/* Parsing dates and generating CSV */

'use strict';
const cheerio = require('cheerio');
const fs = require('fs');
const moment = require('moment'); // date-parsing, validation, and formatting library

//load the input file
const html = fs.readFileSync('./input.html');
const $ = cheerio.load(html);

const books = $('.book')
   //.map method iterates over each book, and the callback extracts each element that you’re interested in by using the .find selector traversal method
  .map((i, el) => {
    return {
      author: $(el).find('h2').text(),
      title: $(el).find('h3').text(),
      published: $(el).find('h4').text()
    };
  })
  //get the resulting text values as an array
  .get();

//printing headers for the CSV file
console.log('title, author, sourceDate, dbDate');

//each row is printed in a loop that iterates over each book
books.forEach((book) => {
  let date = moment(new Date(book.published)); //parse the date
  console.log(
    '%s, %s, %s, %s',
    book.author,
    book.title,
    book.published,
    date.format('YYYY-MM-DD')
  );
});
