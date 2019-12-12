const arr = [];
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}

// 如果索引不是第一个索引，说明是重复值
Array.prototype.unique = function() {
  return this.filter((item, index) => {
    return this.indexOf(item) === index;
  });
};

// 向新数组中加入没有的数
Array.prototype.unique2 = function() {
  const newArray = [];
  this.forEach(item => {
    if (newArray.indexOf(item) === -1) {
      newArray.push(item);
    }
  });
  return newArray;
};

console.time("test");
arr.unique();
console.timeEnd("test");
