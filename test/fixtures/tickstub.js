
var sinon = require('sinon');

export default function tickStub() {
  return {
    tree: {id: 0},
    blackboard: {
        set: sinon.spy(),
        get: sinon.stub()
    },
    openNodes: [],
    nodeCount: 0,
    enterNode: sinon.spy(),
    openNode: sinon.spy(),
    tickNode: sinon.spy(),
    closeNode: sinon.spy(),
    exitNode: sinon.spy()
  };
}