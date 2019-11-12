/**
 * let-const-use-case
 */
console.log(color); // ReferenceError
let color = "yellow";
// 临时性死区：在 ES2015 中，let也是会提升到块级作用域的顶部，但在声明之前引用该变量会报错
// const 也同样如此

// 1. 默认使用 const
// 2. 当变量需要重新绑定或更新时 使用 let
// 3. ES6 中尽量不使用 var

/**
 * arrow-function
 */
const double2 = numbers.map(number => number * 2); // 隐式返回 匿名函数 赋值给变量
const people = {
  name: "beking",
  hobbies: ["reading", "running", "coding"],
  printHobbies: function() {
    console.log(this); // 这里的 this 指向 people
    this.hobbies.map(function(hobby) {
      // 这个函数是 map 的回调函数，是一个独立函数，不是作为对象的方法调用，也没有通过 call apply bind 改变 this 值
      // 所以此处的 this 应该指向 window、global，或在严格模式下指向 undefined
      console.log(`${this.name} loves ${hobby}`); // 并没有输出 beking，这里的 this 指向 window
    });
    // JS 中的 this 值是在运行时才绑定的，printHobbies 方法是由 people 调用的所以指向 people
  }
};

// 成功的方法一
var self = this;

// 成功的方法二 (ES6)
this.hobbies.map(hobby => {
  // 这个 this 指向的是 people，所以下面的箭头函数也是指向 people
  // 箭头函数没有自己的 this 值，this 值是继承自父作用域的
  // 箭头函数的 this 是词法作用域，是在定义时就被指定，也不会因为调用方法的改变而改变
  console.log(`${this.name} loves ${hobby}`);
});

/**
 * default-arguments
 */
function multiply(a = 3, b = 4) {
  return a * b;
} // b = b || 4; 以前是这样设置默认值的
multiply(); // 以默认值来计算输出
multiply(3); // 第一个参数为 3，第二个参数使用默认值
multiply(undefined, 3); // 第一个参数显式地传 undefined
multiply(null, 2); // 传入 null 不会使用默认值 返回 0
// 判断 a 是否是 undefined：typeof a === 'undefined'

/**
 * this
 */
//（1）作为构造函数，一个方法需要绑定到对象
const Person = (name, points) => {
  // 报错的原因：箭头函数没有将 this 绑定到 Beking 对象上去
  this.name = name;
  this.points = points;
};
const Beking = new Person("beking", 6);
// 使用 new 来创建一个实例，四个步骤：
// 1. 生成一个新的对象
// 2. 把函数中的 this 值指向新生成的这个对象
// 3. 把这个对象绑定它的原型对象
// 4. 返回这个新对象

Person.prototype.updatePoints = () => {
  // 给 Person 添加一个原型方法
  this.points++;
  console.log(this.points);
  // 返回 NaN 的原因：这里的 this 值指向的是 window
};

//（2）当你真的需要 this 的时候
const button = document.querySelector(".zoom");
button.addEventListener("click", () => {
  this.classList.add("in");
  // 报错的原因：这里的 this 值指向 window
  setTimeout(() => {
    this.classList.remove("in");
  }, 2000); // 这里的 this 值取自父作用域的 this 的指向
});

//（3）需要使用 arguments 对象
const sum = () => {
  // 返回所有参数的和
  return Array.from(arguments).reduce(
    // Array.from 是将 arguments 这个类数组对象转化成真正的数组
    // 报错的原因：箭头函数中没有 arguments 对象
    (prevSum, value) => prevSum + value,
    0
  );
};
const sum2 = function(...args) {
  return args.reduce((prevSum, value) => prevSum + value, 0);
};

/**
 * template-string
 */
// 倾向于将部分内容抽象出来包装成一个函数
function renderTodos(todo) {
  // 可以在模版字符串中使用三元表达式
  return `
        <ul>
            ${Beking.todos
              .map(
                todo =>
                  `<li>${todo.name} ${todo.completed ? "done" : "no"}</li>`
              )
              .join("")} 
        </ul>`;
}

// 模版字符串是可以嵌套使用的
// map 的结果是数组，所以输出结果之间有逗号，需要用 join("")

/**
 * tagged-template-string
 */
