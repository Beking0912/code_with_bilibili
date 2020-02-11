// 虚拟dom元素的类
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
// 设置属性
function serAttr(node, key, value) {
  switch (key) {
    case "value":
      if (
        node.tagName.toUpperCase() === "INPUT" ||
        node.tagName.toUpperCase() === "TEXTAREA"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
// 返回虚拟节点
function createElement(type, props, children) {
  return new Element(type, props, children);
}
// 虚拟节点转化成真实dom
function render(eleObj) {
  let el = document.createElement(eleObj.type);
  for (let key in eleObj.props) {
    serAttr(el, key, eleObj.props[key]);
  }
  // 遍历子节点 若是虚拟dom则继续渲染 否则代表文本节点
  eleObj.children.forEach(child => {
    child =
      child instanceof Element ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  });
  return el;
}
// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el);
}
export { createElement, render, Element, renderDom };
