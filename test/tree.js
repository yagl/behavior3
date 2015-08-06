
var b3 = require('./../dist/index');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('BehaviorTree', function () {
  function getBlackboard() {
    return {
      set: sinon.spy(),
      get: sinon.stub()
    };
  }

  function getClosableNode(id) {
    return {
      id: id,
      _close: sinon.spy()
    };
  }

  it('should initialize', function () {
    var tree = new b3.BehaviorTree();

    expect(tree.id).to.be.a('number');
  });

  it('should call root node', function () {
    var tree = new b3.BehaviorTree();
    var node = {execute: sinon.stub()};
    var blackboard = getBlackboard();
    var target = {};

    blackboard.get.withArgs('openNodes', 0).returns([]);

    tree.id = 0;
    tree.root = node;
    tree.tick(target, blackboard);

    expect(node.execute.calledOnce).to.be.equal(true);
  });

  it('should populate blackboard', function () {
    var tree = new b3.BehaviorTree();
    var blackboard = getBlackboard();
    var target = {};
    var node = {execute: function(tick) {
        tick.enterNode(0),
        tick.enterNode(1)
    }};

    blackboard.get.withArgs('openNodes', 0)
                  .returns([]);

    tree.id = 0;
    tree.root = node;
    tree.tick(target, blackboard);

    var method = blackboard.set.withArgs('openNodes', [0, 1], 0);
    expect(method.calledOnce).to.be.equal(true);

    method = blackboard.set.withArgs('nodeCount', 2, 0);
    expect(method.calledOnce).to.be.equal(true);
  });

  it('should close opened nodes', function () {
    var tree = new b3.BehaviorTree();
    var blackboard = getBlackboard();

    var node1 = getClosableNode(1);
    var node2 = getClosableNode(2);
    var node3 = getClosableNode(3);
    var node4 = getClosableNode(4);
    var node5 = getClosableNode(5);
    var node6 = getClosableNode(6);
    var node7 = getClosableNode(7);

    var root = {execute: function(tick) {
        tick.enterNode(node1);
        tick.enterNode(node2);
        tick.enterNode(node3);
    }};

    blackboard.get.withArgs('openNodes', 0)
              .returns([node1, node2, node3, node4, node5, node6, node7])
              .withArgs('nodeCount', 0)
              .returns(7);

    tree.id = 0;
    tree.root = root;
    tree.tick(null, blackboard);

    expect(node7._close.calledOnce).to.be.equal(true);
    expect(node6._close.calledOnce).to.be.equal(true);
    expect(node5._close.calledOnce).to.be.equal(true);
    expect(node4._close.calledOnce).to.be.equal(true);
    expect(node3._close.called).to.be.equal(false);
    expect(node2._close.called).to.be.equal(false);
    expect(node1._close.called).to.be.equal(false);
  });

  it('should not close opened nodes', function () {
    var tree = new b3.BehaviorTree();
    var blackboard = getBlackboard();

    var node1 = getClosableNode(1);
    var node2 = getClosableNode(2);
    var node3 = getClosableNode(3);
    var node4 = getClosableNode(4);


    var root = {execute: function(tick) {
        tick.enterNode(node1);
        tick.enterNode(node2);
        tick.enterNode(node3);
        tick.enterNode(node4);
    }};

    blackboard.get.withArgs('openNodes', 0)
              .returns([node1, node2])
              .withArgs('nodeCount', 0)
              .returns(2);

    tree.id = 0;
    tree.root = root;
    tree.tick(null, blackboard);

    expect(node3._close.called).to.be.equal(false);
    expect(node2._close.called).to.be.equal(false);
    expect(node1._close.called).to.be.equal(false);
  });
});