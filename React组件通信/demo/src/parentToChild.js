import React from "react";

// 父组件
class App extends React.Component {
  render() {
    return <Child name="我是父组件来的内容～" />;
  }
}

// 子组件
function Child(props) {
  return <div>我是子组件～{props.name}</div>;
}

export default App;
