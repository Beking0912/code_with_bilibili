//定义三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
  let self = this; // 缓存当前promise实例
  self.value = null;
  self.error = null;
  self.status = PENDING;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  const resolve = value => {
    if (self.status !== PENDING) return;
    setTimeout(() => {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilledCallbacks.forEach(callback => callback(self.value));
      //resolve时执行成功回调
    });
  };

  const reject = error => {
    if (self.status !== PENDING) return;
    setTimeout(() => {
      self.status = REJECTED;
      self.error = error;
      self.onRejectedCallbacks.forEach(callback => callback(self.error));
      //resolve时执行成功回调
    });
  };
  executor(resolve, reject);
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  //如果x是一个promise
  if (x instanceof MyPromise) {
    // 拆解这个 promise ，直到返回值不为 promise 为止
    if (x.status === PENDING) {
      x.then(
        y => {
          resolvePromise(bridgePromise, y, resolve, reject);
        },
        error => {
          reject(error);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else {
    // 非 Promise 的话直接 resolve 即可
    resolve(x);
  }
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
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(error => {
        try {
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  } else if (self.status === FULFILLED) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      try {
        // 状态变为成功，会有相应的 self.value
        let x = onFulfilled(self.value);
        // 暂时可以理解为 resolve(x)，后面具体实现中有拆解的过程
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }));
  } else if (self.status === REJECTED) {
    return (bridgePromise = new MyPromise((resolve, reject) => {
      try {
        // 状态变为失败，会有相应的 self.error
        let x = onRejected(self.error);
        resolvePromise(bridgePromise, x, resolve, reject);
      } catch (e) {
        reject(e);
      }
    }));
  }

  return this;
};
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
Promise.resolve = param => {
  if (param instanceof Promise) return param;
  return new Promise((resolve, reject) => {
    if (param && param.then && typeof param.then === "function") {
      // param 状态变为成功会调用resolve，将新 Promise 的状态变为成功，反之亦然
      param.then(resolve, reject);
    } else {
      resolve(param);
    }
  });
};
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
Promise.prototype.finally = function(callback) {
  this.then(
    value => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    error => {
      return Promise.resolve(callback()).then(() => {
        throw error;
      });
    }
  );
};
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    let index = 0;
    let len = promises.length;
    if (len === 0) {
      resolve(result);
      return;
    }

    for (let i = 0; i < len; i++) {
      // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
      Promise.resolve(promise[i])
        .then(data => {
          result[i] = data;
          index++;
          if (index === len) resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    let len = promises.length;
    if (len === 0) return;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promise[i])
        .then(data => {
          resolve(data);
          return;
        })
        .catch(err => {
          reject(err);
          return;
        });
    }
  });
};
