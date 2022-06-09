import { observer } from "mobx-react";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";

interface EnhancedTableToolbarProps {
  numSelected: number;
}

class EnhancedTableToolbar extends React.Component<EnhancedTableToolbarProps> {
  numSelected = this.props.numSelected;
  render() {
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(this.numSelected > 0 && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
          })
        }}
      >
        {this.numSelected > 0 ? (
          <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
            {this.numSelected} selected
          </Typography>
        ) : null}
      </Toolbar>
    );
  }
}

export default observer(EnhancedTableToolbar);
