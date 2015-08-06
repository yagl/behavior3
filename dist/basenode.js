'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _constantsState = require('./constants/state');

var _constantsState2 = _interopRequireDefault(_constantsState);

var BaseNode = (function () {
  function BaseNode() {
    _classCallCheck(this, BaseNode);

    this.id = (0, _utils.createUUID)();
  }

  _createClass(BaseNode, [{
    key: 'execute',
    value: function execute(tick) {
      this._enter(tick);

      // trigger open if not opened
      if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
        this._open(tick);
      }

      // tick node and get status
      var status = this._tick(tick);

      // if state is different than RUNNING trigger close
      if (status !== _constantsState2['default'].RUNNING) {
        this._close(tick);
      }

      this._exit(tick);

      return status;
    }
  }, {
    key: '_enter',
    value: function _enter(tick) {
      tick.enterNode(this);
      this.enter(tick);
    }
  }, {
    key: '_open',
    value: function _open(tick) {
      tick.openNode(this);
      tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
      this.open(tick);
    }
  }, {
    key: '_tick',
    value: function _tick(tick) {
      tick.tickNode(this);
      return this.tick(tick);
    }
  }, {
    key: '_close',
    value: function _close(tick) {
      tick.closeNode(this);
      tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
      this.close(tick);
    }
  }, {
    key: '_exit',
    value: function _exit(tick) {
      tick.exitNode(this);
      this.exit(tick);
    }

    // to be extended
  }, {
    key: 'enter',
    value: function enter(tick) {}
  }, {
    key: 'open',
    value: function open(tick) {}
  }, {
    key: 'tick',
    value: function tick(_tick2) {}
  }, {
    key: 'close',
    value: function close(tick) {}
  }, {
    key: 'exit',
    value: function exit(tick) {}
  }]);

  return BaseNode;
})();

exports['default'] = BaseNode;
module.exports = exports['default'];