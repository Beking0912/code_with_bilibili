/**
 * String.prototype.matchAll
 * matchAll() 方法返回一个包含所有匹配正则表达式及分组捕获结果的迭代器。
 * 在 matchAll 出现之前，通过在循环中调用regexp.exec来获取所有匹配项信息（regexp需使用/g标志：
 */
const regexp = RegExp("foo*", "g");
const str = "table football, foosball";

while ((matches = regexp.exec(str)) !== null) {
  console.log(`Found ${matches[0]}. Next starts at ${regexp.lastIndex}.`);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}

/**
 * 如果使用matchAll ，就可以不必使用while循环加exec方式（且正则表达式需使用／g标志）。
 * 使用matchAll 会得到一个迭代器的返回值，
 * 配合 for...of, array spread, or Array.from() 可以更方便实现功能：
 */
const regexp = RegExp("foo*", "g");
const str = "table football, foosball";
let matches = str.matchAll(regexp);

for (const match of matches) {
  console.log(match);
}
// Array [ "foo" ]
// Array [ "foo" ]

// matches iterator is exhausted after the for..of iteration
// Call matchAll again to create a new iterator
matches = str.matchAll(regexp);

Array.from(matches, m => m[0]);
// Array [ "foo", "foo" ]

/**
 * matchAll可以更好的用于分组
 */
var regexp = /t(e)(st(\d?))/g;
var str = "test1test2";

str.match(regexp);
// Array ['test1', 'test2']

let array = [...str.matchAll(regexp)];

array[0];
// ['test1', 'e', 'st1', '1', index: 0, input: 'test1test2', length: 4]
array[1];
// ['test2', 'e', 'st2', '2', index: 5, input: 'test1test2', length: 4]
