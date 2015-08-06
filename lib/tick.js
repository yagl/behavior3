
export default class Tick {
  constructor(tree, target, blackboard) {
    this.tree = tree;
    this.openNodes = [];
    this.nodeCount = 0;
    this.target = target;
    this.blackboard = blackboard;
  }
  enterNode(node) {
    this.nodeCount += 1;
    this.openNodes.push(node);
  }
  closeNode(node) {
    this.openNodes.pop();
  }
  // may be extended for debug
  openNode(node) {}
  tickNode(node) {}
  exitNode(node) {}
}
