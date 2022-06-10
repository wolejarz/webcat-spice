import { TextField } from "@mui/material";
import { observer } from "mobx-react";
import React, { Fragment } from "react";
import mainStore from "../stores/MainStore";

interface FilterOverlayInterface {
  columnIndex: number;
}

class FilterOverlay extends React.Component<FilterOverlayInterface> {
  render() {
    return (
      <Fragment>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Fragment>
    );
  }
}

export default observer(FilterOverlay);
