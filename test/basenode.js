
var b3 = require('./../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

var tickStub = require('./fixtures/tickstub');

describe('BaseNode', function () {
  it('should initialize', function () {
    var node = new b3.BaseNode();

    expect(node.id).to.be.not.equal(undefined);
  });

  it('should open node', function () {
    var node = new b3.BaseNode();
    var tick = tickStub();

    node.id = 0;
    node.execute(tick);

    var method = tick.blackboard.set.withArgs('isOpen', true, 0, 0);
    expect(method.calledOnce).to.be.equal(true);
  });

  it('should close node', function () {
    var node = new b3.BaseNode();
    var tick = tickStub();

    node.id = 0;
    node.execute(tick);

    var method = tick.blackboard.set.withArgs('isOpen', false, 0, 0);
    expect(method.calledOnce).to.be.equal(true);
  });

  it('should call functions on execute', function () {
    var node = new b3.BaseNode();
    var tick = tickStub();

    tick.blackboard.get
      .withArgs('isOpen', 0, 0)
      .returns(false);

    node.id    = 0;
    node.enter = sinon.spy();
    node.open  = sinon.spy();
    node.tick  = sinon.stub();
    node.tick.returns(b3.State.SUCCESS);
    node.close = sinon.spy();
    node.exit  = sinon.spy();
    node.execute(tick);

    expect(node.enter.withArgs(tick).calledOnce).to.be.equal(true);
    expect(node.open.withArgs(tick).calledOnce).to.be.equal(true);
    expect(node.tick.withArgs(tick).calledOnce).to.be.equal(true);
    expect(node.close.withArgs(tick).calledOnce).to.be.equal(true);
    expect(node.exit.withArgs(tick).calledOnce).to.be.equal(true);
  });

  it('should not open a node already opened', function () {
    var node = new b3.BaseNode();
    var tick = tickStub();

    tick.blackboard.get
      .withArgs('isOpen', 0, 0)
      .returns(true);

    node.id = 0;
    node.open  = sinon.spy();
    node.execute(tick);

    expect(node.open.neverCalledWith(tick)).to.be.equal(true);
  });

  it('should execute closing the node that does not return RUNNING', function () {
    var node = new b3.BaseNode();
    var tick = tickStub();

    node.id = 0;
    node.close  = sinon.spy();
    node.tick  = sinon.stub();
    node.tick.returns(b3.State.RUNNING);
    node.execute(tick);

    expect(node.close.neverCalledWith(tick)).to.be.equal(true);
  });

  it('should execute calling tick callbacks', function() {
    var node = new b3.BaseNode();
    var tick = tickStub();

    tick.blackboard.get.returns(false);
    node.execute(tick);

    expect(tick.enterNode.withArgs(node).calledOnce).to.be.equal(true);
    expect(tick.openNode.withArgs(node).calledOnce).to.be.equal(true);
    expect(tick.tickNode.withArgs(node).calledOnce).to.be.equal(true);
    expect(tick.closeNode.withArgs(node).calledOnce).to.be.equal(true);
    expect(tick.exitNode.withArgs(node).calledOnce).to.be.equal(true);
  });
});