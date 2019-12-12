// 遍历老数组，在新数组中找是否已存在
Array.prototype.unique = function() {
  const newArray = [];
  this.forEach(item => {
    if (!newArray.includes(item)) {
      newArray.push(item);
    }
  });
  return newArray;
};
