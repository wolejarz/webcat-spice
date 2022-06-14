import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import mainStore from "../stores/MainStore";

class FilterOverlay extends React.Component {
  handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("minvalue changed before:", mainStore.columnDefinitions[mainStore.filterColumnIndex].minValue);
    mainStore.columnDefinitions[mainStore.filterColumnIndex].minValue = event.target.value;
    console.log("minvalue changed afte:", mainStore.columnDefinitions[mainStore.filterColumnIndex].minValue);
  };

  handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    mainStore.columnDefinitions[mainStore.filterColumnIndex].maxValue = event.target.value;
  };

  render() {
    const index = mainStore.filterColumnIndex;
    console.log("index from render", index);
    return (
      <Fragment>
        <TextField
          id="min-value"
          value={mainStore.columnDefinitions[index].minValue}
          onChange={this.handleMinValueChange}
          label="MinValue"
          variant="outlined"
          size="small"
        />
        <TextField
          id="max-value"
          value={mainStore.columnDefinitions[index].maxValue}
          onChange={this.handleMaxValueChange}
          label="MaxValue"
          variant="outlined"
          size="small"
        />
      </Fragment>
    );
  }
}

export default observer(FilterOverlay);
