import { observer } from "mobx-react";
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";

import mainStore from "../stores/MainStore";

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

class EnhancedTableHead extends React.Component<EnhancedTableProps> {
  render() {
    const orderDirection = mainStore.orderDirection;
    const orderedByColumn = mainStore.orderedByColumn;
    const rowCount = mainStore.currentPage.length;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      this.props.onRequestSort(event, property);
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
              <TableSortLabel
                active={orderedByColumn === mainStore.columnDefinitions[index].name}
                direction={orderedByColumn === mainStore.columnDefinitions[index].name ? orderDirection : "asc"}
                onClick={createSortHandler(mainStore.columnDefinitions[index].name)}
              ></TableSortLabel>
              {mainStore.columnDefinitions[index].name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

export default observer(EnhancedTableHead);
