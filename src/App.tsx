import React, { type ReactElement } from "react";
import "./App.css";
import "reflect-metadata";
import { type IConcepts, TYPES, container } from "./services";
import { SearchBar } from "./components/search/search-bar";

function App(): ReactElement {
  const writeResults = (results: string): void => {
    const resultsDiv = document.getElementById("results");
    if (resultsDiv !== null) {
      resultsDiv.innerText = results;
    }
  };

  const onSearchSubmit = (term: string): void => {
    const concepts = container.resolve<IConcepts>(TYPES.IConcept);
    concepts.getConcepts(term)
      .then(jsonString => { writeResults(jsonString); })
      .catch((error: Error) => { writeResults(error.message); });
  };

  return (
    <div className="App">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Find English Language Parent Concepts</h2>
      </div>
      <SearchBar onSubmit={onSearchSubmit}/>
      <div
        className="tl navy georgia ma5 pa3 ba b--dashed"
        id="results"
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}

export default App;
