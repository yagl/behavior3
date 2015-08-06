'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _tick = require('./tick');

var _tick2 = _interopRequireDefault(_tick);

var BehavoirTree = (function () {
  function BehavoirTree() {
    _classCallCheck(this, BehavoirTree);

    this.id = (0, _utils.createUUID)();
    this.root = null;
  }

  _createClass(BehavoirTree, [{
    key: 'tick',
    value: function tick(target, blackboard) {
      var tick = new _tick2['default'](this, target, blackboard);

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
  }]);

  return BehavoirTree;
})();

exports['default'] = BehavoirTree;
module.exports = exports['default'];