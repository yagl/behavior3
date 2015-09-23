/**
 * @module  behavior3
 */

/**
 * Represent a tick (update) which holds context for the tree traversal.
 * 
 * @class  Tick
 */
export default class Tick {
  /**
   * @class  Tick
   * @constructor
   * @param  {BehaviorTree} tree The behavior tree.
   * @param  {*} target Target object of the tick.
   * @param  {Blackboard} blackboard The associated blackboard.
   */
  constructor(tree, target, blackboard) {
    /**
     * The behavior tree.
     * @property {BehaviorTree} tree
     */
    this.tree = tree;

    /**
     * Store currentl opened nodes.
     * @property {Array} openNodes
     */
    this.openNodes = [];

    /**
     * Count the opened nodes.
     * @property {Number} nodeCount
     */
    this.nodeCount = 0;

    /**
     * The target object of the tick.
     * @property {*} target
     */
    this.target = target;

    /**
     * The blackboard context of the tick.
     * @property {Blackboard} blackboard
     */
    this.blackboard = blackboard;
  }
  /**
   * Push the node to opened nodes.
   * 
   * @method  enterNode
   * @param  {BaseNode} node The node to open.
   */
  enterNode(node) {
    this.nodeCount += 1;
    this.openNodes.push(node);
  }
  /**
   * Close the first node.
   *
   * @method  closeNode
   */
  closeNode(node) {
    this.openNodes.pop();
  }
  // may be extended for debug
  openNode(node) {}
  tickNode(node) {}
  exitNode(node) {}
}
