/**
 * 目前JavaScript在正则表达式中支持先行断言（lookahead）。
 * 这意味着匹配会发生，但不会有任何捕获，并且断言没有包含在整个匹配字段中。
 *
 * 例如从价格中捕获货币符号：
 */
const reLookahead = /\D(?=\d+)/,
  match = reLookahead.exec("$123.89");
console.log(match[0]); // $

/**
 * ES2018引入以相同方式工作但是匹配前面的反向断言（lookbehind），
 * 这样我就可以忽略货币符号，单纯的捕获价格的数字：
 */
const reLookbehind = /(?<=\D)\d+/,
  match = reLookbehind.exec("$123.89");
console.log(match[0]); // 123.89

/**
 * 以上是 肯定反向断言，非数字\D必须存在。
 * 同样的，还存在 否定反向断言，表示一个值必须不存在，例如：
 */
const reLookbehindNeg = /(?<!\D)\d+/,
  match = reLookbehind.exec("$123.89");
console.log(match[0]); // null
