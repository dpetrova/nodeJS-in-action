'use strict';
const chai = require('chai');
const assert = chai.assert; //select assertion interface
const expect = chai.expect; //select expect interface
chai.should() //select should interface

let foo = 'bar';
const tea = { flavors: ['chai', 'earl grey', 'pg tips'] };

/* Chai’s assert interface */
assert.typeOf(foo, 'string'); //type comparison
assert.equal(foo, 'bar');
assert.lengthOf(foo, 3);

assert.property(tea, 'flavors'); //checks that an object has the desired property
assert.lengthOf(tea.flavors, 3);


/* Chai’s expect interface */
expect(foo).to.be.a('string'); //type comparison
expect(foo).to.equal('bar');


/* Chai’s should interface */
foo.should.be.a('string');
foo.should.equal('bar');
