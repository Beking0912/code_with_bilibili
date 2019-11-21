/**
 * A：函数的arguments为什么不是数组？如何转化成数组？
 * 
 * Q：因为arguments本身并不能调用数组方法，它是一个另外一种对象类型，
 * 只不过属性从0开始排，依次为0，1，2...最后还有callee和length属性。
 * 我们也把这样的对象称为类数组。
 * 
 * 常见的类数组还有：
 *  - 用getElementsByTagName/ClassName()获得的HTMLCollection
 *  - 用querySelector获得的nodeList
 */

function sum(a, b) { // 类数组 => 真正的数组
  console.log(arguments); // [Arguments] { '0': 1, '1': 2 }

  // 方法一：Array.prototype.slice.call()
  let args = Array.prototype.slice.call(arguments);

  // 方法二：Array.from() 这种方法也可以用来转换Set和Map
  let args = Array.from(arguments);

  // 方法三：ES6 扩展运算符
  let args = [...arguments];

  // 方法四：利用 concat + apply
  let args = Array.prototype.concat.apply([], arguments);

  // 方法五：创建新数组 for遍历

  console.log(args.reduce((sum, curr) => sum + curr));
}
sum(1, 2);
