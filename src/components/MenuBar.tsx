import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { ThemeProvider } from "@mui/material/styles";
import { buttonTheme } from "../utilities/MUIDeclarations";

class MenuBar extends React.Component {
  render() {
    const columnNames = [];
    //   mainStore.columnsOnCurrentPage.map(columnIdx => ({
    //   label: mainStore.columnDefinitions[columnIdx].name,
    //   name: mainStore.columnDefinitions[columnIdx].name
    // }));
    const sortOrder = [
      { label: "Ascending", direction: "asc" },
      { label: "Descending", direction: "desc" }
    ];
    return (
      <div className="menu-bar">
        <ThemeProvider theme={buttonTheme}>
          <Button variant="contained" aria-label="exit" size="large" color="neutral">
            Exit
          </Button>
          <Button variant="contained" aria-label="call procedure" size="large" color="neutral">
            Call procedure:
          </Button>
          <Autocomplete
            disablePortal
            id="sort-column-box"
            options={columnNames}
            sx={{ width: 220 }}
            renderInput={params => <TextField {...params} label="Sorted by:" />}
          />
          <Autocomplete
            id="sort-direction-box"
            options={sortOrder}
            sx={{ width: 180 }}
            renderInput={params => <TextField {...params} label="Sort direction:" />}
          />
        </ThemeProvider>
      </div>
    );
  }
}

export default MenuBar;
