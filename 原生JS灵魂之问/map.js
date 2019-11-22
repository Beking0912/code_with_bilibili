/**
 * ECMA262: When the map method is called with one or two arguments,
 *          the following steps are taken:
 *
 *  Let O be ? ToObject(this value).
 *  Let len be ? LengthOfArrayLike(O).
 *  If IsCallable(callbackfn) is false, throw a TypeError exception.
 *  Let A be ? ArraySpeciesCreate(O, len).
 *  Let k be 0.
 *  Repeat, while k < len
 *      Let Pk be ! ToString(k).
 *      Let kPresent be ? HasProperty(O, Pk).
 *      If kPresent is true, then
 *          Let kValue be ? Get(O, Pk).
 *          Let mappedValue be ? Call(callbackfn, thisArg, « kValue, k, O »).
 *          Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
 *      Set k to k + 1.
 *  Return A.
 */

Array.prototype.map = function(callbackFn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + " is not a function");
  }
  // 草案中提到要先转换为对象
  let O = Object(this);
  let T = thisArg;

  let len = O.length >>> 0;
  // 字面意思是指"右移 0 位"，但实际上是把前面的空位用0填充。
  // 这里的作用是保证len为数字且为整数。
  let A = new Array(len);
  for (let k = 0; k < len; k++) {
    // 还记得原型链那一节提到的 in 吗？in 表示在原型链查找
    // 如果用 hasOwnProperty 是有问题的，它只能找私有属性
    if (k in O) {
      // 使用 in 来进行原型链查找。
      // 同时，如果没有找到就不处理，能有效处理稀疏数组的情况。
      let kValue = O[k];
      // 依次传入this, 当前项，当前索引，整个数组
      let mappedValue = callbackfn.call(T, KValue, k, O);
      A[k] = mappedValue;
    }
  }
  return A;
};

/**
 * V8源码
 */

function ArrayMap(f, receiver) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.map");

  // Pull out the length so that modifications to the length in the
  // loop will not affect the looping and side effects are visible.
  var array = TO_OBJECT(this);
  var length = TO_LENGTH(array.length);
  if (!IS_CALLABLE(f)) throw %make_type_error(kCalledNonCallable, f);
  var result = ArraySpeciesCreate(array, length);
  for (var i = 0; i < length; i++) {
    if (i in array) {
      var element = array[i];
      %CreateDataProperty(result, i, %_Call(f, receiver, element, i, array));
    }
  }
  return result;
}
