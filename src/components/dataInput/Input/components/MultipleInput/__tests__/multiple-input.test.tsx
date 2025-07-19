import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MultipleInput } from "../MultipleInput";

describe("MultipleInput", () => {
  it("should render label", () => {
    render(
      <MultipleInput
        label="test"
        name="test-input"
        data-testid="multiple-input"
      />
    );
    const label = screen.getByTestId("multiple-input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("test");
  });

  it("should render error", () => {
    render(
      <MultipleInput
        error="test"
        name="test-input"
        data-testid="multiple-input"
      />
    );
    const error = screen.getByTestId("multiple-input-error-label");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("test");
  });

  it("should be disabled", () => {
    render(
      <MultipleInput disabled name="test-input" data-testid="multiple-input" />
    );
    const input = screen.getByTestId("multiple-input");
    expect(input).toBeDisabled();
  });

  it("should be required", () => {
    render(
      <MultipleInput
        required
        name="test-input"
        label="test"
        data-testid="multiple-input"
      />
    );
    const label = screen.getByTestId("multiple-input-label");
    expect(label).toHaveTextContent("test *");
  });

  it("should change value", () => {
    render(<MultipleInput name="test-input" data-testid="multiple-input" />);
    const input = screen.getByTestId("multiple-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  it("should render add button", () => {
    render(<MultipleInput name="test-input" data-testid="multiple-input" />);
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
  });

  it("should add item when add button is clicked", () => {
    const mockOnChangeData = jest.fn();
    render(
      <MultipleInput
        name="test-input"
        data-testid="multiple-input"
        onChangeData={mockOnChangeData}
      />
    );

    const input = screen.getByTestId("multiple-input");
    const addButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test item" } });
    fireEvent.click(addButton);

    expect(mockOnChangeData).toHaveBeenCalledWith(["test item"]);
  });

  it("should render with initial data", () => {
    const initialData = ["item 1", "item 2"];
    const mockOnChangeData = jest.fn();

    render(
      <MultipleInput
        name="test-input"
        data={initialData}
        onChangeData={mockOnChangeData}
        data-testid="multiple-input"
      />
    );

    expect(mockOnChangeData).not.toHaveBeenCalled();
  });

  it("should handle mask prop", () => {
    render(
      <MultipleInput
        name="test-input"
        mask="(99) 99999-9999"
        data-testid="multiple-input"
      />
    );

    const input = screen.getByTestId("multiple-input");
    expect(input).toBeInTheDocument();
  });
});
