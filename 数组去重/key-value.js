/**
 * 利用对象的key不可重复这一特性
 *
 * 需要注意的问题：
 *  1. 无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1'
 *  2. 无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
 *  3. 特殊数据，比如 'proto'，因为对象的 proto 属性无法被重写
 */

// 解决1和3
Array.prototype.unique = function() {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    if (!tmp[typeof this[i] + this[i]]) {
      tmp[typeof this[i] + this[i]] = 1;
      newArray.push(this[i]);
    }
  }
  return newArray;
};

// 解决2
Array.prototype.unique2 = function() {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    if (!tmp[typeof this[i] + JSON.stringify(this[i])]) {
      // 使用JSON.stringify()进行序列化
      tmp[typeof this[i] + JSON.stringify(this[i])] = 1; // 将对象序列化之后作为key来使用
      newArray.push(this[i]);
    }
  }
  return newArray;
};