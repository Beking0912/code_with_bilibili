/**
 * 对象属性简写
 */

// 不使用时：
const name='Ming',age='18',city='Shanghai';
const student = {
    name:name,
    age:age,
    city:city
};

// 使用后：
const name='Ming',age='18',city='Shanghai';
const student = {
    name,
    age,
    city
};