/**
 * 柯里化是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，
 * 并且返回接受余下的参数且返回结果的新函数的技术。
 *
 * 简单理解题目意思，就是指，
 * 我们将预定义的函数的参数逐一传入到curryIt中，
 * 当参数全部传入之后，就执行预定义函数。
 * 于是，我们首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数。
 * 返回一个匿名函数接收参数并执行，当参数个数小于fn.length，
 * 则再次返回该匿名函数，继续接收参数并执行，直至参数个数等于fn.length。
 * 最后，调用apply执行预定义函数。
 */

function curryIt(fn) {
  var length = fn.length,
    args = [];
  var result = function(arg) {
    args.push(arg);
    length--;
    if (length <= 0) {
      return fn.apply(this, args);
    } else {
      return result;
    }
  };

  return result;
}

function curryIt(fn) {
  //获取fn参数的数量
  var n = fn.length;
  //声明一个数组args
  var args = [];
  //返回一个匿名函数
  return function(arg) {
    //将curryIt后面括号中的参数放入数组
    args.push(arg);
    //如果args中的参数个数小于fn函数的参数个数，
    //则执行arguments.callee（其作用是引用当前正在执行的函数，这里是返回的当前匿名函数）。
    //否则，返回fn的调用结果
    if (args.length < n) {
      return arguments.callee;
    } else return fn.apply("", args);
  };
}

function curryIt(fn) {
  return a => b => c => fn(a, b, c);
}