function highlight(strings, ...values) {
  const highlighted = values.map(
    value => `<span class='highlight'>${value}</span>`
  );

  // let str = "";
  // strings.forEach((string, i) => {
  //   str += `${string}${highlighted[i] || ""}`;
  // });
  // return str;

  return strings.reduce(
    // 字符串拼接也可以使用数组的 reduce 方法
    (prev, curr, i) => `${prev} ${curr} ${highlighted[i] || ""}`,
    ""
  );
}
const user = "Beking";
const topic = "Learn to user markdown";
const sentence = highlight`${user} has commented on you topic ${topic}`;
// 如果模版字符串是以变量开头或结尾，strings 的首尾会多两个空字符串
// 上面方法 highlighted[i] 输出结果最后会带一个 undefined，需要设置默认值

/**
 * post-comments
 */
function sanitize(strings, ...values) {
  const dirty = strings.reduce(
    (prev, curr, i) => `${prev}${curr}${values[i] || ""}`,
    ""
  );
  return DOMPurify.sanitize(dirty);
}

// 容易收到 XSS 攻击，即跨站脚本攻击
// 用户通过在输入中嵌入非法字符串或脚本，来窃取用户 cookie、session 等
// 解决方案：使用 DOMPurify 对用户输入进行净化
addCommentForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const newComment = textarea.value.trim();
  if (newComment) {
    commentDiv.innerHTML = sanitize`
        <div class='comment-header'>${user}</div>
        <div class='comment-body'>${textarea.value}</div>
        `;
    textarea.value = "";
  }
});

/**
 * new-string-methods
 */
// .startsWith()
id.startsWith("33"); // true 是否是 33 开头
id.startsWith("1998", 6); // 从第六位开始是否是 1998 开头
fan.startsWith("Hello"); // true 该方法是大小写敏感的

// .endsWith() 用法与上类似

// .includes()
fan.includes("Hello"); // true 等同于：fan.indexOf('Hello') !== -1
fan.includes("Hello", 6); // 从第六位开始是否包含该字符串

// .repeat()
"哈".repeat(10); // 重复 10 遍哈
const heading = `${"=".repeat(5)} ${fan} ${"=".repeat(5)}`; // 美化字符串
function padder(str, len = 25) {
  // 实现右对齐
  return `${" ".repeat(Math.max(len - str.length, 0))}${str}`;
}

/**
 * destructuring-objects
 */
// const name = Beking.name;  ES6 之前的方式

const { name, age } = Beking; // ES6 的方式
const { mother, father: f, brother, sister = "have no sister" } = Beking.family; // 对象解构可以嵌套
// 如果在之前已经有相同名字的变量被申明，可以在对象解构时进行重命名
// 重命名的流程：
// 1. 申明 f 变量
// 2. 在 Beking.family 中找到属性名为 father 的值
// 3. 赋值给 f

// 当取出的属性不存在于该对象，回滚到默认值，否则返回 undefined
// 必须是明确等于 undefined 才会使用默认值，null、false、0 等都是按原值返回

/**
 * destructuring-array
 */
const numbers = ["one", "two", "three", "four"];

// const [one, two] = numbers;  获取数组第一第二个位置的值
// const [one, , three] = numbers;  只想获取第一第三个位置的值，需要空出中间元素的位置
const [one, ...others] = numbers; // 后几位会组成新数组赋值给 others
// const [one, ...others, three] = numbers; 数组的 rest 参数必须放最后

// 对象解构常用场景之一：交换变量的值
[a, b] = [b, a];

/**
 * for-in-loop
 */
const fruits = ["apple", "banana", "orange", "mango"];

// 遍历方式一 缺点：不能以变量的方式获取一个对象 必须是 fruits[i]
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 遍历方式二 缺点：不能终止或跳过
fruits.forEach(fruit => {
  // if (fruit === 'apple') break; 会报错
  console.log(fruit);
});

// 遍历方式三 缺点：遍历的是对象上的可枚举属性，加在原型对象上的属性也会被遍历出来
Array.prototype.first = function() {
  return this[0];
};
fruits.dec = "good";
for (let index in fruits) {
  console.log(fruits[index]);
}

// 遍历方式四 ES6 支持 break、continue
for (let fruit of fruits) {
  console.log(fruit);
}

const fruits = ["apple", "banana", "orange", "mango"];

// for-of 可以用来遍历可迭代对象
// 可迭代对象：部署了 iterator 遍历器接口或定义了 Symbol.iterator 方法的数据结构
// JS 给很多内置数据结构提供了内置遍历器接口，例如 Array、Map
for (let fruit of fruits) {
  console.log(fruit);
}

// 可以通过 fruits.entries() 查看到遍历器接口
// iterator.next() 方法返回对象 {value:{[0,apple],done:false}}
for (let fruit of fruits.entries()) {
  console.log(fruit); // [0, 'apple'] 可以同时得到索引值
  console.log(fruit[1]);
}

