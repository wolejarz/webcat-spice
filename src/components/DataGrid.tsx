import { configure } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import mainStore from "../stores/MainStore";
import EnhancedTableHead from "./EnhancedTableHead";

configure({ enforceActions: "always" });

class DataGrid extends React.Component {
  handleRequestSort = (event: React.MouseEvent<unknown>, columnName) => {
    const isAsc = mainStore.orderedByColumn === columnName && mainStore.orderDirection === "asc";
    mainStore.setOrderDirection(isAsc ? "desc" : "asc");
    mainStore.setOrderedByColumn(columnName);
  };

  handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    mainStore.currentPage.forEach(row => {
      mainStore.toggleSelection(row);
    });
  };

  handleSelectRow = (event: React.ChangeEvent<HTMLInputElement>, row) => {
    console.log("select row handler", row);
    mainStore.toggleSelection(row);
  };

  isSelected = row => {
    return true;
  };

  handleClick = (event: React.MouseEvent<unknown>, row) => {};

  handleChangePage = (event: unknown, newPage: number) => {
    mainStore.setPageNr(newPage);
  };

  handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    mainStore.setPageSize(parseInt(event.target.value, 10));
    //setPage(0);
  };

  render() {
    const emptyRows = mainStore.currentPage.length === 0 || mainStore.pageSize === 0;
    const dataRows = mainStore.dataIsLoaded
      ? mainStore.currentPage.map((row, rowIndex) => {
          const isItemSelected = row.isSelected;
          const labelId = `enhanced-table-checkbox-${rowIndex}`;
          const rowCells = mainStore.columnsOnCurrentPage.map(columnIndex => (
            <TableCell key={uuidv4()} style={{ whiteSpace: "nowrap" }} align="right">
              {row.dataRow[columnIndex]}
            </TableCell>
          ));
          return (
            <TableRow
              hover
              onClick={event => this.handleClick(event, row)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={uuidv4()}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  onChange={event => this.handleSelectRow(event, row)}
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </TableCell>
              {rowCells}
            </TableRow>
          );
        })
      : null;
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            {mainStore.dataIsLoaded ? (
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  numSelected={mainStore.currentPage.length}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                />
                <TableBody>
                  {dataRows}
                  {emptyRows && (
                    <TableRow
                      style={{
                        height: "53px"
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : null}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mainStore.filteredDataRows.length}
            rowsPerPage={mainStore.pageSize}
            page={mainStore.pageNr}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangePageSize}
          />
        </Paper>
      </Box>
    );
  }
}
export default observer(DataGrid);
