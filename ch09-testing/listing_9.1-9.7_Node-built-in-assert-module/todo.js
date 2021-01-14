'use strict';

class Todo {
  constructor() {
    this.todos = []; //define in memory database
  }

  //add a to-do item
  add(item) {
    if (!item) throw new Error('Todo.prototype.add requires an item');
    this.todos.push(item);
  }

  //delete all to-do items
  deleteAll() {
    this.todos = [];
  }

  //get count of to-do items
  get length() {
    return this.todos.length;
  }

  //call back with “true” after 2 secs
  doAsync(cb) {
    setTimeout(cb, 2000, true);
  }
}

module.exports = Todo;
