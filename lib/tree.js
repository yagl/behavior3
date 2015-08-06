
import {createUUID} from './utils';
import Tick from './tick';

export default class BehavoirTree {
  constructor() {
    this.id = createUUID();
    this.root = null;
  }
  tick(target, blackboard) {
    var tick = new Tick(this, target, blackboard);

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

    // close the nodes
    for (var i = lastOpenNodes.length - 1; i >= start; i -= 1) {
      lastOpenNodes[i]._close(tick);
    }

    blackboard.set('openNodes', currOpenNodes, this.id);
    blackboard.set('nodeCount', tick.nodeCount, this.id);
  }
}
