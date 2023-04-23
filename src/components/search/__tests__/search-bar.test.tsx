import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "../search-bar";

test("should call the onsubmit function with the entered term", () => {
  const mockOnSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<SearchBar onSubmit={mockOnSubmit} />);

  const submitButton = getByText("Submit");
  const searchInput = getByPlaceholderText("Enter search term");
  fireEvent.change(searchInput, { target: { value: "ai" } });
  fireEvent.click(submitButton);

  expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  expect(mockOnSubmit).toHaveBeenCalledWith("ai");
});
