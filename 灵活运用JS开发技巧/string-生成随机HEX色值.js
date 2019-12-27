const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
const color = RandomColor();
// color => "#f03665"

let a = Math.random() * 0xffffff
console.log(a) // 4178009.3685128954
console.log(Math.floor(a)) // 4178009
console.log(Math.floor(a).toString(16)) // 3fc059
console.log(Math.floor(a).toString(16).padEnd(6, "0")) // 3fc059