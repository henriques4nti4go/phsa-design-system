import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Input } from "../index";

describe("Input", () => {
  it("should render", () => {
    render(<Input />);
  });
});
