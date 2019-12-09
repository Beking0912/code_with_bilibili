/**
 * 箭头函数的结构
 *
 * 不论是箭头函数还是 bind，每次被执行都返回的是一个新的函数引用。
 * 因此如果你还需要函数的引用去做一些别的事情(如卸载监听器)，那么你必须自己保存这个引用。
 */
() => 1;
v => v + 1;
(a, b) => a + b;
() => alert("foo");
e => {
  if (e == 0) {
    return 0;
  }
  return 1000 / e;
};

/**
 * 卸载监听器时的陷阱
 */

// 错误做法
class PauseMenu extends React.Component {
  componentWillMount() {
    AppStateIOS.addEventListener("change", this.onAppPaused.bind(this));
  }
  componentWillUnmount() {
    AppStateIOS.removeEventListener("change", this.onAppPaused.bind(this));
  }
  onAppPaused(event) {}
}

// 正确做法
class PauseMenu extends React.Component {
  constructor(props) {
    super(props);
    this._onAppPaused = this.onAppPaused.bind(this);
  }
  componentWillMount() {
    AppStateIOS.addEventListener("change", this._onAppPaused);
  }
  componentWillUnmount() {
    AppStateIOS.removeEventListener("change", this._onAppPaused);
  }
  onAppPaused(event) {}
}
// 其他方法
class PauseMenu extends React.Component {
  componentWillMount() {
    AppStateIOS.addEventListener("change", this.onAppPaused);
  }
  componentWillUnmount() {
    AppStateIOS.removeEventListener("change", this.onAppPaused);
  }
  onAppPaused = event => {
    //把函数直接作为一个arrow function的属性来定义，初始化的时候就绑定好了this指针
  };
}
