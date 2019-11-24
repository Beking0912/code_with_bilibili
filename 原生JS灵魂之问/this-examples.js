/**
 * 几种隐式绑定的场景讨论
 */

/**
 * 1. 全局上下文
 *
 * 默认 this 指向 window，严格模式下指向 undefined
 */

/**
 * 2. 直接调用函数
 *
 * this 指向 window，严格模式下指向 undefined
 */
let obj = {
  a: function() {
    console.log(this); // this -> global
  }
};
let func = obj.a;
func();

/**
 * 3. 对象.方法的形式调用
 *
 * this 指向这个对象
 */
obj.a(); // this -> a: [Function: a]

/**
 * 4. DOM 事件绑定
 *
 * onclick 和 addEventerListener 中的 this 默认指向绑定事件的元素
 * IE中使用 attachEvent，里面的 this 默认指向 window
 */

/**
 * 5. new + 构造函数
 *
 * this 指向实例对象
 */

/**
 * 6. 箭头函数
 *
 * 箭头函数的 this 指向父作用域的 this，严格模式下 undefined
 */

// 优先级：new > call、apply、bind > 对象.方法 > 直接调用。
