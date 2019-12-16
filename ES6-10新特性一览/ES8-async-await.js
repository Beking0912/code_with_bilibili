/**
 * async/await
 */

// 不使用async/await ES7
function doLogin(userName) {
  this.login(userName)
    .then(this.getData)
    .then(result => {
      console.log(result);
    });
}

// 使用async/await ES8
async function doLogin2(userName) {
  const userId = await this.login(userName);
  const result = await this.getData(userId);
}

/**
 * async/await几种应用场景：
 *  1. 获取异步函数的返回值
 *  2. async/await在并发场景中的应用
 */
async function charCountAdd(data1, data2) {
  const d1 = await charCount(data1);
  const d2 = await charCount(data2);
  return d1 + d2;
}
charCountAdd("Hello", "Hi").then(console.log); //通过then获取异步函数的返回值。
function charCount(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.length);
    }, 1000);
  });
}
/**
 * 对于上述的例子，我们调用await两次，每次都是等待1秒一共是2秒，效率比较低，
 * 而且两次await的调用并没有依赖关系，那能不能让其并发执行呢，
 * 答案是可以的，接下来我们通过Promise.all来实现await的并发调用。
 */
async function charCountAdd(data1, data2) {
  const [d1, d2] = await Promise.all([charCount(data1), charCount(data2)]);
  return d1 + d2;
}
charCountAdd("Hello", "Hi").then(console.log);
function charCount(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.length);
    }, 1000);
  });
}

/**
 * async/await的几种错误处理方式：
 */
// 第一种：捕捉整个async/await函数的错误
async function charCountAdd(data1, data2) {
  const d1 = await charCount(data1);
  const d2 = await charCount(data2);
  return d1 + d2;
}
charCountAdd("Hello", "Hi")
  .then(console.log)
  .catch(console.log); // 捕捉整个async/await函数的错误

// 第二种：捕捉单个的await表达式的错误
async function charCountAdd(data1, data2) {
  const d1 = await charCount(data1).catch(e => console.log("d1 is null"));
  const d2 = await charCount(data2).catch(e => console.log("d2 is null"));
  return d1 + d2;
}
charCountAdd("Hello", "Hi").then(console.log);

// 第三种：同时捕捉多个的await表达式的错误
async function charCountAdd(data1, data2) {
  let d1, d2;
  try {
    d1 = await charCount(data1);
    d2 = await charCount(data2);
  } catch (e) {
    console.log("d1 is null");
  }
  return d1 + d2;
}
charCountAdd("Hello", "Hi").then(console.log);

function charCount(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.length);
    }, 1000);
  });
}
