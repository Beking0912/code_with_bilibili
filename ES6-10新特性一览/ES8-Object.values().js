/**
 * Object.values()是一个与Object.keys()类似的新函数，
 * 但返回的是Object自身属性的所有值，不包括继承的值.
 *
 * Object.values()为我们省去了遍历key，并根据这些key获取value的步骤。
 */
const obj = { a: 1, b: 2, c: 3 };
const val1 = Object.keys(obj).map(key => obj[key]); // 不使用Object.values() :ES7
const val2 = Object.values(obj1); // 使用Object.values() :ES8
