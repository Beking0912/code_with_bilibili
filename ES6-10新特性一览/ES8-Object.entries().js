/**
 * Object.entries()函数返回一个给定对象自身可枚举属性的键值对的数组。
 */
const obj = { a: 1, b: 2, c: 3 };

// 不使用Object.entries() :ES7
Object.keys(obj).forEach(key => {
  console.log("key:" + key + " value:" + obj[key]);
});

// 使用Object.entries() :ES8
for (let [key, value] of Object.entries(obj)) {
  console.log(`key: ${key} value:${value}`);
}