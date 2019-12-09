/**
 * ES5 不支持原生的模块化。
 *
 * ES6 每一个模块都有自己单独的作用域，
 * 模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，
 * 通过 import 来引用其他模块提供的接口，
 * 同时还为模块创造了命名空间，防止函数的命名冲突。
 */

/**
 * 导出
 */

// 导出变量
export var name = "Rainbow";
// 导出常量
export const sqrt = Math.sqrt;
// 导出多个变量
var name = "jack";
var age = "20";
export { name, age };
// 导出函数
export function myModule(someArg) {
  return someArg;
}

/**
 * 导入
 */

import { myModule } from "";
import { name, age } from "";
import defaultMethod, { otherMethod } from "";
