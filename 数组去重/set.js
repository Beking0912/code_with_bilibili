// Array.from方法将Set结构转换为数组
Array.prototype.unique = function() {
  const set = new Set(this);
  return Array.from(set);
};

// 利用set数据不重复的特点，解构赋值
Array.prototype.unique = function() {
  return [...new Set(this)];
};
