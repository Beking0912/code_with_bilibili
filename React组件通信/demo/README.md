## [父 -> 子](src/parentToChild.js) 
## [子 -> 父](src/childToParent.js)
## [跨级组件通信](src/context.js)
## [非嵌套组件通信]
- 找到组件共同的父组件 (可以参考这个 评论组件既有父子组件通信也有兄弟组件通信)
- 利用 Context API 进行通信，创建一个 全局 可访问的值
- [利用 events 创建自定义事件](src/App.js)