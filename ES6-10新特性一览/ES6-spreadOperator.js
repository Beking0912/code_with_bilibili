/**
 * 扩展操作符
 */

// 函数调用：
myFunction(...iterableObj);

// 数组构造或字符串：
[...iterableObj, "4", ..."hello", 6];

// 构造对象时进行克隆或属性拷贝(ES2018新增特性)：
let objClone = { ...obj };

// 在函数调用时使用：
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum.apply(null, numbers)); // 不使用延展操作符
console.log(sum(...numbers)); // 使用延展操作符

// 构造数组：(没有展开语法的时候，只能组合使用 push，splice，concat 等方法)
const students = ["Jink", "Tom"];
const persons = ["Tony", ...students, "Aaron", "Anna"];

// 数组拷贝：(展开语法和 Object.assign() 行为一致, 执行的都是浅拷贝(只遍历一层))
var arr = [1, 2, 3];
var arr2 = [...arr]; // 等同于 arr.slice()

// 连接多个数组：
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
var arr3 = [...arr1, ...arr2]; // 将 arr2 中所有元素附加到 arr1 后面并返回
// 等同于
var arr4 = arr1.concat(arr2);

// ES2018 中新增对对象的支持
var obj1 = { foo: "bar", x: 42 };
var obj2 = { foo: "baz", y: 13 };
var clonedObj = { ...obj1 }; // 克隆后的对象: { foo: "bar", x: 42 }
var mergedObj = { ...obj1, ...obj2 }; // 合并后的对象: { foo: "baz", x: 42, y: 13 }

// 在 React 中的应用
<CustomComponent name="Jinx" age={21} />; // 不使用...
const params = {
  name: "Jinx",
  age: 21
};
{
  /* <CustomComponent {...params} /> */
}

// 配合解构赋值避免传入一些不需要的参数
var params = {
  name: "123",
  title: "456",
  type: "aaa"
};
var { type, ...other } = params;
<CustomComponent type="normal" number={2} {...other} />;
//等同于：<CustomComponent type='normal' number={2} name='123' title='456' />
