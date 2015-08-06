
/**
 * Blackboard - the memory structure for bt/nodes. Allow to store:
 * - global information
 * - per-tree information
 * - per-tree and per-node information
 */
export default class Blackboard {
  constructor() {
    this.baseMemory = {};
    this.treeMemory = {};
  }
  /**
   * returns memory Map for given tree
   */
  getTreeMemory(treeScope) {
    if (!this.treeMemory[treeScope]) {
      this.treeMemory[treeScope] = {
        nodeMemory: {},
        openNodes: []
      };
    }

    return this.treeMemory[treeScope];
  }
  getNodeMemory(treeMemory, nodeScope) {
    var memory = treeMemory.nodeMemory;

    if (!memory[nodeScope]) {
      memory[nodeScope] = {};
    }

    return memory[nodeScope]
  }
  getMemory(treeScope, nodeScope) {
    var memory = this.baseMemory;

    if (treeScope !== undefined) {
      memory = this.getTreeMemory(treeScope);

      if (nodeScope !== undefined) {
        memory = this.getNodeMemory(memory, nodeScope);
      }
    }

    return memory;
  }
  set(key, value, treeScope, nodeScope) {
    var memory = this.getMemory(treeScope, nodeScope);

    memory[key] = value;
  }
  get(key, treeScope, nodeScope) {
    var memory = this.getMemory(treeScope, nodeScope);

    return memory[key];
  }
}