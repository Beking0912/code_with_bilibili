/**
 * 异步迭代
 */

// 在同步循环中调用异步函数
async function process(array) {
  for (let i of array) {
    await doSomething(i);
  }
}

// 这段代码不会正常运行，下面这段同样也不会：
async function process(array) {
  array.forEach(async i => {
    await doSomething(i);
  });
}

// 这段代码中，循环本身依旧保持同步，并在内部异步函数之前全部调用完成。

/**
 * ES2018引入异步迭代器（asynchronous iterators），
 * 这就像常规迭代器，除了next()方法返回一个Promise。
 * 因此await可以和for...of循环一起使用，以串行的方式运行异步操作。例如：
 */
async function process(array) {
  for await (let i of array) {
    doSomething(i);
  }
}
