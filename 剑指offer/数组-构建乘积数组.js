function multiply(array) {
  let result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = 1;
    for (var j = 0; j < array.length; j++) {
      if (j != i) {
        result[i] *= array[j];
      }
    }
  }
  return result;
}
let result = multiply([1,2,3,4,5]);
console.log(result);
