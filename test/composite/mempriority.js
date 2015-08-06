
var b3 = require('./../../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

var tickStub = require('./../fixtures/tickstub');

describe('composite:MemPriority', function () {
  var getNode = function() {
      var execute = sinon.stub();

      for (var i = 0; i < arguments.length; i++) {
          execute.onCall(i).returns(arguments[i]);
      }

      return {execute};
  };

  it('should have a name', function () {
    var node = new b3.composite.MemPriority([]);

    expect(node.name).to.be.equal('MemPriority');
  });

  it('should SUCCESS when at least one child SUCCESS', function() {
    var node1 = getNode(b3.State.FAILURE);
    var node2 = getNode(b3.State.SUCCESS);
    var node3 = getNode(b3.State.SUCCESS);

    var sequence = new b3.composite.MemPriority([node1, node2, node3]);
    var tick = tickStub();
    tick.blackboard.get.returns(0);
    var status = sequence.tick(tick);

    expect(status).to.be.equal(b3.State.SUCCESS);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.called).to.be.equal(false);
  });

  it('should FAILURE when all childs FAILURE', function() {
    var node1 = getNode(b3.State.FAILURE);
    var node2 = getNode(b3.State.FAILURE);
    var node3 = getNode(b3.State.FAILURE);

    var sequence = new b3.composite.MemPriority([node1, node2, node3]);
    var tick = tickStub();
    tick.blackboard.get.returns(0);
    var status = sequence.tick(tick);

    expect(status).to.be.equal(b3.State.FAILURE);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledOnce).to.be.equal(true);
  });

  it('should RUNNING when one child is RUNNING', function() {
    var node1 = getNode(b3.State.FAILURE);
    var node2 = getNode(b3.State.FAILURE);
    var node3 = getNode(b3.State.RUNNING);
    var node4 = getNode(b3.State.SUCCESS);

    var sequence = new b3.composite.MemPriority([node1, node2, node3, node4]);
    var tick = tickStub();
    tick.blackboard.get.returns(0);
    var status = sequence.tick(tick);

    expect(status).to.be.equal(b3.State.RUNNING);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledOnce).to.be.equal(true);
    expect(node4.execute.called).to.be.equal(false);
  });

  it('memorise running child from previous tick', function() {
    var node1 = getNode(b3.State.FAILURE);
    var node2 = getNode(b3.State.FAILURE);
    var node3 = getNode(b3.State.RUNNING, b3.State.FAILURE);
    var node4 = getNode(b3.State.SUCCESS);
    var node5 = getNode(b3.State.FAILURE);

    var mpriority = new b3.composite.MemPriority(
      [node1, node2, node3, node4, node5]);
    var tick = tickStub();
    mpriority.id = 0;
    node1.id = 0;

    // execute two times, the first returning running, the second failure
    tick.blackboard.get.withArgs('runningChild', 0, 0)
                       .returns(0)
    var status = mpriority.execute(tick);
    expect(status).to.be.equal(b3.State.RUNNING);

    expect(
        tick.blackboard.set
            .withArgs('runningChild', 0, 0, 0)
            .calledOnce
    ).to.be.equal(true);

    expect(
        tick.blackboard.set
            .withArgs('runningChild', 2, 0, 0)
            .calledOnce
    ).to.be.equal(true);

    // second execute
    tick.blackboard.get.withArgs('runningChild', 0, 0)
                       .returns(2);
    
    status = mpriority.execute(tick);
    expect(status).to.be.equal(b3.State.SUCCESS);

    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledTwice).to.be.equal(true);
    expect(node4.execute.calledOnce).to.be.equal(true);
    expect(node5.execute.called).to.be.equal(false);
  });
});