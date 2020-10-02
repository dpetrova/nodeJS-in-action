//Create a class called Watcher that processes files placed in a specified filesystem directory

"use strict";
const fs = require("fs");
const events = require("events");

//Extends EventEmitter with method that processes files
class Watcher extends events.EventEmitter {
  constructor(watchDir, processedDir) {
    super(); //by calling the super() method in the constructor, we call the parent's constructor and gets access to the parent's properties and methods
    this.watchDir = watchDir;
    this.processedDir = processedDir;
  }

  //processes each file in watch directory
  watch() {
    fs.readdir(this.watchDir, (err, files) => {
      if (err) throw err;
      for (var index in files) {
        this.emit("process", files[index]);
      }
    });
  }

  // method to start watching
  start() {
    fs.watchFile(this.watchDir, () => {
      this.watch();
    });
  }
}

module.exports = Watcher;
