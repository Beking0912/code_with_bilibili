/**
 * 新增 Array.prototype.flat() 和 Array.prototype.flatMap()
 * flat()和flatMap()本质上就是是归纳（reduce） 与 合并（concat）的操作。
 */

/**
 * Array.prototype.flat()
 *
 * flat() 方法会按照一个可指定的深度递归遍历数组，
 * 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 */

//  1. flat()方法最基本的作用就是数组降维
var arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); // [1, 2, 3, 4, 5, 6]

// 2. 还可以利用flat()方法的特性来去除数组的空项
var arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]

/**
 * Array.prototype.flatMap()
 *
 * flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。
 * 它与 map 和 深度值1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
 * 这里我们拿map方法与flatMap方法做一个比较。
 */
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); // [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]); // [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]); // [[2], [4], [6], [8]]
