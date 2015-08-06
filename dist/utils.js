"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUUID = createUUID;

var currentUUID = 0;

function createUUID() {
  return currentUUID++;
}