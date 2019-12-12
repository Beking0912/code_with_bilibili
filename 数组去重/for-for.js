const arr = [];
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()));
}

// 拿老数组中的值与新数组对比
Array.prototype.unique2 = function() {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = 0; j < newArray.length; j++) {
      if (this[i] === newArray[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

// 拿老数组后面的值与新数组对比
Array.prototype.unique3 = function() {
  const newArray = [];
  let isRepeat;
  for (let i = 0; i < this.length; i++) {
    isRepeat = false;
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

// 老数组和老数组后面的值对比
Array.prototype.unique4 = function() {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        j = ++i;
      }
    }
    newArray.push(this[i]);
  }
  return newArray;
};

// 从老数组中去除重复的值
Array.prototype.unique = function() {
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] === this[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
};

console.time("test");
arr.unique();
console.timeEnd("test");
