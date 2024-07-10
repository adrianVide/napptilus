import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("Renders Header title/subtitle", () => {
  const mockSearchTerm = "test";
  const mockSetSearchTerm = jest.fn();

  render(<Header searchTerm={mockSearchTerm} setSearchTerm={mockSetSearchTerm} />);

  expect(screen.getByText("Find your Oompa Loompa")).toBeInTheDocument();
  expect(screen.getByText("There are more than 100k")).toBeInTheDocument();
});
