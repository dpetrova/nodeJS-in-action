/* A WebdriverIO test */

'use strict';
const assert = require('assert');
const webdriverio = require('webdriverio');

describe('todo tests', () => {
  let client;

  before(() => {
    //set up WebdriverIO client
    client = webdriverio.remote();
    return client.init();
  });

  it('todo list test', () => {
    return client      
      .url('/') //get home page      
      .getTitle() //get title from head
      .then(title => assert.strictEqual(title, 'My to-do list')); //assert title is as expected
  });
});
