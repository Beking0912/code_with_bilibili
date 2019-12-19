import React from "react";
import { EventEmitter } from "events";

const emitter = new EventEmitter();

// 组件A
class ComponentA extends React.Component {
  constructor(props) {
    super(props);
    this.state = { msg: "" };
  }
  componentDidMount() {
    // 组件挂载完毕的时候注册事件
    this.eventEmitter = emitter.addListener("outputValue", msg => {
      this.setState({ msg });
    });
  }
  componentWillUnMount() {
    // 组件销毁之前移除事件
    emitter.removeListener(this.eventEmitter);
  }
  render() {
    return (
      <div>
        这是组件A
        <div>组件B传递过来的数据：{this.state.msg}</div>
      </div>
    );
  }
}

// 组件B
class ComponentB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  valueChange = data => {
    this.setState({
      value: data.target.value
    });
  };
  btnClick = () => {
    // 触发自定义事件
    emitter.emit("outputValue", this.state.value);
  };
  render() {
    return (
      <div>
        这是组件B
        <input value={this.state.value} onChange={this.valueChange}></input>
        <button onClick={this.btnClick}>点击我传递信息</button>
      </div>
    );
  }
}

export default ComponentA;
export default ComponentB;
