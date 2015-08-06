
var Blackboard = require('./../dist/blackboard.js');
var expect = require('chai').expect;

describe('Blackboard', function () {
  var blackboard = null;

  beforeEach(function () {
    blackboard = new Blackboard();
  });

  it('should set a value', function () {
    blackboard.set('key', 123);

    expect(blackboard.get('key')).to.be.equal(123);
  });

  it('should set a value with tree context', function () {
    blackboard.set('key', 123, 0);

    expect(blackboard.get('key')).to.be.equal(undefined);
    expect(blackboard.get('key', 0)).to.be.equal(123);
    expect(blackboard.get('key', 1)).to.be.equal(undefined);
  });

  it('should set a value with tree and node context', function () {
    blackboard.set('key', 123, 0, 0);

    expect(blackboard.get('key')).to.be.equal(undefined);
    expect(blackboard.get('key', 0)).to.be.equal(undefined);
    expect(blackboard.get('key', 0, 0)).to.be.equal(123);
    expect(blackboard.get('key', 0, 1)).to.be.equal(undefined);
    expect(blackboard.get('key', 1, 1)).to.be.equal(undefined);
  });
});