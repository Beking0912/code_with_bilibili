/**
 * 指数操作符
 */

function calculateExponent(base, exponent) {
  if (exponent === 1) {
    return base;
  } else {
    return base * calculateExponent(base, exponent - 1);
  }
}

console.log(calculateExponent(2, 10)); // 输出1024
console.log(Math.pow(2, 10)); // 输出1024
console.log(2 ** 10); // 输出1024
