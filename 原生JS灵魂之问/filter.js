Array.prototype.filter = function(callbackfn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + " is not a function");
  }
  let O = Object(this);
  let len = O.length >>> 0;

  let resLen = 0;
  let Ary = [];
  
  for (let k = 0; k < len; k++) {
    if (k in O) {
      let element = O[k];
      if (callbackfn.call(thisArg, O[k], k, O)) {
        Ary[resLen++] = element;
      }
    }
  }
  return Ary;
};
