function diff(oldTree, newTree) {
  let patches = {};
  let index = 0;
  // 递归树 比较后的结果放到补丁包中
  walk(oldTree, newTree, index, patches);
  return patches;
}
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 判断老属性中和新属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 有可能是 undefined
    }
  }
  for (let key in newAttrs) {
    // 老节点没有新节点的属性
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}
const ATTRS = 'ATTRS';
function walk(oldNode, newNode, index, patches) {
  let currentPatch = [];
  if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attrs = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs });
    }
  }
  if (currentPatch.length > 0) {
    // 确定当前元素有补丁
    // 将元素和补丁对应起来 放到大补丁包中
    patches[index] = currentPatch;
  }
}
export default diff;

/**
 * 规则：
 * 当节点类型相同 检查属性 产生一个属性的补丁包 {type:'ATTRS', attrs:{class:'list-group'}}
 * 新的dom 节点不存在 {type:'REMOVE', index:xxx}
 * 节点类型不相同 采用替换模式 {type:'REPLACE', newNode:newNode}
 * 文本的变化 {type:'TEXT', text:xxx}
 */
