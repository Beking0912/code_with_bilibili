Function.prototype.call = function(context) {
  let context = context || window;
  let fn = Symbol("fn");
  context.fn = this;

  let args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  let result = eval("context.fn(" + args + ")");

  delete context.fn;
  return result;
};

// 换成 ES6 语法：
Function.prototype.call = function(context = window, ...args) {
  context = context || window; // 设置默认值，不传就是给 window
  let fn = new Symbol("fn"); // 给context新增一个独一无二的属性以免覆盖原有属性
  context.fn = this;
  // 通过隐式绑定的方法调用函数
  let result = eval("context.fn(...args)"); // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码

  delete context.fn; // 删除添加的属性
  return result; // 返回函数调用的返回值
};
