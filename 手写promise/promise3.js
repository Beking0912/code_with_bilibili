class Promise {
  constructor(executor) {
    this.state = "pending"; // 状态
    this.value = undefined; // 成功值
    this.reason = undefined; // 失败原因

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.state === "pending") {
        this.state = "fulfiled";
        this.value = value;
        // 发布消息
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    const reject = reason => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 发布消息
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === "fulfiled") {
        // 通过 setTimeout 放到下一个事件循环 => 为了得到 promise2
        setTimeout(() => {
          const x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          const x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      }

      if (this.state === "pending") {
        // 订阅
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          }, 0);
        });
      }
    });
    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static all(promiseAry = []) {
    let index = 0,
      result = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promiseAry.length; i++) {
        promiseAry[i].then(val => {
          index++;
          result[i] = val;
          if (index === promiseAry.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }
  static race(promiseAry) {
    return new Promise((resolve, reject) => {
      if (promiseAry.length === 0) {
        return;
      }
      for (let i = 0; i < promiseAry.length; i++) {
        promiseAry[i].then(val => {
          resolve(val);
          return;
        }, reject);
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("循环引用"));
  }
  if ((typeof x === "function" || typeof x === "object") && x !== null) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            // 递归解析
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      reject(error);
    }
  } else {
    // 肯定是一个常量值
    resolve(x);
  }
}

// 订阅发布设计模式
module.exports = Promise;
