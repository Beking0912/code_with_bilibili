const Promise = require("./promise3");

let p1 = new Promise((resolve, reject) => {
  resolve("成功了");
});

let p2 = new Promise((resolve, reject) => {
  resolve("success");
});

let p3 = new Promise((resolve, reject) => {
  reject("失败");
});

Promise.all([p1, p2])
  .then(result => {
    console.log(result); // ['成功了', 'success']
  })
  .catch(error => {
    console.log(error);
  });

Promise.all([p1, p3, p2])
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error); // '失败'
  });

//   let p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('success')
//     },1000)
//   })

//   let p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('failed')
//     }, 500)
//   })

//   Promise.race([p1, p2]).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)  // 'failed'
//   })
