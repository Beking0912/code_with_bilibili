function match(s, pattern) {
  let reg = new RegExp("^" + pattern + "$", "g");
  return reg.test(s);
}
let result = match("aaa", "ab*ac*a");
console.log(result);
