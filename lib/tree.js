/**
 * module behavior3
 */

import {createUUID} from './utils';
import Tick from './tick';

/**
 * A behavior tree.
 * 
 * @class  BehaviorTree
 */
export default class BehavoirTree {
  /**
   * @constructor
   * @class  BehaviorTree
   */
  constructor() {
    /**
     * Unique ID of the BehaviorTree, this id is used when storing / retrieving
     * data to the blackboard object.
     * 
     * @property {Number} id
     */
    this.id = createUUID();

    /**
     * The root node of the tree.
     * 
     * @property {BaseNode} root
     */
    this.root = null;
  }
  /**
   * Apply the behavior tree to an entity with a context blackboard.
   *
   * @method  tick
   * @param  {*} target The target object of the tick.
   * @param  {Backbord} blackboard The blackboard too use as context.
   */
  tick(target, blackboard) {
    var tick = new Tick(this, target, blackboard);

    // execute the whole tree
    this.root.execute(tick);

    var lastOpenNodes = blackboard.get('openNodes', this.id);
    var currOpenNodes = tick.openNodes.slice(0);

    var start = 0;
    var max = Math.min(lastOpenNodes.length, currOpenNodes.length);

    // does not close if still open in this tick
    for (var i = 0; i < max; i += 1) {
      start = i + 1;
      if (lastOpenNodes[i] !== currOpenNodes[i]) {
        break;
      }
    }

    // close the nodes that are still opened
    for (var i = lastOpenNodes.length - 1; i >= start; i -= 1) {
      lastOpenNodes[i]._close(tick);
    }

    blackboard.set('openNodes', currOpenNodes, this.id);
    blackboard.set('nodeCount', tick.nodeCount, this.id);
  }
}
