function isNumeric(s) {
    return s.match(/[+-]?\d*(\.\d*)?([eE][+-]?\d+)?/g)[0] === s;
}
let result = isNumeric("-1E-16");
let result2 = isNumeric("1a3.14");
console.log(result, result2);
