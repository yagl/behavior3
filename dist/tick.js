"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tick = (function () {
  function Tick(tree, target, blackboard) {
    _classCallCheck(this, Tick);

    this.tree = tree;
    this.openNodes = [];
    this.nodeCount = 0;
    this.target = target;
    this.blackboard = blackboard;
  }

  _createClass(Tick, [{
    key: "enterNode",
    value: function enterNode(node) {
      this.nodeCount += 1;
      this.openNodes.push(node);
    }
  }, {
    key: "closeNode",
    value: function closeNode(node) {
      this.openNodes.pop();
    }

    // may be extended for debug
  }, {
    key: "openNode",
    value: function openNode(node) {}
  }, {
    key: "tickNode",
    value: function tickNode(node) {}
  }, {
    key: "exitNode",
    value: function exitNode(node) {}
  }]);

  return Tick;
})();

exports["default"] = Tick;
module.exports = exports["default"];