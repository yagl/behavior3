/**
 * @module utils
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUUID = createUUID;
var currentUUID = 0;

/**
 * Generate unique Number sequentially.
 * 
 * @class Utils
 * @method  createUUID
 * @return {Number} A unique Number.
 */

function createUUID() {
  return currentUUID++;
}