'use strict';
const assert = require('assert'); //Node built-in assert module
const Todo = require('./todo');

const todo = new Todo();
let testsCompleted = 0;

/*Test to make sure that no to-do items remain after deletion */
function deleteTest() {
  //add some data in order to test delete
  todo.add('Delete Me');
  //assert data was added correctly
  assert.strictEqual(todo.length, 1, '1 item should exist'); //args: 1-actual, 2-expected, 3-error message
  //delete all records
  todo.deleteAll();
  //assert record was deleted
  assert.strictEqual(todo.length, 0, 'No items should exist');
  //notes that test has completed
  testsCompleted++;
}

/* Test to make sure adding a to-do works */
function addTest () {
  //delete any existing items
  todo.deleteAll();
  //add item
  todo.add('Added');
  //assert that item exists
  assert.notStrictEqual(todo.length, 0, '1 item should exist');
  assert.strictEqual(todo.length, 1, '1 item should exist');
  //notes that test has completed
  testsCompleted++;
}

/* Test whether the doAsync callback is passed true */
function doAsyncTest(cb) {
  //callback will fire 2 secs later
  todo.doAsync(value => {
    //assert value is true
    assert.ok(value,'Callback should be passed true');
    //notes that test has completed
    testsCompleted++;
    //trigger callback when done (because this is an asynchronous test, you’re providing a callback function (cb) to signal to the test runner when the test has completed)
    cb();
  });
}

/* Test whether add throws error when missing a parameter */
function throwsTest(cb) {
  //todo.add called with no arguments; the second argument in the throws call is a regular expression that looks for the text "requires" in the error message
  assert.throws(todo.add, /requires/);
  //notes that test has completed
  testsCompleted++;
}

/* Running the tests and reporting test completion */
deleteTest();
addTest();
throwsTest();
doAsyncTest(() => {
  console.log(`Completed ${testsCompleted} tests`);
});