// for-of 可以用于 Array、String、Map、Set、arguments、nodeList
// for-of 目前还不支持对象
for (let [index, fruit] of fruits.entries()) {
  console.log(`${fruit} ranks ${index + 1} in my favorite fruits.`);
}
function sum() {
  console.log(arguments); // __proto__:Object
}
sum(10, 22, 324, 34, 22, 4);

/**
 * array-methods
 */
const inventory = [{ name: "bananas", quantity: 0 }];

// .find(element, index, array)
// .find() 用于寻找数组中某一个满足条件的元素，接受函数作为参数
// 找到满足条件的第一个元素就立马返回，不会执行后续操作
// 相对于 forEach 性能更优，相对于 for-of 语法更简单
const bananas = inventory.find(fruit => fruit.name === "bananas");

// .findIndex(element, index, array)
// 找元素索引
const bananasIndex = inventory.findIndex(fruit => fruit.name === "bananas");

// .some()
// 数组中某一个元素满足条件即返回 true，并不会执行后续操作
const isEnough = inventory.some(fruit => fruit.quantity > 0);

// .every()
// 数组中每一个元素都满足条件才返回 true
const isEnough = inventory.every(fruit => fruit.quantity > 0);

/**
 * rest-params
 */
// 剩余参数
function sum(...numbers) {
  return numbers.reduce((prev, curr) => prev + curr, 0);
}
sum(1, 2, 3, 4);

// 应用场景一：对函数参数的处理
function converCurrency(rate, ...amounts) {
  return amounts.map(amounts => amounts * rate);
}

// 应用场景二：用于变量的解构
const player = ["beking", 123123, 2.2, 3.5, 6.4];
const [name, id, ...scores] = player;

/**
 * spread-operator-intro
 */
const youngers = ["mars", "jack", "lily"];
const olders = ["james", "martin", "john"];
const all = [...youngers, "mary", ...olders];
const currentAll = all;
// 当 currentAll 改变时 all 会随之改变
// 原因：currentAll 复制的是 all 数组的索引，两个数组指向的是同一个地方
// 为了避免以上情况，使用以下写法：
const currentAll2 = [].concat(all);
const currentAll3 = [...all];

/**
 * array-from-and-of
 */
// .from() .of() 不是数组原型上的方法

// Array.form()
// Array.form() 用于把一个类数组对象(拥有length属性的对象)
// 或可遍历对象(部署了iterator接口的对象)转换为真正的数组
const todos = document.querySelectorAll("li");
console.log(todos);
// todos 的原型是 NodeList 而不是数组，没有 map 方法
const names = Array.from(todos).map(todo => todo.textContent);

// 第二个参数传方法，可简化成如下
const names2 = Array.from(todos, todo => todo.textContent);

// arguments 的原型是 Object，没有 reduce 方法
function sum() {
  return Array.from(arguments).reduce((prev, curr) => prev + curr, 0);
}

// Array.of()
// Array.of() 是弥补 Array 的不足，不管传入多少参数返回的都是相应数组(一致性)
// new Array(5) 返回 [undefined * 5]
// new Array(2, 3, 4) 返回 [2, 3, 4] 传入参数个数不同，行为不同

/**
 * array-from-and-of
 */
// 由原先的 NodeList 转换为 Array
const todos = [...document.querySelectorAll("li")];
const names = todos.map(todo => todo.textContent);

// 扩展对象的属性
const favorites = {
  color: ["yellow", "blue"],
  fruits: ["banana", "mongo"]
};
const shoppingList = ["milk", ...favorites.fruits];

/**
 * spread-into-function
 */
fruit.push(newFruit); // 这种方式追加的是一整个数组，改变原数组
fruit.push(...newFruit); // 使用扩展运算符
fruit.push.apply(fruit, newFruit); // 把后一个数组的值依次push进前一个数组，使前一个数组发生改变，并且只能两个数组之间发生合并
const dateFields = [2019, 2, 3];
const date = new Date(dateFields[0], dateFields[1], dateFields[2]); // 原方法
const date2 = new Date(...dateFields); // 使用扩展运算符

/**
 * object-literal-upgrade
 */
const Jack = {
  // 原方法
  name: name,
  age: age,
  birthday: birthday,
  getName: function() {}
};
const Jack2 = {
  // ES6 属性简写（1）
  name,
  age,
  birthday,
  getName() {} // ES6 方法简写（2）
};
let id = 0;
userIds[`user-${++id}`] = id;
const userIds = {
  // 原方法
  "user-1": 1,
  "user-2": 2
};
const userIds2 = {
  // 使用 ES6 的计算属性简写（3）
  [`user-${++id}`]: id,
  [`user-${++id}`]: id
};
const keys = ["name", "age", "birthday"];
const values = ["Jack", 20, "2010-9"];
const Jack3 = {
  // 原方法
  [keys[0]]: values[0],
  [keys[1]]: values[1]
};
const Jack4 = {
  // ES6 方法
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift()
};

