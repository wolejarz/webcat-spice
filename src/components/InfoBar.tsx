import { observer } from "mobx-react";
import React from "react";
import mainStore from "../stores/MainStore";

class InfoBar extends React.Component {
  render() {
    return (
      <div className="info-bar">
        <div className="statistics">{mainStore.infoBarMessage}</div>
      </div>
    );
  }
}

export default observer(InfoBar);
