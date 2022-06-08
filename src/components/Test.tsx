import { autorun } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import mainStore from "../stores/MainStore";

class TestComponent extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      console.log("Starting ........................");

      autorun(() => {
        console.log("Total: " + mainStore.pageNr);
      });

      console.log(mainStore.pageNr);

      mainStore.setPageNr(5);

      mainStore.setPageNr(10);

      mainStore.setPageNr(15);
    }, 2000);
  }

  render() {
    return <div className="statistics">TEST component:{mainStore.pageNr} </div>;
  }
}

export default observer(TestComponent);
