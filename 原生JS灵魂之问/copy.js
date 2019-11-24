/**
 * 浅拷贝
 */

// 直接赋值，当改变 newArr 时，由于是同一个引用，arr 指向的值也跟着改变
let arr = [1, 2, 3];
let newArr = arr;
newArr[0] = 100;
console.log(arr); // [100, 2, 3]

// 浅拷贝
// newArr 是 arr 浅拷贝后的结果，newArr 和 arr 现在引用的不是同一块空间
let arr = [1, 2, 3];
let newArr = arr.slice();
newArr[0] = 100;
console.log(arr); // [1, 2, 3]

// 浅拷贝的限制：只能拷贝一层对象
let arr = [1, 2, { val: 4 }];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr); //[ 1, 2, { val: 1000 } ]

/**
 * 手动实现浅拷贝
 */
const shallowClone = target => {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

/**
 * Object.assign  (Object.assgin() 拷贝的是对象的属性的引用，而不是对象本身)
 */
let obj = { name: "sy", age: 18 };
const obj2 = Object.assign({}, obj, { name: "sss" });
console.log(obj2); //{ name: 'sss', age: 18 }

/**
 * concat 浅拷贝数组
 */
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr); //[ 1, 2, 3 ]

/**
 * slice 浅拷贝
 */
let newArr = arr.slice();

/**
 * ...扩展运算符  跟arr.slice()是一样的效果
 */
let newArr = [...arr];
