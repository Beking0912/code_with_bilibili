// 优雅处理Async/Await参数
function AsyncTo(promise) {
  return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());

// 优雅处理多个函数返回值
function Func() {
  return Promise.all([fetch("/user"), fetch("/comment")]);
}
const [user, comment] = await Func(); // 需在async包围下使用
