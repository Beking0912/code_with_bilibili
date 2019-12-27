const _obj = { a: 0, b: 1, c: 2 }; // 以下方法任选一种
const obj = { ..._obj };
const obj = JSON.parse(JSON.stringify(_obj));
// obj => { a: 0, b: 1, c: 2 }

console.log(JSON.stringify(_obj)) // {"a":0,"b":1,"c":2}
console.log(typeof JSON.stringify(_obj)) // string
console.log(JSON.parse(JSON.stringify(_obj))) // { a: 0, b: 1, c: 2 }
console.log(typeof JSON.parse(JSON.stringify(_obj))) // object