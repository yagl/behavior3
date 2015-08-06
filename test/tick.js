
var b3 = require('./../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Tick', function () {
  it('should initialize', function () {
    var tick = new b3.Tick(null, null, null);

    expect(tick.tree).to.be.equal(null);
    expect(tick.target).to.be.equal(null);
    expect(tick.blackboard).to.be.equal(null);
    expect(tick.openNodes).to.be.not.equal(undefined);
    expect(tick.nodeCount).to.be.not.equal(undefined);

    expect(tick.openNodes.length).to.be.equal(0);
    expect(tick.nodeCount).to.be.equal(0);
  });

  it('update tick info on enter', function () {
    var tick = new b3.Tick(null, null, null);
    var node = {id: 1};

    tick.enterNode(node);

    expect(tick.openNodes.length).to.be.equal(1);
    expect(tick.nodeCount).to.be.equal(1);
    expect(tick.openNodes[0]).to.be.equal(node);
  });

  it('update tick info on close', function () {
    var tick = new b3.Tick(null, null, null);
    var node = {id: 1};

    tick.nodeCount = 1;
    tick.openNodes = [node];

    tick.closeNode(node);
    expect(tick.openNodes.length).to.be.equal(0);
    expect(tick.nodeCount).to.be.equal(1);
  });
});