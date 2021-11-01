// pull in whichever assert library you'd like to use
// const assert = require('assert'); // this is built into node
const chai = require('chai');  
const assert = chai.assert;    // Using Assert style

// pull in the main functions that will be tested
const sayHi = require('../hello-world');

// write the mocha describe() and it() function calls that will implement the test(s)


describe("Testing sayHello with a group of tests.",()=>{

  it("should return a salutation when passed a name", ()=>{
    assert.equal( sayHi("Mary"), "Hello, Mary" ); // this line actually tests our function
  });
  
  it("should return a salutation when passed a name without an exclamation", ()=>{
    assert.equal( sayHi("Tony"), "Hello, Tony" ); // this line actually tests our function
  });
  

});


