const vows = require('vows');
const assert = require('assert');
const Todo = require('./../todo');

//a batch
vows.describe('Todo').addBatch({
  // a context
  'when adding an item': {
    //a topic
    topic: () => {
      const todo = new Todo();
      todo.add('Feed my cat');
      return todo;
    },
    //a vow
    'it should exist in my todos': (er, todo) => {
      assert.strictEqual(todo.length, 1);
    }
  }
}).export(module);
