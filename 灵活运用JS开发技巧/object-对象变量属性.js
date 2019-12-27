const flag = false;
const obj = {
  a: 0,
  b: 1,
  [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
