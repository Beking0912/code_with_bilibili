class Animal {
  // 构造函数，实例化时会被调用，若不指定则会又一个不带参数的默认构造函数
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  // toString 是原型对象上的属性
  toString() {
    console.log("name:" + this.name + ",color:" + this.color);
  }
}

var animal = new Animal("dog", "white"); // 实例化
animal.toString();

console.log(animal.hasOwnProperty("name")); //true
console.log(animal.hasOwnProperty("toString")); // false
console.log(animal.__proto__.hasOwnProperty("toString")); // true

class Cat extends Animal {
  constructor(action) {
    super("cat", "white");
    this.action = action;
  }
  toString() {
    console.log(super.toString());
  }
}

var cat = new Cat("catch");
cat.toString();

// 实例cat 是 Cat 和 Animal 的实例，和Es5完全一致。
console.log(cat instanceof Cat); // true
console.log(cat instanceof Animal); // true

