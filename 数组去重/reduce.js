// 老数组先排序，将值加入新数组的条件：新数组为空、新数组最后一位不等于当前值
Array.prototype.unique = function() {
  return this.sort().reduce((init, current) => {
    if (init.length === 0 || init[init.length - 1] !== current) {
      init.push(current);
    }
    return init;
  }, []);
};
