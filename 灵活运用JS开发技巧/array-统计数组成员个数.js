const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, c) => {
  t[c] = t[c] ? ++t[c] : 1;
  return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }
