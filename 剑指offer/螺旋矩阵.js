var spiralOrder = function(matrix) {
  let height = matrix.length;
  if (!height) return matrix;
  let width = matrix[0].length;
  let count = Math.ceil(Math.min(height, width) / 2); // 螺旋次数
  let level = 0; 
  let result = [];
  while (count) {
    for (let i = level; i < width - level; i++) {
      result.push(matrix[level][i]);
    }
    for (let i = level + 1; i < height - level; i++) {
      result.push(matrix[i][width - 1 - level]);
    }
    for (let i = width - level - 2; i >= level && height - level - 1 != level; i--) {
      result.push(matrix[height - level - 1][i]);
    }
    for (let i = height - level - 2; i >= level + 1 && width - level - 1 != level; i--) {
      result.push(matrix[i][level]);
    }
    level++;
    count--;
  }
  return result;
};
let result = spiralOrder([
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]);
console.log(result);
