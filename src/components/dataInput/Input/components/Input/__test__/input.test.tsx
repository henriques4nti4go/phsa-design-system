import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Input } from "..";

describe("Input", () => {
  it("should render the input", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
