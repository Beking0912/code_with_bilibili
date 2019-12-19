需要考虑各种情况，例如下面的例子：
```js
const arr = [1, 1, '1', '1', 0, 0, '0', '0', undefined, undefined, null, null, NaN, NaN, {}, {}, [], [], /a/, /a/];
```
经过综合考虑，最优的数组去重算法是采用`Map`数据结构实现的算法。