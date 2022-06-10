import { observer } from "mobx-react";
import React, { Fragment } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";

import mainStore from "../stores/MainStore";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, columnName) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

class EnhancedTableHead extends React.Component<EnhancedTableProps> {
  render() {
    const orderDirection = mainStore.orderDirection;
    const orderedByColumn = mainStore.orderedByColumn;
    const rowCount = mainStore.currentPage.length;
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
          <div>{`{FILTER BUTTON}`}</div>
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
