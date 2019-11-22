/**
 * 数组降纬 扁平化
 */

// 多维数组 => 一维数组
let ary = [1, [2, [3, [4, 5]]], 6]; // -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(ary);

// 方法一： 调用ES6中的flat方法
ary = ary.flat(Infinity);

// 方法二：replace + split
ary = str.replace(/(\[|\])/g, "").split(",");

// 方法三：replace + JSON.parse
str = str.replace(/(\[|\])/g, "");
str = "[" + str + "]";
ary = JSON.parse(str);

// 方法四：普通递归
let result = [];
let fn = function(ary) {
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (Array.isArray(ary[i])) {
      fn(item);
    } else {
      result.push(item);
    }
  }
};

// 方法五：利用reduce函数迭代
function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
let ary = [1, 2, [3, 4], [5, [6, 7]]];
console.log(flatten(ary));

// 方法六：扩展运算符  只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  ary = [].concat(...ary);
}

console.log(ary);
