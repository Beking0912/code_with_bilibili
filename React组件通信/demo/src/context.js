import React from "react";

// 创建一个Context对象
const InitContext = React.createContext();

class App extends React.Component {
  render() {
    return (
      // 使用一个 Provider 来将当前的 context 传递给以下的组件树
      <InitContext.Provider value="我来自app">
        <Child />
      </InitContext.Provider>
    );
  }
}

function Child(props) {
  return <LastComponent />;
}

class LastComponent extends React.Component {
  // 指定 contextType 读取当前的  context
  static contextType = InitContext;
  render() {
    return <div>我来自LastComponent: {this.context}</div>;
  }
}

export default App;
