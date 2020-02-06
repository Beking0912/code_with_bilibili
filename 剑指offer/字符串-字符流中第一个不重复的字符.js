let result;
function Init() {
  result = {};
}
function Insert(ch) {
  result[ch] = result[ch] ? result[ch] + 1 : 1;
}
function FirstAppearingOnce() {
  for (let i in result) {
    if (result[i] === 1) return i;
  }
  return "#";
}
