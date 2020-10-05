//Implementing parallel flow control

"use strict";
const fs = require("fs");
const tasks = [];
const wordCounts = {};
const filesDir = "./text";
let completedTasks = 0;

function checkIfComplete() {
  completedTasks++;
  //When all tasks have completed, list each word used in the files and the number of times it was used
  if (completedTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`);
    }
  }
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();
  //Counts word occurrences in text
  words.filter((word) => word).forEach((word) => addWordCount(word));
}

//Gets a list of the files in the text directory
fs.readdir(filesDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    //Defines a task to handle each file.
    //Each task includes a call to a function that will asynchronously read the file and then count the file’s word usage
    const task = ((file) => {
      return () => {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(`${filesDir}/${file}`);
    //Adds each task to an array of functions to call in parallel
    tasks.push(task);
  });

  //Starts executing  every task in parallel
  tasks.forEach((task) => task());
});
