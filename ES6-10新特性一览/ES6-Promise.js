/**
 * Promise 是异步编程的一种解决方案 异步编程串行化，避免回调地狱
 */
var waitSecond = new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000);
});

waitSecond
  .then(function() {
    console.log("Hello"); // 1秒后输出"Hello"
    return waitSecond;
  })
  .then(function() {
    console.log("Hi"); // 2秒后输出"Hi"
  });
