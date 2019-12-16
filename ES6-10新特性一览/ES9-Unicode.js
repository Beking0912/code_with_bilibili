/**
 * 到目前为止，在正则表达式中本地访问 Unicode 字符属性是不被允许的。
 * ES2018添加了 Unicode 属性转义——形式为\p{...}和\P{...}，
 * 在正则表达式中使用标记 u (unicode) 设置，
 * 在\p块儿内，可以以键值对的方式设置需要匹配的属性而非具体内容。
 *
 * 此特性可以避免使用特定 Unicode 区间来进行内容类型判断，提升可读性和可维护性。
 *
 * 例如：
 */
const reGreekSymbol = /\p{Script=Greek}/u;
reGreekSymbol.test("π"); // true
