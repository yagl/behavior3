
/**
 * Blackboard - the memory structure for bt/nodes. Allow to store:
 * - global information
 * - per-tree information
 * - per-tree and per-node information
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blackboard = (function () {
  function Blackboard() {
    _classCallCheck(this, Blackboard);

    this.baseMemory = {};
    this.treeMemory = {};
  }

  /**
   * returns memory Map for given tree
   */

  _createClass(Blackboard, [{
    key: "getTreeMemory",
    value: function getTreeMemory(treeScope) {
      if (!this.treeMemory[treeScope]) {
        this.treeMemory[treeScope] = {
          nodeMemory: {},
          openNodes: []
        };
      }

      return this.treeMemory[treeScope];
    }
  }, {
    key: "getNodeMemory",
    value: function getNodeMemory(treeMemory, nodeScope) {
      var memory = treeMemory.nodeMemory;

      if (!memory[nodeScope]) {
        memory[nodeScope] = {};
      }

      return memory[nodeScope];
    }
  }, {
    key: "getMemory",
    value: function getMemory(treeScope, nodeScope) {
      var memory = this.baseMemory;

      if (treeScope !== undefined) {
        memory = this.getTreeMemory(treeScope);

        if (nodeScope !== undefined) {
          memory = this.getNodeMemory(memory, nodeScope);
        }
      }

      return memory;
    }
  }, {
    key: "set",
    value: function set(key, value, treeScope, nodeScope) {
      var memory = this.getMemory(treeScope, nodeScope);

      memory[key] = value;
    }
  }, {
    key: "get",
    value: function get(key, treeScope, nodeScope) {
      var memory = this.getMemory(treeScope, nodeScope);

      return memory[key];
    }
  }]);

  return Blackboard;
})();

exports["default"] = Blackboard;
module.exports = exports["default"];