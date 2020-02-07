function duplicate(numbers, duplication = {}) {
  let result = {};
  for (let i of numbers) {
    if (result[i]) {
      duplication[0] = i;
      return true;
    } else {
      result[i] = 1;
      duplication[0] = -1;
    }
  }
  return false;
}
let result = duplicate([2, 1, 0, 5, 3]);
console.log(result);
