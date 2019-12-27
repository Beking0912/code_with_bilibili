const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7


let a = 19.20422
let d = 4
console.log(a*10) // 小数点前移1位
console.log(a*10**d) // 小数点前移 d-1 位 
console.log(Math.round(a*10**d)) // 四舍五入
console.log(Math.round(a*10**d) / 10 ) // 小数点后移1位
console.log(Math.round(a*10**d) / 10** d ) // 小数点后移 d-1 位