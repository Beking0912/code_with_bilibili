// 判读是否是复杂类型
const isComplexDtaType = obj =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

// WeakMap 节省内存 有利于垃圾回收
const deepClone = function(obj, hash = new WeakMap()) {
  // 解决无限引用问题
  if (hash.has(obj)) return hash.get(obj);
  // 这几个属性需要单独处理
  let type = [Date, RegExp, Set, Map, WeakMap, WeakSet];
  if (type.includes(obj.constructor)) return new obj.constructor(obj);

  // getOwnPropertyDescriptors是es8的方法 遍历传入参数所有键的特性
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 创建对象 继承原型 继承属性值
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);

  // Reflect.ownKeys可以拷贝不可枚举属性和符号类型
  for (let key of Reflect.ownKeys(obj)) {
    // 如果值是引用类型(非函数)则递归调用deepClone
    cloneObj[key] =
      isComplexDtaType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};
