'use strict';
const memdb = require('..');
const assert = require('assert');

//describes memdb functionality
describe('memdb', () => {

  //clear database before each test case to keep tests stateless
  beforeEach(() => {
    memdb.clear();
  });

  //describes .saveSync() method’s functionality
  describe('syncronous .saveSync(doc)', () => {
    //describes the expectation
    it('should save the document', () => {
      const pet = { name: 'Tobi' };
      memdb.saveSync(pet);
      const ret = memdb.first({ name: 'Tobi' });
      //ensures the pet was found
      assert(ret == pet);
    });
  });
  
  describe('.first(obj)', () => {
    it('should return the first matching doc', () => {
      const tobi = { name: 'Tobi' };
      const loki = { name: 'Loki' };
      memdb.saveSync(tobi);
      memdb.saveSync(loki);
      //makes sure each one can be returned properly
      let ret = memdb.first({ name: 'Tobi' });
      assert(ret == tobi);
      ret = memdb.first({ name: 'Loki' });
      assert(ret == loki);
    });

    it('should return null when no doc matches', () => {
      const ret = memdb.first({ name: 'Manny' });
      assert(ret == null);
    });
  });
});

describe('asyncronous .save(doc)', () => {
  //Mocha test cases can be defined as asynchronous by adding an "done' argument to a function
  it('should save the document', (done) => {
    const pet = { name: 'Tobi' };
    //invokes callback with first doc
    memdb.save(pet, () => {
      const ret = memdb.first({ name: 'Tobi' });
      //assert document saved properly
      assert(ret == pet);
      //tells Mocha you’re done with this test case
      done();
    });
  });
});
