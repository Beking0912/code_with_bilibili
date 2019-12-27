const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"

let a = 4;
console.log(a & 1) // 偶数返回0 奇数返回1
console.log(!(a & 1)) // 偶数返回true 奇数返回false
console.log(!!(a & 1)) // 偶数返回false 奇数返回true