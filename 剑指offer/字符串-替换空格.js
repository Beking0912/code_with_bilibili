function replaceSpace(str) {
    return str.replace(/ /g, '%20')
}
let result = replaceSpace("We Are Happy.");
console.log(result);
