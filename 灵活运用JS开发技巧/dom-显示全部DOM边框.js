[].forEach.call($$("*"), dom => {
  dom.style.outline =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
// 调试页面元素边界时使用
