const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1

/**
 * 代替正数的 Math.floor()，代替负数的 Math.ceil()
 * 
 * ~~ 双非按位取反运算符，比 Math.floor() 更快，正数向下取整，负数向上取整，非数字取0
 * | 位或运算符，用于对两个二进制操作数逐位进行比较，通常用来取整
 */