class Promise {
  constructor(executor) {
    this.state = "pending"; // 状态
    this.value = undefined; // 成功值
    this.reason = undefined; // 失败原因
    const resolve = value => {
      if (this.state === "pending") {
        this.state = "fulfiled";
        this.value = value;
      }
    };
    const reject = reason => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    if (this.state === "fulfiled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
  }
}
