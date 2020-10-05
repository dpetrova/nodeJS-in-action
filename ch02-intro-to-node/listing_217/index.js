//Implementing serial flow control

"use strict";
const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser");
const configFilename = "./rss_feeds.txt";

//Task 1: Make sure the file containing the list of RSS feed URLs exists
function checkForRSSFile() {
  fs.exists(configFilename, (exists) => {
    if (!exists) {
      return next(new Error(`Missing RSS file: ${configFilename}`)); //Whenever there’s an error, return early
    }
    next(null, configFilename);
  });
}

//Task 2: Read and parse the file containing the feed URLs
function readRSSFile(configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    //Converts list of feed URLs to a string and then into an array of feed URLs
    feedList = feedList
      .toString()
      .replace(/^\s+|\s+$/g, "")
      .split("\n");
    //Selects random feed URL from array of feed URLs
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

//Task 3: Do an HTTP request and get data for the selected feed
function downloadRSSFeed(feedUrl) {
  request({ uri: feedUrl }, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200)
      return next(new Error("Abnormal response status code"));
    next(null, body);
  });
}

//Task 4: Parse RSS data into the array of items
function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) return next(new Error("No RSS items found"));
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

//Adds each task to be performed to an array in execution order
const tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];

//A function called next executes each task
function next(err, result) {
  if (err) throw err; //Throws exception if task encounters an error
  const currentTask = tasks.shift(); //Next task comes from array of tasks
  if (currentTask) {
    currentTask(result); //Executes current task
  }
}

next();
