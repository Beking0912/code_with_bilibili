/**
 * 正则表达式命名捕获组
 */

// JavaScript正则表达式可以返回一个匹配的对象——一个包含匹配字符串的类数组，
// 例如：以YYYY-MM-DD的格式解析日期：
const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
  match = reDate.exec("2018-04-30"),
  year = match[1], // 2018
  month = match[2], // 04
  day = match[3]; // 30

// 这样的代码很难读懂，并且改变正则表达式的结构有可能改变匹配对象的索引。
// ES2018允许命名捕获组使用符号?<name>，在打开捕获括号(后立即命名，示例如下：
const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match = reDate.exec("2018-04-30"),
  year = match.groups.year, // 2018
  month = match.groups.month, // 04
  day = match.groups.day; // 30

// 任何匹配失败的命名组都将返回undefined。
// 命名捕获也可以使用在replace()方法中。例如将日期转换为美国的 MM-DD-YYYY 格式：
const reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  d = "2018-04-30",
  usDate = d.replace(reDate, "$<month>-$<day>-$<year>");
