/**
 * Q：什么是高阶函数？
 * A：可以接收另一个函数作为参数 或返回值为一个函数
 */

// 数组中的高阶函数

/**
 * map
 *
 * 接受的参数：回调函数、回调函数的this值(可选)
 * 回调函数默认参数：当前元素、当前索引、整个数组
 *
 * 不改变原数组
 */

let nums = [1, 2, 3];
let obj = { val: 5 };
let newNums = nums.map(function(item, index, array) {
  return item + index + array[index] + this.val;
  //对第一个元素，1 + 0 + 1 + 5 = 7
  //对第二个元素，2 + 1 + 2 + 5 = 10
  //对第三个元素，3 + 2 + 3 + 5 = 13
}, obj);
console.log(newNums); //[7, 10, 13]

//
//

/**
 * reduce
 *
 * 接受的参数：回调函数、初始值
 * 回调函数默认参数：积累值、当前值、整个数组
 *
 * 不穿默认值会自动以第一个元素为初始值，然后从第二个元素开始依次累计
 *
 * 不改变原数组
 */

// 多个数的加和
let newNums = nums.reduce(function(preSum, curVal, array) {
  return preSum + curVal;
}, 0);
console.log(newNums); // 6

//
//

/**
 * filter
 *
 * 接受的参数：一个函数
 * 默认参数：当前元素 这个作为参数的函数返回值为布尔类型，决定元素是否保留
 *
 * 返回值为一个新数组
 */

// 保留奇数项
let oddNums = nums.filter(item => item % 2);
console.log(oddNums);

//
//

/**
 * sort
 *
 * 参数：一个用于比较的函数
 * 默认参数：代表比较的两个元素
 *
 * Q：当比较函数不传时如何排序？
 * A：将数字转换为字符串，根据字母unicode值进行升序哦哎嘘
 *    也就是根据字符串比较规则排序
 */

// 两个比较的元素分别为a, b  整个过程就完成了一次升序排列
nums.sort(function(a, b) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else if (a == b) return 0;
});
