//Use Watcher class to create a utility that watches a directory
//and renaming any files placed in it to lowercase and then copying the files into a separate directory

"use strict";
const fs = require("fs");
const Watcher = require("./watcher");
const watchDir = "./watch";
const processedDir = "./done";
const watcher = new Watcher(watchDir, processedDir);

// use the "on" method, inherited from the event emitter class, to set the logic used to process each file
watcher.on("process", (file) => {
  const watchFile = `${watchDir}/${file}`;
  const processedFile = `${processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processedFile, (err) => {
    if (err) throw err;
  });
});

watcher.start();

//To test after start the program, create
//create/drop files into the watch directory,
//and see the files pop up, renamed to lowercase, in the done directory
