/**
 * Symbol.prototype.description
 */

// 通过工厂函数Symbol（）创建符号时，您可以选择通过参数提供字符串作为描述：
const sym = Symbol("The description");

// 以前，访问描述的唯一方法是将符号转换为字符串：
assert.equal(String(sym), "Symbol(The description)");

// 现在引入了getter Symbol.prototype.description以直接访问描述：
assert.equal(sym.description, "The description");
