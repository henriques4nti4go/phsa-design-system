import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NumberInput } from "../number-input";

describe("NumberInput", () => {
  it("should render label", () => {
    render(<NumberInput label="test" data-testid="number-input" />);
    const label = screen.getByTestId("number-input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("test");
  });

  it("should render error", () => {
    render(<NumberInput error="test" data-testid="number-input" />);
    const error = screen.getByTestId("number-input-error-label");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("test");
  });

  it("should be disabled", () => {
    render(<NumberInput disabled data-testid="number-input" />);
    const input = screen.getByTestId("number-input");
    expect(input).toBeDisabled();
  });

  it("should be required", () => {
    render(<NumberInput required data-testid="number-input" label="test" />);
    const label = screen.getByTestId("number-input-label");
    expect(label).toHaveTextContent("test *");
  });

  it("should handle placeholder", () => {
    render(
      <NumberInput data-testid="number-input" placeholder="Digite um número" />
    );
    const input = screen.getByTestId("number-input");

    expect(input).toHaveAttribute("placeholder", "Digite um número");
  });

  it("should handle name attribute", () => {
    render(<NumberInput data-testid="number-input" name="amount" />);
    const input = screen.getByTestId("number-input");

    expect(input).toHaveAttribute("name", "amount");
  });

  it("should format numbers with thousands separator", async () => {
    const user = userEvent.setup();
    render(<NumberInput data-testid="number-input" thousandSeparator={true} />);
    const input = screen.getByTestId("number-input");

    await user.type(input, "1234567");

    expect(input).toHaveValue("1,234,567");
  });

  it("should format currency values", async () => {
    const user = userEvent.setup();
    render(
      <NumberInput
        data-testid="number-input"
        thousandSeparator={true}
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale={true}
      />
    );
    const input = screen.getByTestId("number-input");

    await user.type(input, "1234.56");

    expect(input).toHaveValue("R$ 1,234.56");
  });

  it("should limit decimal places", async () => {
    const user = userEvent.setup();
    render(<NumberInput data-testid="number-input" decimalScale={2} />);
    const input = screen.getByTestId("number-input");

    await user.type(input, "123.456789");

    expect(input).toHaveValue("123.45");
  });

  it("should handle percentage format", async () => {
    const user = userEvent.setup();
    render(
      <NumberInput data-testid="number-input" suffix="%" decimalScale={2} />
    );
    const input = screen.getByTestId("number-input");

    await user.type(input, "15.75");

    expect(input).toHaveValue("15.75%");
  });

  it("should call onChange with synthetic event", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(
      <NumberInput
        data-testid="number-input"
        onChange={mockOnChange}
        name="testInput"
      />
    );
    const input = screen.getByTestId("number-input");

    await user.type(input, "123");

    expect(mockOnChange).toHaveBeenCalled();
    const lastCall =
      mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0];
    expect(lastCall.target.name).toBe("testInput");
    expect(lastCall.target.value).toBe("123");
  });

  it("should call onValueChange with formatted data", async () => {
    const user = userEvent.setup();
    const mockOnValueChange = jest.fn();
    render(
      <NumberInput
        data-testid="number-input"
        onValueChange={mockOnValueChange}
        thousandSeparator={true}
      />
    );
    const input = screen.getByTestId("number-input");

    await user.type(input, "1234");

    expect(mockOnValueChange).toHaveBeenCalled();
    const lastCall =
      mockOnValueChange.mock.calls[mockOnValueChange.mock.calls.length - 1][0];
    expect(lastCall.value).toBe("1234");
    expect(lastCall.floatValue).toBe(1234);
    expect(lastCall.formattedValue).toBe("1,234");
  });

  it("should handle negative numbers", async () => {
    const user = userEvent.setup();
    render(<NumberInput data-testid="number-input" allowNegative={true} />);
    const input = screen.getByTestId("number-input");

    await user.type(input, "-123");

    expect(input).toHaveValue("-123");
  });

  it("should prevent negative numbers when allowNegative is false", async () => {
    const user = userEvent.setup();
    render(<NumberInput data-testid="number-input" allowNegative={false} />);
    const input = screen.getByTestId("number-input");

    await user.type(input, "-123");

    expect(input).toHaveValue("123");
  });

  it("should handle controlled value", () => {
    render(<NumberInput data-testid="number-input" value="1000" />);
    const input = screen.getByTestId("number-input");

    expect(input).toHaveValue("1000");
  });

  it("should handle empty value", () => {
    render(<NumberInput data-testid="number-input" value="" />);
    const input = screen.getByTestId("number-input");

    expect(input).toHaveValue("");
  });
});
