import { observer } from "mobx-react";
import React from "react";
import mainStore from "../stores/MainStore";

class TestComponent extends React.Component {
  render() {
    return <div className="statistics">TEST component</div>;
  }
}

export default observer(TestComponent);
