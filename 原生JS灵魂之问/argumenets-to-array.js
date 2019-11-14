/**
 * 类数组 => 真正的数组
 */

function sum(a, b) {
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }

  // 方法一：Array.prototype.slice.call()
  let args = Array.prototype.slice.call(arguments);

  // 方法二：Array.from()
  let args = Array.from(arguments);

  // 方法三：ES6 扩展运算符
  let args = [...arguments];

  // 方法四：利用 concat + apply
  let args = Array.prototype.concat.apply([], arguments);

  // 方法五：创建新数组 for遍历

  console.log(args.reduce((sum, curr) => sum + curr));
}
sum(1, 2);
