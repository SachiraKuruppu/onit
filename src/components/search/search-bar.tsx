import React, { type ChangeEvent, useState, type ReactElement } from "react";

interface SearchBarProps {
  onSubmit: (searchTerm: string, limit: number, maxLevels: number) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps): ReactElement => {
  const [searchField, setSearchField] = useState("");
  const [limit, setLimit] = useState(100);
  const [maxLevel, setMaxLevel] = useState(10);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchField(e.target.value);
  };

  const submitSearch = (): void => {
    onSubmit(searchField, limit, maxLevel);
  };

  return (
        <section className="garamond">
            <div className="flex justify-center">
                <div className="pa1">
                    <input
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                        type="search"
                        placeholder="Enter search term"
                        onChange={handleChange}
                    />
                </div>
                <button
                  className="f4 grow no-underline br-pill ph4 ma3 dib black bg-lightest-blue"
                  onClick={submitSearch}
                >
                  Submit
                </button>
            </div>
            <div className="flex justify-center">
              <p className="pr3">Limit:</p>
              <input
                className="pr3"
                type="text"
                id="limit"
                value={limit}
                onChange={(e) => { setLimit(+e.target.value); }}
              />
              <p className="pr3 pl3">Max Levels:</p>
              <input
                className="pr3"
                type="text"
                id="maxLevels"
                value={maxLevel}
                onChange={(e) => { setMaxLevel(+e.target.value); }}
              />
            </div>
        </section>
  );
};
