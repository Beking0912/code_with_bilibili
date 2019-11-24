/**
 * new 被调用后做了三件事：
 *  1. 生成一个新的对象
 *  2. 把函数中的 this 值指向新生成的这个对象 ->  绑定 this 实现继承 -> 可以访问到构造函数中的属性
 *  3. 把这个对象绑定它的原型对象 -> 可以访问到构造函数原型(constructor.prototype)所在原型链上的属性
 *  4. 返回这个新对象
 */

function newOperator(ctor, ...args) {
  if (typeof ctor !== "function")
    throw "newOperator function the first param must be a function";

  let obj = Object.create(ctor.prototype);  // 用 ctor 的 prototype 作为原型创建一个对象
  let res = ctor.apply(obj, args);  // 绑定 this 实现继承

  let isObject = typeof res === "object" && res !== null;
  let isFunction = typeof res === "function";

  return isObject || isFunction ? res : obj;
}
