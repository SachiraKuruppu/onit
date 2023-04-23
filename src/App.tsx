import React, { type ReactElement } from "react";
import "./App.css";
import "reflect-metadata";
import { SearchBar } from "./components/search/search-bar";

function App(): ReactElement {
  return (
    <div className="App">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Find English Language Parent Concepts</h2>
      </div>
      <SearchBar onSubmit={searchTerm => { console.log(searchTerm); }}/>
      <div
        className="tl navy georgia ma5 pa3 grow ba b--dashed"
        id="results"
      />
    </div>
  );
}

export default App;
