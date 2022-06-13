import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import mainStore from "../stores/MainStore";

class FilterOverlay extends React.Component {
  render() {
    return (
      <Fragment>
        <TextField id="min-value" label="MinValue" variant="outlined" />
        <TextField id="max-value" label="MaxValue" variant="outlined" />
      </Fragment>
    );
  }
}

export default observer(FilterOverlay);
