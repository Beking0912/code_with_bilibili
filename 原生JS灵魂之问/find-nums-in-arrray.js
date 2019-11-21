/**
 *  判断数组中是否包含某个值
 */

var arr = [1, 2, 3, 4];

// 方法一：array.indexOf
//  (存在返回索引，否则返回-1)
var index = arr.indexOf(3);
console.log(index);

// 方法二：array.includes(searcElement[,fromIndex])
//  (存在返回true，否则返回false)
if (arr.includes(3)) console.log("存在");
else console.log("不存在");

// 方法三：array.find(callback[,thisArg])
//  (返回数组中满足条件的第一个元素的值，否则返回undefined)
var result = arr.find(item => {
  return item > 3;
});
console.log(result);

// 方法四：array.findeIndex(callback[,thisArg])
//  (返回数组中满足条件的第一个元素的下标，否则返回-1])
var result = arr.findIndex(item => {
  return item > 3;
});
console.log(result);

// 方法五：for循环