/**
 * promise-intro
 */
// ajax 请求返回的顺序是不定的
// 解决回调地狱：ES6 的 promise
const usersPromise = axios.get("http://api.github.com/users");
usersPromise
  .then(res => {
    user = res.data[0].login;
    return axios.get(`https://api.github.com/users/${user}/repos`);
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    // 监听错误
    console.log(err);
  });

/**
 * build-promise
 */
const p = new Promise((resolve, reject) => {
  resolve("successful"); // 成功则返回 successful
  setTimeout(() => {
    reject("find a error"); // 2s 后返回一个 error，但错误定位在 A 行
    reject(Error("find a error~")); // 这样写报错会定位在这一行
  }, 2000);
});

p.then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
}); // A 行

/**
 * promise-example
 */
const usersPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(["apple", "banana", "pear"]);
  }, 2000);
});

const moviesPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "okk", rating: 100, year: 2019 });
  }, 500);
});

// .all() 当所有的 promise 都完成后再调用后续方法，执行顺序与数组前后一致
Promise.all([usersPromise, moviesPromise])
  .then(res => {
    const [users, movies] = res;
  })
  .catch(Err => {
    console.log(err);
  });

// .race() 由第一个返回的 promise 结果决定
Promise.race([usersPromise, moviesPromise])
  .then(res => {
    const [users, movies] = res;
  })
  .catch(err => {
    console.log(err);
  });

/**
 * symbol
 */
const peter = Symbol("peter"); // 生成唯一标志，不可遍历
const classRoom = {
  mary: { grade: 85, gender: "female" },
  mary: { grade: 87, gender: "female" }, // 重名会覆盖前一个
  [Symbol("mary")]: { grade: 85, gender: "female" }, // 计算属性写法
  [Symbol("mary")]: { grade: 87, gender: "female" } // 避免覆盖
};
const sym1 = Object.getOwnPropertySymbols(classRoom); // 通过 getOwnPropertySymbols 获取
const sym2 = Object.getOwnPropertySymbols(classRoom).map(sym => classRoom[sym]); // 正确写法，必须通过 [sym] 获取
const sym3 = Object.getOwnPropertySymbols(classRoom).map(sym => classRoom.sym); // 错误写法，等同于 classRoom['sym']

/**
 * class
 */
// 函数方法存在提升，但 class 不存在函数提升
// 只能通过 new 关键字来调用一个类
let methodName = "info2";
class User {
  // 通过类的声明来定义一个类
  constructor(name, email) {
    // 构造函数
    this.name = name;
    this.age = age;
    this.githubName = githubName;
  } // ES6 的定义中此处不可以加逗号，否则报错
  info() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
  // 属性名可以通过计算属性来定义
  [methodName]() {
    console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
  }
  static description() {
    console.log("ok");
  }
  set github(value) {
    this.githubName = value;
  }
  get github() {
    return `my github is ${githubName}`;
  }
}

/**
 * extending-classes
 */
class Animal {
  constructor(name) {
    this.name = name;
    this.belly = [];
  }
  eat(food) {
    this.belly.push(food);
  }
}

// ES5 的写法：
function Dog(name, age) {
  Animal.call(this, name, age); // 先调用基类的构造函数
  this.name = name;
  this.age = age;
}
Dog.prototype = new Animal(); // 把 Dog 的原型对象指向了一个 Animal 实例
Dog.prototype.constructor = Dog; // 原型对象上的 constructor 仍然指向 Dog

// ES6 的写法：
class Dog extends Animal {
  constructor(name, age) {
    super(name); // super() 可以完成前面三句的操作
    this.age = age;
  }
  bark() {
    console.log(`bark bark~`);
  }
}

/**
 * extending-array
 */
// ES6 之前的继承机制：在子类构造函数内部，首先是由子类创建 this 的值。
// 即子类构造器内部的 this 值是指向 myArray 的实例
// 然后再调用基类的构造函数，Array 的其他属性会修饰 this 的值

// ES6 中 super() 创建的 this 值指向的是基类 Array
// 然后子类 myArray 在此基础上修改 this 值
// 因此这里的 this 是可以访问基类的各个功能的，而 ES6 之前不可以
class myArray extends Array {
  constructor() {
    super();
  }
}

