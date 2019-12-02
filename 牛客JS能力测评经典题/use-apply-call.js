// 两者都是 Function.prototype 的方法

/**
 * call 的使用: fun.call(thisArg[, arg1[, arg2[, ...]]])
 * apply的使用: fun.apply(thisArg[, argsArray])
 *
 * 其中，thisArg指的是函数fun运行时的this值，即指定函数运行时的执行上下文。
 * 值得注意的是，当非严格模式下，指定null或者undefined时，会自动指向全局对象（浏览器中则是window对象），
 * 同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
 *
 * 两者的主要区别在于之后的参数，其中call接收的是一组参数列表，
 * apply接收的是一个数组或者类数组对象，如果为null或者undefined则表示不需要接受参数。
 */

//call的使用案例
var animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Fail" }
];
for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log("#" + i + " " + this.species + ": " + this.name);
    };
    this.print();
  }.call(animals[i], i));
}
//apply的使用案例
/* min/max number in an array */
var numbers = [5, 6, 2, 3, 7];
/* using Math.min/Math.max apply */
var max = Math.max.apply(
  null,
  numbers
); /* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);
/**
 * 注意，apply中的第二个参数如果是arguments对象作为输入，或者其他局部变量，
 * 那么它可以表示被调用对象的未指定的参数，被调用对象接下来就会处理所有的这些参数。
 */

/**
 * 问题: 实现一个函数，运算结果可以满足如下预期结果：
 *
 * add(1)(2) // 3
 * add(1, 2, 3)(10) // 16
 * add(1)(2)(3)(4)(5) // 15
 */
function add() {
  //将argument转换成数组
  var args = Array.prototype.slice.call(arguments);
  var fn = function() {
    //拼接多次调用的参数为数组
    var arg_fn = Array.prototype.slice.call(arguments);
    //递归调用add
    return add.apply(null, args.concat(arg_fn));
  };
  //最后一次返回fn时，自动调用valueOf
  fn.valueOf = function() {
    return args.reduce(function(a, b) {
      return a + b;
    });
  };
  return fn;
}
/**
 * 思路流程
 * 利用闭包传递参数，将参数每次调用中拼接成长数组。
 * 改写valueOf函数，最后一次返回的fn，会自动调用valueOf函数，从而输出计算和。
 *
 *
 * 直接返回函数名，那么函数会自动调用valueOf进行返回，
 * 如果没有valueOf，则会调用toString。某种程度上，弱类型语言的隐式类型转换的锅？
 */
