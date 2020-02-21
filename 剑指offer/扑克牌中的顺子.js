// var isStraight = function(nums) {
//   let res = nums.filter(cur => cur !== 0);
//   let res2 = [...new Set(res)];
//   if (res.length !== res2.length) return false;
//   let min = Math.min(...res);
//   let max = Math.max(...res);
//   if (max - min <= 4 && max - min - res.length + 1 <= nums.length - res.length)
//     return true;
//   return false;
// };
// console.log(isStraight([0, 0, 2, 1, 5]));

function deepCopy(target) {
  if (target == null) return target;
  if (typeof target !== "object") return target;
  if (target instanceof Date) return new Date(target.getTime());
  if (target instanceof RegExp) return new RegExp(target);

  let t = new target.constructor();
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      t[key] = deepCopy(target[key]);
    }
  }
  return t;
}

var m = new Map(); 
m.set('Adam', 67); 
m.set('Bob', 59);
let b = deepCopy(m);

console.log(m, b);

var s = new Set([1, 2, 3, 3, '3']);
let c = deepCopy(s);
console.log(s, c);