/**
 * iterator
 */
// 遍历器是一个有 next() 方法的对象
const colors = ["red", "blue", "green"];
const iterator = colors[Symbol.iterator]();
iterator.next();

// ES6 中三种集合对象：Array、Map、Set

colors.entries(); // 对于数组：返回一个遍历器
colors.keys(); // 返回索引值
colors.values(); // 返回与 for-of 相同，元素的值

// 手写一个遍历器
Array.prototype.values = function() {
  let i = 0; // 记录当前元素的位置
  let items = this;
  return {
    next() {
      const done = i >= items.length; // 遍历是否已经结束
      const value = done ? undefined : items[i++]; // 当前元素的值
      return {
        value,
        done
      };
    }
  };
};

/**
 * generator
 */
// 生成器函数
function* listColors() {
  yield "red";
  yield "green";
  yield "blue";
}
function* loop(arr) {
  console.log(repos);
  for (const repo of repos) {
    yield repo;
  }
}

/**
 * using-gengerator-for-ajax-control
 */
let userName;
const usersPromise = axios.get("https://api.github.com/users");
usersPromise
  .then(res => {
    userName = res.data[0].login;
    return axios.get(`https://api.github.com/users/${userName}/repos`);
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.error(err);
  });

// 使用 generate 实现以上代码
function ajax(url) {
  axios.get(url).then(res => userGen.next(res.data));
}
function* steps() {
  const users = yield ajax("https://api.github.com/users");
  const firstUser = yield ajax(
    `https://api.github.com/users/${users[0].login}`
  );
  const followers = yield ajax(firstUser.followers_url);
}
const userGen = steps();
userGen.next();

/**
 * proxy
 */
const person = { name: "jack", age: 20 };

// Proxy(target, handler)
// 可以用来重新定义对象的一些方法
const personProxy = new Proxy(person, {
  get(target, key) {
    console.log("name:", target[key]);
  },
  set(target, key, value) {
    if (typeof value === "string") {
      target[key] = value.trim();
    }
  }
});

// 应用场景一：格式化
const numberHandler = {
  set(target, key, value) {
    target[key] = value.match(/[0-9]/g).join("");
  },
  get(target, key) {
    return target[key].replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
};
const number = new Proxy({}, numberHandler);

// 应用场景二：保护用户输入，避免属性名重复
const safeHandler = {
  set(target, key, value) {
    const likeKey = Object.keys(target).find(
      k => k.toLowerCase() === key.toLowerCase()
    );
    if (!(key in target) && likeKey) {
      throw new Error(
        `already have a property ${key} but with the case of ${likeKey}`
      );
      target[key] = value;
    }
  }
};
const safetyProxy = new Proxy({ id: 2 }, safeHandler);

/**
 * set
 */
// Set 中的元素都是唯一的
// 与数组的不同之处：不能通过索引获取元素

const colors = new Set();
colors.add("red");
colors.size; // 1
colors.delete("red"); // true
colors.has("red");
colors.clear();
colors.values();

// Set 的遍历方式一
for (let color of colors) {
  console.log(color);
}

// Set 的遍历方式二
colors.forEach((item, key, ownSet) => {
  console.log(item, key, ownSet);
});

// 用于数组去重
const numbers = new Set([1, 2, 3, 4, 4, 3, 5]);
const uniqueNumbers = [...numbers];

/**
 * weak-set
 */
// 元素只能是对象
// 不能通过 for-of 遍历
// 没有 forEach 方法
// 没有 clear 方法
// 有自动清理的机制，可以避免内存泄漏

const people = new WeakSet([jelly, jack]);
const peopleArr = [jelly, jack];
console.log(peopleArr);
jack = null;
console.log(peopleArr); // 此处输出时 jack 还在
// 已经删除 jack 但数组中还存在对它的引用，这是内存泄漏

/**
 * map
 */
// 相对于对象：key 可以是任意类型的数据
// 相比于 Set：存储的是键值对
const people = new Map();
people.set("jack", 23);

// Map 和 WeakMap 区别：
// WeakMap 没有 size 属性，不能循环，没有 clear 方法，key 必须是对象
// WeakMap 垃圾回收机制
const aMap = new Map();
const aWeakMap = new WeakMap();
aMap.size; // 1
aWeakMap.size; // undefined

// 1. key 是对象时，使用 WeakMap
// 2. 当数据不可用之后，相关的引用都会被自动回收，达到内存优化时，使用 WeakMap
// 3. 当需要数据循环或需要获取数量时，使用 Map
