/**
 * @module  behavior3
 */

import State from './constants/state';

import Blackboard from './blackboard';
import BaseNode from './basenode';
import BehaviorTree from './tree';
import Tick from './tick';

import Sequence from './composite/sequence';
import MemSequence from './composite/memsequence';
import Priority from './composite/priority';
import MemPriority from './composite/mempriority';

import Inverter from './decorator/inverter';

import Wait from './action/wait';

/**
 * This is what is returned by a `require('yagl-behavior3')`
 * 
 * @class Behavior3
 */
export default {
  /**
   * @property {Object} State
   */
  State,
  /**
   * @property {class} Blackboard
   */
  Blackboard,
  /**
   * @property {class} BaseNode
   */
  BaseNode,
  /**
   * @property {class} BehaviorTree
   */
  BehaviorTree,
  /**
   * @property {class} Tick
   */
  Tick,
  composite: {
    Sequence,
    MemSequence,
    Priority,
    MemPriority
  },
  decorator: {
    Inverter
  },
  action: {
    Wait
  }
}