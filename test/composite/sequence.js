
var b3 = require('./../../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('composite:Sequence', function () {
  var getNode = function(status) {
    var execute = sinon.stub();
    execute.returns(status);

    return {execute};
  }

  var getTick = function() {
    return {
      tickNode: sinon.spy()
    };
  }

  it('should have a name', function () {
    var node = new b3.composite.Sequence([]);

    expect(node.name).to.be.equal('Sequence');
  });

  it('should SUCCESS when all childs SUCCESS', function() {
    var node1 = getNode(b3.State.SUCCESS);
    var node2 = getNode(b3.State.SUCCESS);
    var node3 = getNode(b3.State.SUCCESS);

    var sequence = new b3.composite.Sequence([node1, node2, node3]);
    var status = sequence.tick(getTick());

    expect(status).to.be.equal(b3.State.SUCCESS);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledOnce).to.be.equal(true);
  });

  it('should FAILURE when at least on child FAILURE', function() {
    var node1 = getNode(b3.State.SUCCESS);
    var node2 = getNode(b3.State.SUCCESS);
    var node3 = getNode(b3.State.FAILURE);
    var node4 = getNode(b3.State.SUCCESS);

    var sequence = new b3.composite.Sequence([node1, node2, node3, node4]);
    var status = sequence.tick(getTick());

    expect(status).to.be.equal(b3.State.FAILURE);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledOnce).to.be.equal(true);
    expect(node4.execute.called).to.be.equal(false);
  });

  it('should RUNNING when one child is RUNNING', function() {
    var node1 = getNode(b3.State.SUCCESS);
    var node2 = getNode(b3.State.SUCCESS);
    var node3 = getNode(b3.State.RUNNING);
    var node4 = getNode(b3.State.SUCCESS);

    var sequence = new b3.composite.Sequence([node1, node2, node3, node4]);
    var status = sequence.tick(getTick());

    expect(status).to.be.equal(b3.State.RUNNING);
    expect(node1.execute.calledOnce).to.be.equal(true);
    expect(node2.execute.calledOnce).to.be.equal(true);
    expect(node3.execute.calledOnce).to.be.equal(true);
    expect(node4.execute.called).to.be.equal(false);
  });
});