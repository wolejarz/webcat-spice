import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import mainStore from "../stores/MainStore";

class FilterOverlay extends React.Component {
  handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFilter = mainStore.columnDefinitions[mainStore.filterColumnIndex].filter;
    currentFilter.setValues(event.target.value, "", "");
  };

  handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFilter = mainStore.columnDefinitions[mainStore.filterColumnIndex].filter;
    currentFilter.setValues("", event.target.value, "");
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
