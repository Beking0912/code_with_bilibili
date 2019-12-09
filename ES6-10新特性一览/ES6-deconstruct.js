/**
 * 解构赋值
 */

// 获取数组中的值
var foo = ["one", "two", "three", "four"];
var [one, two, three] = foo;

// 如果你要忽略某些值，你可以按照下面的写法获取你想要的值
var [first, , , last] = foo;

// 你也可以这样写
var a, b; //先声明变量
[a, b] = [1, 2];

// 若未从数组中获取到值，可以为变量设置默认值
[a = 5, b = 7] = [1];

// 通过解构赋值交换两个变量的值
[a, b] = [b, a];

// 获取对象中的值
const student = {
  name: "Ming",
  age: "18",
  city: "Shanghai"
};
const { name, age, city } = student;
