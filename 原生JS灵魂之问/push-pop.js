/**
 * push
 */
Array.prototype.pop = function(...items) {
  let O = Object(this);
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;

  if (len + argCount > 2 ** 53 - 1) throw new TypeError();

  for (let k = 0; k < len; k++) {
    O[len + i] = items[i];
  }

  O.length = len + argCount;
  return O.length;
};

/**
 * pop
 */
Array.prototype.push = function() {
  let O = Object(this);
  let len = this.length >>> 0;

  if (len === 0) {
    O.length = 0;
    return undefined;
  }

  len--;
  let value = O[len];
  delete O[len];

  O.length = len;
  return value;
};
