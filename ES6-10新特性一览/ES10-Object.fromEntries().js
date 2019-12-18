/**
 * Object.entries()方法的作用是返回一个给定对象自身可枚举属性的键值对数组，
 * 其排列与使用 for...in 循环遍历该对象时返回的顺序一致
 * （区别在于 for-in 循环也枚举原型链中的属性）
 *
 * 而Object.fromEntries() 则是 Object.entries() 的反转。
 *
 * Object.fromEntries() 函数传入一个键值对的列表，并返回一个带有这些键值对的新对象。
 * 这个迭代参数应该是一个能够实现@iterator方法的的对象，返回一个迭代器对象。
 * 它生成一个具有两个元素的类似数组的对象，
 * 第一个元素是将用作属性键的值，第二个元素是与该属性键关联的值。
 */

// 1. 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([
  ["foo", "bar"],
  ["baz", 42]
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

// 2. 通过 Object.fromEntries， 可以将 Array 转化为 Object:
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"]
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
