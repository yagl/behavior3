
var currentUUID = 0;

export function createUUID() {
  return currentUUID++;
}