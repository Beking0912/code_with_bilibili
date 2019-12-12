// 老数组先排序，将老数组当前值与其相邻的值对比
Array.prototype.unique = function() {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== this[i + 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

// 老数组先排序，将老数组当前值与新数组最后一个值对比
Array.prototype.unique = function() {
  const newArray = [];
  this.sort();
  for (let i = 0; i < this.length; i++) {
    if (this[i] !== newArray[newArray.length - 1]) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};
