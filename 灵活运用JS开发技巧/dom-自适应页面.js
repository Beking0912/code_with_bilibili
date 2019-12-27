function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = (target.clientWidth / width) * 100 + "px");
}
// 页面基于一张设计图但需做多款机型自适应，元素尺寸使用rem进行设置
