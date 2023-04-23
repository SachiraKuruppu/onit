import React, { type ReactElement, useState } from "react";
import "./App.css";
import "reflect-metadata";
import { type IConcepts, TYPES, container } from "./services";
import { SearchBar } from "./components/search";
import { FourSquare } from "react-loading-indicators";

function App(): ReactElement {
  const [loading, setLoading] = useState(false);

  const writeResults = (results: string): void => {
    const resultsDiv = document.getElementById("results");
    if (resultsDiv !== null) {
      resultsDiv.innerText = results;
    }
  };

  const onSearchSubmit = (term: string): void => {
    const concepts = container.resolve<IConcepts>(TYPES.IConcept);

    writeResults("");
    setLoading(true);
    concepts.getConcepts(term)
      .then(jsonString => { writeResults(jsonString); })
      .catch((error: Error) => { writeResults(error.message); })
      .finally(() => { setLoading(false); });
  };

  return (
    <div className="App">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Find English Language Parent Concepts</h2>
      </div>
      <SearchBar onSubmit={onSearchSubmit}/>
      <div
        className="tl navy georgia ma5 pa3 ba b--dashed"
        style={{ whiteSpace: "pre-wrap" }}
      >
        <p id="results" />
        {loading && <FourSquare color="lightblue" />}
      </div>
    </div>
  );
}

export default App;
