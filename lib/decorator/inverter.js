
import State from './../constants/state';
import BaseNode from './../basenode';

export default class Priority extends BaseNode {
  constructor(child) {
    super();

    this.name = 'Inverter';
    this.child = child;

    if (!child) {
      console.warn('[behavior3] a decorator was initialized without child (', 
        this.id, ')');
    }
  }
  tick(tick) {
    if (!this.child) {
      return State.FAILURE;
    }

    var status = this.child.execute(tick);

    if (status === State.SUCCESS) {
      return State.FAILURE;
    } else if (status === State.FAILURE) {
      return State.SUCCESS;
    }

    return status;
  }
}