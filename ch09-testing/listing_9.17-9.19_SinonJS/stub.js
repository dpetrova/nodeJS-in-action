/* Using stubs */

const sinon = require('sinon');
const Database = require('./db');
const fs = require('fs');

const database = new Database('./sample.json');

//replace writeFile with your own function
const stub = sinon.stub(fs, 'writeFile', (file, data, cb) => {
  cb();
});

//create a spy as callback to pass to db.save(cb)
const saveDone = sinon.spy();

//perform some db operations
database.insert('name', 'Charles Dickens');
database.save(saveDone);

//ensure writeFile was called
sinon.assert.calledOnce(stub);
//ensure database.save’s callback was run
sinon.assert.calledOnce(saveDone);

//restore the original method
fs.writeFile.restore();
