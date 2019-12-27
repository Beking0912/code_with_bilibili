function Func() {
  if (a === b) {
    console.log("x");
  } else {
    console.log("y");
  }
}
// 换成
function Func() {
  if (a === b) {
    Func = function() {
      console.log("x");
    };
  } else {
    Func = function() {
      console.log("y");
    };
  }
  return Func();
}

// 函数内判断分支较多较复杂时可大大节约资源开销