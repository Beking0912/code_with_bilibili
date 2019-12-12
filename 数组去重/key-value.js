/**
 * 利用对象的key不可重复这一特性
 *
 * 需要注意的问题：
 *  1. 无法区分隐式类型转换成字符串后一样的值，比如 1 和 '1'
 *  2. 无法处理复杂数据类型，比如对象（因为对象作为 key 会变成 [object Object]）
 *  3. 特殊数据，比如 'proto'，因为对象的 proto 属性无法被重写
 */

// 解决问题1和3
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

// 解决问题2
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

// 单纯，以上三个问题都出现
Array.prototype.unique3 = function(arr) {
  const tmp = {};
  return arr.filter(function(item, index, array) {
    return tmp.hasOwnProperty(item) ? false : (obj[item] = true);
  });
};

// 解决问题1
Array.prototype.unique4 = function() {
  const tmp = {};
  return arr.filter(function(item, index, array) {
    return tmp.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
  });
};