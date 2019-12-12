/**
 * map和object类似，区别在于
 *  1. object的键只能是字符串或symbols，map可以是任意值；
 *  2. map有序，object无序；
 *  3. 可以通过size获取map键值对个数，object只能手动计算；
 *  4. map可迭代，object需要先获取键数组再迭代；
 *  5. object有自己的原型，原型链上的键名可能会与自己在对象上设置的键名重复；
 *     es5允许用Object.create(null)创建一个没有原型的对象；
 *  6. map在涉及频繁增删改键值对时有性能优势；
 */
Array.prototype.unique = function() {
  const newArray = [];
  const tmp = new Map();
  for (let i = 0; i < this.length; i++) {
    if (!tmp.get(this[i])) {
      tmp.set(this[i], 1);
      newArray.push(this[i]);
    }
  }
  return newArray;
};

Array.prototype.unique = function() {
  const tmp = new Map();
  return this.filter(item => {
    return !tmp.has(item) && tmp.set(item, 1);
  });
};
