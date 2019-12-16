/**
 * Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符,
 * 如果没有任何自身属性，则返回空对象。
 */
const obj2 = {
  name: "jack",
  get age() {
    return "18";
  }
};
Object.getOwnPropertyDescriptors(obj2);
//   {
//     name: {
//       value: 'jack',
//       writable: true,
//       enumerable: true,
//       configurable: true
//     },
//     age: {
//       get: [Function: get age],
//       set: undefined,
//       enumerable: true,
//       configurable: true
//     }
//   }
