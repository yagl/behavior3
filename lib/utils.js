/**
 * @module utils
 */
var currentUUID = 0;

/**
 * Generate unique Number sequentially.
 * 
 * @class Utils
 * @method  createUUID
 * @return {Number} A unique Number.
 */
export function createUUID() {
  return currentUUID++;
}