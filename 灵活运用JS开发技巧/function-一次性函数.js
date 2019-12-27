function Func() {
  console.log("x");
  Func = function() {
    console.log("y");
  };
}

// 适用于运行一些只需执行一次的初始化代码