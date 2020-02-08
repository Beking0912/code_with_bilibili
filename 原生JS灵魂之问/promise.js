class Promise {
  constructor(excutorCallBack) {
    this.status = "pending";
    this.value = undefined;
    this.fulfillAry = [];
    this.rejectedAry = [];
    //=>执行Excutor
    let resolveFn = result => {
      if (this.status !== "pending") return;
      let timer = setTimeout(() => {
        this.status = "fulfilled";
        this.value = result;
        this.fulfillAry.forEach(item => item(this.value));
      }, 0);
    };
    let rejectFn = reason => {
      if (this.status !== "pending") return;
      let timer = setTimeout(() => {
        this.status = "rejected";
        this.value = reason;
        this.rejectedAry.forEach(item => item(this.value));
      });
    };
    try {
      // 执行这个异步函数
      excutorCallBack(resolveFn, rejectFn);
    } catch (err) {
      //=>有异常信息按照rejected状态处理
      rejectFn(err);
    }
  }
  then(fulfilledCallBack, rejectedCallBack) {
    // 保证两者为函数
    typeof fulfilledCallBack !== "function"
      ? (fulfilledCallBack = result => result)
      : null;
    typeof rejectedCallBack !== "function"
      ? (rejectedCallBack = reason => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;
    return new Promise((resolve, reject) => {
      //注意这个this指向目前的Promise对象，而不是新的Promise
      //再强调一遍,很重要：
      //目前的Promise(不是这里return的新Promise)的resolve和reject函数其实一个作为微任务
      //因此他们不是立即执行，而是等then调用完成后执行
      this.fulfillAry.push(() => {
        try {
          //把then里面的方法拿过来执行
          //执行的目的已经达到
          let x = fulfilledCallBack(this.value);
          //下面执行之后的下一步，也就是记录执行的状态，决定新Promise如何表现
          //如果返回值x是一个Promise对象，就执行then操作
          //如果不是Promise,直接调用新Promise的resolve函数,
          //新Promise的fulfilAry现在为空,在新Promise的then操作后.新Promise的resolve执行
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
      this.rejectedAry.push(() => {
        try {
          let x = this.rejectedCallBack(this.value);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (err) {
          reject(err);
        }
      });
    });
  }
  catch(rejectedCallBack) {
    return this.then(null, rejectedCallBack);
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
  static resolve(value) {
    if (value instanceof Promise) return value;
    return new Promise(resolve => resolve(value));
  }
  static reject(value) {
    return new Promise((resolve, reject) => reject(value));
  }
}

module.exports = Promise;
