import React, { type ChangeEvent, useState, type ReactElement } from "react";

interface SearchBarProps {
  onSubmit: (searchTerm: string) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps): ReactElement => {
  const [searchField, setSearchField] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchField(e.target.value);
  };

  const submitSearch = (): void => {
    onSubmit(searchField);
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
        </section>
  );
};
