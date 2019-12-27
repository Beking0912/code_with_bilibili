const _arr = [0, 1, 2];

// --------- map --------- 
const arr = _arr.map(v => v * 2);
const arr = _arr.reduce((t, c) => {
  t.push(c * 2);
  return t;
}, []);
// arr => [0, 2, 4]

// --------- filter --------- 
const arr = _arr.filter(v => v > 0);
const arr = _arr.reduce((t, c) => {
  c > 0 && t.push(c);
  return t;
}, []);
// arr => [1, 2]

// --------- map和filter --------- 
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr = _arr.reduce((t, c) => {
  c = c * 2;
  c > 2 && t.push(c);
  return t;
}, []);
// arr => [4]
