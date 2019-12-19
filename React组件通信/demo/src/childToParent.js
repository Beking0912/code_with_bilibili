import React from "react";

// 父组件
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  // 自定义的回调事件
  childValue = data => {
    this.setState({ data });
  };

  render() {
    return (
      <div>
        子组件传递过来的值：{this.state.data}
        <Child transferValue={this.childValue} />
      </div>
    );
  }
}

// 子组件
class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: "" };
  }

  valueChange = data => {
    // 保证子组件中的值和传递过去的值一致
    this.setState({ data: data.target.value });
    // 触发回调 传递给父组件
    this.props.transferValue(data.target.value);
  };

  render() {
    return (
      <div>
        子组件： <input vlaue={this.state.data} onChange={this.valueChange} />
      </div>
    );
  }
}

export default App;
