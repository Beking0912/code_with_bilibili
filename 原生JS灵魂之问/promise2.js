//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  let self = this; // 缓存当前promise实例
  self.value = null;
  self.error = null;
  self.status = PENDING;
  //   self.onFulfilled = null; //成功的回调函数
  //   self.onRejected = null; //失败的回调函数

  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  const resolve = value => {
    if (self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilledCallbacks.forEach(callback => callback(self.value));
    });
  };

  const reject = error => {
    if (self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.onRejectedCallbacks.forEach(callback => callback(self.error));
    });
  };
  executor(resolve, reject);
}
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  // 成功回调不传给它一个默认函数
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  // 对于失败回调直接抛错
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : error => {
          throw error;
        };

  let bridgePromise;
  let self = this;
  if (self.status === PENDING) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push(value => {
        try {
          // 看到了吗？要拿到 then 中回调返回的结果。
          let x = onFulfilled(value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(error => {
        try {
          let x = onRejected(error);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      });
    }));
  } else if (this.status === FULFILLED) {
    onFulfilled(this.value);
  } else {
    onRejected(this.error);
  }
  return this;
};
