import React, { memo }  from "react";
import Selection from "./component/Selection";
import './styles.css'

function App() {
  var data = [];
  for (var i = 0; i < 33; i++) {
    data.push(<SelectionItem key={i} data={i} />);
  }
  return <Selection>{data}</Selection>;
}

export default App;

const SelectionItem = memo(({ key, data }) => {
  var className = "item noselect";
  // className += isSelected ? " selected" : "";
  return <div className={className}>Item {data+1}</div>;
})