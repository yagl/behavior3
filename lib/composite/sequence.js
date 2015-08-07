
import State from './../constants/state';
import BaseNode from './../basenode';

export default class Sequence extends BaseNode {
  constructor(childs) {
    super();

    this.name = 'Sequence';
    this.childs = [];
    childs.map(c => this.childs.push(c));
  }
  tick(tick) {
    for (var i = 0; i < this.childs.length; i += 1) {
      var status = this.childs[i].execute(tick);

      if (status !== State.SUCCESS) {
        return status;
      }
    }

    return State.SUCCESS;
  }
}