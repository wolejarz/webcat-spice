import { observer } from "mobx-react";
import React from "react";
import mainStore from "../stores/MainStore";

interface FilterOverlayInterface {
  columnIndex: number;
}

class FilterOverlay extends React.Component<FilterOverlayInterface> {
  render() {
    return (
      <div className="info-bar">
        <div className="statistics">XXXXX</div>
      </div>
    );
  }
}

export default observer(FilterOverlay);
