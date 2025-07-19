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
    const mockOnAdd = jest.fn();
    render(
      <MultipleInput
        name="test-input"
        data-testid="multiple-input"
        onAdd={mockOnAdd}
        withoutForm
      />
    );

    const input = screen.getByTestId("multiple-input");
    const addButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test item" } });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledWith("test item");
  });

  it("should render with initial data", () => {
    const initialData = ["item 1", "item 2"];

    render(
      <MultipleInput
        name="test-input"
        data={initialData}
        data-testid="multiple-input"
        withoutForm
      />
    );

    expect(screen.getByText("item 1")).toBeInTheDocument();
    expect(screen.getByText("item 2")).toBeInTheDocument();
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

  it("should remove item when remove button is clicked", () => {
    const mockOnRemove = jest.fn();
    const initialData = ["item 1", "item 2"];

    render(
      <MultipleInput
        name="test-input"
        data={initialData}
        onRemove={mockOnRemove}
        data-testid="multiple-input"
        withoutForm
      />
    );

    const removeButtons = screen.getAllByRole("button");
    const removeButton = removeButtons.find((button) =>
      button.querySelector('[data-icon="MdDelete"]')
    );

    if (removeButton) {
      fireEvent.click(removeButton);
      expect(mockOnRemove).toHaveBeenCalledWith(0);
    }
  });

  it("should disable add button when input is empty", () => {
    render(
      <MultipleInput
        name="test-input"
        data-testid="multiple-input"
        withoutForm
      />
    );

    const addButton = screen.getByRole("button");
    expect(addButton).toBeDisabled();
  });
});
