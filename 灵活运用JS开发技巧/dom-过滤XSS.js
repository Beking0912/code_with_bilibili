function FilterXss(content) {
  let elem = document.createElement("div");
  elem.innerText = content;
  const result = elem.innerHTML;
  elem = null;
  return result;
}
