
import State from './../constants/state';
import BaseNode from './../basenode';

export default class Priority extends BaseNode {
  constructor(childs) {
    super();

    this.name = 'Priority';
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }
  tick(tick) {
    for (var i = 0; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.FAILURE) {
        return status;
      }
    }

    return State.FAILURE;
  }
}