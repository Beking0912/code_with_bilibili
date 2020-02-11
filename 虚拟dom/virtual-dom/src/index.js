import { createElement, render, renderDom } from "./element";

let virtualDom = createElement("ul", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);
// 将虚拟dom转化成真实dom
let el = render(virtualDom);
renderDom(el, window.root);
