function Find(target, array) {
  let lenX = 0;
  let lenY = array.length - 1;
  while (lenY >= 0 && lenX < array[0].length) {
    if (array[lenY][lenX] > target) {
      lenY--;
    } else if (array[lenY][lenX] < target) {
      lenX++;
    } else return true;
  }
  return false;
}
let result = Find(
  [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ],
  5
);
console.log(result);

var findNumberIn2DArray = function(matrix, target) {
  let row = matrix.length - 1;
  let col = 0;
  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
      col++;
    } else {
      return true;
    }
  }
  return false;
};
