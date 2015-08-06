/*var Wait = function(milliseconds) {
    this.endTime = milliseconds;
    this.initialize();
}
Wait.prototype = new BaseNode();
Wait.prototype.open = function(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
}
 
Wait.prototype.tick = function(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);
    
    if (currTime - startTime > this.endTime) {
        return SUCCESS;
    }
    
    return RUNNING;
}*/

import State from './../constants/state';
import BaseNode from './../basenode';

export default class Wait extends BaseNode {
  constructor(ms) {
    super();

    this.name = 'Wait';
    this.endTime = ms || 0;
  }
  open(tick) {
    var startTime = (new Date()).getTime();
    tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
  }
  tick(tick) {
    var currTime = (new Date()).getTime();
    var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

    if (currTime - startTime >= this.endTime) {
      return State.SUCCESS;
    }

    return State.RUNNING;
  }
}