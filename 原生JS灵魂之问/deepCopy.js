/**
 * 简易版及其问题
 */
JSON.parse(JSON.stringify());

// 1. 无法解决循环引用的问题：拷贝a会出现系统栈溢出，因为出现了无限递归的情况。
const a = { val: 2 };
a.target = a;
deepClone(obj); // 报错: RangeError: Maximum call stack size exceeded

// 2. 无法拷贝一些特殊的对象，诸如 RegExp，Date，Set，Map等
// 3. 无法拷贝函数 (重点)

/**
 * 简易版
 */
const deepClone = target => {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop]);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

/**
 * 解决循环引用：创建一个 Map，记录已经拷贝过的对象，如果已经拷贝过那就直接返回它
 */
const isObject = target =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

const deepClone = (target, map = new Map()) => {
  if (map.get(target)) return target;

  if (isObject(target)) {
    map.set(target, true);
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};

deepClone(obj); // { val: 2, target: { val: 2, target: [Circular] } }

/**
 * 存在的坑：map 上的 key 和 map 构成了强引用关系，这相当危险
 *
 * 被弱引用的对象可以在任何时候被回收，
 * 而对于强引用来说，只要这个强引用还在，那么对象就无法被回收
 * 上面的例子中，map 和 a 一直是强引用的关系，在程序结束之前，a 所占的内存空间一直不会被释放
 *
 * 如何解决？
 *
 * 让 map 的 key 和 map 构成弱引用即可
 * ES6 提供了这样的数据结构：WeakMap(特殊的 Map，键必须是对象，值可以是任意，键是弱引用的)
 */
const deepClone = (target, map = new WeakMap()) => {
  //...
};

/**
 * 解决拷贝特殊对象：可遍历对象
 *
 * 鉴别特殊对象：Object.prototype.toString.call(obj);
 */
const getType = Object.prototype.toString.call(obj);

const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Array]": true,
  "[object Object]": true,
  "[object Arguments]": true
};

const deepClone = (target, map = new Map()) => {
  if (!isObject(target)) return target;
  let type = getType(target);
  let cloneTarget;
  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return;
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.prototype;
    cloneTarget = new ctor();
  }

  if (map.get(target)) return target;
  map.put(target, true);

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key), deepClone(item));
    });
  }

  if (type === setTag) {
    //处理Set
    target.forEach(item => {
      target.add(deepClone(item));
    });
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop]);
    }
  }
  return cloneTarget;
};

/**
 * 解决拷贝特殊对象：不可遍历对象
 */
const handleRegExp = target => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const handleFunc = target => {
  // 待会的重点部分
};

const handleNotTraverse = (target, tag) => {
  const Ctor = targe.constructor;
  switch (tag) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

/**
 * 解决拷贝函数
 *
 * 每个普通函数都是 Function 的实例，箭头函数不是任何类的实例，每次调用都是不一样的引用
 * 所以只需要处理普通函数的情况，箭头函数直接返回它本身即可
 *
 * 如何区分普通函数和箭头函数？
 *
 * 利用原型，箭头函数不存在原型
 */
const handleFunc = func => {
  if (!func.prototype) return func; // 箭头函数直接返回自身
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

/**
 * 小 bug
 *
 * 如何解决？
 *
 * 可以对 Boolean 拷贝做最简单的修改，
 * 调用 valueOf:new target.constructor(target.valueOf())
 * 实际上这种写法不推荐
 * 所以es6中的新类型 Symbol 是不能直接 new 的，只能通过 new Object(SymbolType)
 */
const target = new Boolean(false);
const Ctor = target.constructor;
new Ctor(target); // 结果为 Boolean {true} 而不是 false。

// 统一一下：
const handleNotTraverse = (target, tag) => {
  const Ctor = targe.constructor;
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

/**
 * 完整的深拷贝
 */
const getType = obj => Object.prototype.toString.call(obj);

const isObject = target =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

const canTraverse = {
  "[object Map]": true,
  "[object Set]": true,
  "[object Array]": true,
  "[object Object]": true,
  "[object Arguments]": true
};
const mapTag = "[object Map]";
const setTag = "[object Set]";
const boolTag = "[object Boolean]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const handleRegExp = target => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const handleFunc = func => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);
  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(",");
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

const handleNotTraverse = (target, tag) => {
  const Ctor = target.constructor;
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target;
  let type = getType(target);
  let cloneTarget;
  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type);
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor;
    cloneTarget = new ctor();
  }

  if (map.get(target)) return target;
  map.set(target, true);

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  if (type === setTag) {
    //处理Set
    target.forEach(item => {
      cloneTarget.add(deepClone(item, map));
    });
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }
  return cloneTarget;
};
