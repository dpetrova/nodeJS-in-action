/* Using spies */

const sinon = require('sinon');
const Database = require('./db');
const fs = require('fs');

const database = new Database('./sample.json');

//replace original fs method
const fsWriteFileSpy = sinon.spy(fs, 'writeFile');

//create a spy as callback to pass to db.save(cb)
const saveDone = sinon.spy();

//perform some db operations
database.insert('name', 'Charles Dickens');
database.save(saveDone);

//ensure writeFile is called only once
sinon.assert.calledOnce(fsWriteFileSpy);

//restore the original method
fs.writeFile.restore();
