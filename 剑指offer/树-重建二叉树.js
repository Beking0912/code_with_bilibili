function reConstructBinaryTree(pre, vin) {
  var len = pre.length;
  if(len === 0 && vin.length === 0) return null;
  return createTree(pre, vin, 0, len - 1, 0);
}
function createTree(pre, vin, left, right, rootIndex) {
  var val = pre[rootIndex];
  var midIndex = vin.indexOf(val);
  var root = new TreeNode(val);
  if (midIndex > left)
    root.left = createTree(pre, vin, left, midIndex - 1, rootIndex + 1);
  if (midIndex < right)
    root.right = createTree(pre, vin, midIndex + 1, right, rootIndex + midIndex - left + 1);
  return root;
}
