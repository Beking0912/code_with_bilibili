/**
 * 函数参数默认值
 */
function foo(height = 50, color = "red") {
  // ...
}

function foo(height, color) {
  var height = height || 50;
  var color = color || "red";
  // ...
}
// 这种写法的问题：当参数的布尔值为 false 时会出问题。
foo(0, "");
// 因为 0 的布尔值是 false，这样的 height 的取值将是 50。
