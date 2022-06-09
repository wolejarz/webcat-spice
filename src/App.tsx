import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import DataGrid from "./components/DataGrid";
import InfoBar from "./components/InfoBar";
import MenuBar from "./components/MenuBar";
import { fetchDataFromFile, fetchDefinitionsFromFile } from "./utilities/Utilities";
import mainStore from "./stores/MainStore";

class App extends React.Component {
  async componentDidMount() {
    if (!mainStore.dataFetchingHasStarted) {
      mainStore.dataFetchingHasStarted = true;
      const columnDefinitions = await fetchDefinitionsFromFile("http://localhost:3000/data/keyword_info.json");
      await fetchDataFromFile("http://localhost:3000/data/spice_catalog.txt", columnDefinitions);
      mainStore.setDataIsLoaded(true);
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <header>
            <h1 className="main-title">WEBCAT/SPICE</h1>
          </header>
          <nav>
            <MenuBar />
            <InfoBar />
          </nav>
          <main>
            <DataGrid />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
