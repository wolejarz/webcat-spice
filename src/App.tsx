import React from "react";
import "./App.css";
import TestComponent from "./components/Test";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TestComponent />
      </React.Fragment>
    );
  }
}

export default App;
