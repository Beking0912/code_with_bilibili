/**
 * includes() 函数用来判断一个数组是否包含一个指定的值，
 * 如果包含则返回 true，否则返回false。
 */

// includes 函数与 indexOf 函数很相似，下面两个表达式是等价的：
arr.includes(x);
arr.indexOf(x) >= 0;

let arr = ["react", "angular", "vue"];
if (arr.indexOf("react") !== -1) console.log("react存在");
if (arr.includes("react")) console.log("react存在");
