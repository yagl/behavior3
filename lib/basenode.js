
import {createUUID} from './utils';
import State from './constants/state';

export default class BaseNode {
  constructor() {
    this.id = createUUID();
  }
  execute(tick) {
    this._enter(tick);

    // trigger open if not opened
    if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
      this._open(tick);
    }

    // tick node and get status
    var status = this._tick(tick);

    // if state is different than RUNNING trigger close
    if (status !== State.RUNNING) {
      this._close(tick);
    }

    this._exit(tick);

    return status;
  }
  _enter(tick) {
    tick.enterNode(this);
    this.enter(tick);
  }
  _open(tick) {
    tick.openNode(this);
    tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
    this.open(tick);
  }
  _tick(tick) {
    tick.tickNode(this);
    return this.tick(tick);
  }
  _close(tick) {
    tick.closeNode(this);
    tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
    this.close(tick);
  }
  _exit(tick) {
    tick.exitNode(this);
    this.exit(tick);
  }
  // to be extended
  enter(tick) {}
  open(tick) {}
  tick(tick) {}
  close(tick) {}
  exit(tick) {}
}
