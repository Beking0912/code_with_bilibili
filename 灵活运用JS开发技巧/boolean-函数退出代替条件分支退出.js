if (flag) {
  Func();
  return false;
}
// 换成
if (flag) {
  return Func();
}
