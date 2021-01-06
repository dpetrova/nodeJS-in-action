/* entry file-parsing logic for a simple blogging application */

'use strict';
const fs = require('fs');
const http = require('http');

//function to read and parse blog entry text
function getEntries() {
  const entries = [];
  //read blog entry data from file
  let entriesRaw = fs.readFileSync('./entries.txt', 'utf8');
  //parse text into individual blog entries
  entriesRaw = entriesRaw.split('---');
  entriesRaw.map((entryRaw) => {
    const entry = {};
    //parse entry text into individual lines 
    const lines = entryRaw.split('\n');
    //parse lines into entry properties
    lines.map((line) => {
      if (line.indexOf('title: ') === 0) {
        entry.title = line.replace('title: ', '');
      } else if (line.indexOf('date: ') === 0) {
        entry.date = line.replace('date: ', '');
      } else {
        entry.body = entry.body || '';
        entry.body += line;
      }
    });
    entries.push(entry);
  });
  return entries;
}

console.log(getEntries())

// const server = http.createServer((req, res) => {
//   const entries = getEntries();  
//   res.json(entries);
//  });
//  server.listen(8000);