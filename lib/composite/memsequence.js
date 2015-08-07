
import State from './../constants/state';
import BaseNode from './../basenode';

export default class MemSequence extends BaseNode {
  constructor(childs) {
    super();

    this.name = 'MemSequence';
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }
  open(tick) {
    tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
  }
  tick(tick) {
    var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);

    for (var i = child; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.SUCCESS) {
        if (status === State.RUNNING) {
          tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
        }

        return status;
      }
    }

    return State.SUCCESS;
  }
}
