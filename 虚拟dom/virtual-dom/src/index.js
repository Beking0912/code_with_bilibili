import { createElement, render, renderDom } from "./element";
import { diff } from "./diff";

let virtualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);
let virtualDom2 = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["5"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["9"])
]);

// 将虚拟 dom 转化成真实 dom
// let el = render(virtualDom);
// renderDom(el, window.root);

// dom-diff 返回一个 patch 对象 根据改变的内容重新渲染

let patches = diff(virtualDom, virtualDom2);
