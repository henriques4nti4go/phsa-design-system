import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from "../index";

describe("Input", () => {
  it("should render label", () => {
    render(<Input label="test" data-testid="input" />);
    const label = screen.getByTestId("input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("test");
  });

  it("should render error", () => {
    render(<Input error="test" data-testid="input" />);
    const error = screen.getByTestId("input-error-label");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("test");
  });

  it("should is disabled", () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input).toBeDisabled();
  });

  it("should is required", () => {
    render(<Input required data-testid="input" label="test" />);
    const label = screen.getByTestId("input-label");
    expect(label).toHaveTextContent("test *");
  });

  it("should change value", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });
});
