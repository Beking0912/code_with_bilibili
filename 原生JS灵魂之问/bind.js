/**
 * bind 接收多个参数，第一个是bind返回值返回值是一个函数上下文的this，不会立即执行。
 * 
 * bind 做了什么？
 *
 * 对于普通函数：绑定 this 指向
 * 对于构造函数：要保证原函数对象上的属性不能丢失
 * 
 * 有什么特点？
 * 
 * 1、函数调用，改变this 
 * 2、返回一个绑定this的函数 
 * 3、接收多个参数 
 * 4、支持柯里化形式传参 fn(1)(2)
 */

Function.prototype.bind = function(context, ...args) {
  if (typeof this !== "function")
    throw new TypeError(this + " must be a function");

  let self = this; // 存储调用 bind 的函数本身
  let fNOP = function() {};

  let fbound = function() {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();

  return fbound;
};

// 也可以这么用 Object.create 来处理原型:
Function.prototype.bind = function(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " must be a function");
  }

  var self = this;

  var fbound = function() {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  fbound.prototype = Object.create(self.prototype);

  return fbound;
};
