import { observer } from "mobx-react";
import React, { Fragment } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

import mainStore from "../stores/MainStore";
import FilterOverlay from "./FilterOverlay";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, columnName) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class EnhancedTableHead extends React.Component<EnhancedTableProps> {
  handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    mainStore.setFilterOverlayAnchorEl(mainStore.filterOverlayAnchorEl ? null : event.currentTarget);
  };

  render() {
    const orderDirection = mainStore.orderDirection;
    const orderedByColumn = mainStore.orderedByColumn;
    const rowCount = mainStore.currentPage.length;
    const open = Boolean(mainStore.filterOverlayAnchorEl);
    const id = open ? "simple-popper" : undefined;
    const renderHeaderBody = index => {
      return (
        <Fragment>
          <div>
            <TableSortLabel
              active={orderedByColumn === mainStore.columnDefinitions[index].name}
              direction={orderedByColumn === mainStore.columnDefinitions[index].name ? orderDirection : "asc"}
              onClick={event => this.props.onRequestSort(event, mainStore.columnDefinitions[index].name)}
            ></TableSortLabel>
            {mainStore.columnDefinitions[index].name}
          </div>
          <div>
            <button aria-describedby={id} type="button" onClick={this.handleFilterClick}>
              {`<212121221,1121221>`}
            </button>
            <Popper id={id} open={open} anchorEl={mainStore.filterOverlayAnchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                <FilterOverlay columnIndex={index} />
              </Box>
            </Popper>
          </div>
        </Fragment>
      );
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={this.props.numSelected > 0 && this.props.numSelected < rowCount}
              checked={rowCount > 0 && this.props.numSelected === rowCount}
              onChange={this.props.onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts"
              }}
            />
          </TableCell>
          {mainStore.columnsOnCurrentPage.map(index => (
            <TableCell key={mainStore.columnDefinitions[index].name} align={"left"}>
              {renderHeaderBody(index)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default observer(EnhancedTableHead);
