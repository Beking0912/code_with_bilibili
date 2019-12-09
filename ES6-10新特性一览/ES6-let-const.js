/**
 * let,const 都是块级作用域，var 为函数级作用域
 */

// 使用 var：
{
  var a = 10;
}
console.log(a); // 输出10

// 使用 let,const：
{
  let a = 10;
}
console.log(a); // -1 or Error“ReferenceError: a is not defined”
