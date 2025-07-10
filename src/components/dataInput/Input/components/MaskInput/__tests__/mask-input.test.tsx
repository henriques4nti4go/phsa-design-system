import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MaskInput } from "../mask-input";

describe("MaskInput", () => {
  it("should render label", () => {
    render(
      <MaskInput label="test" data-testid="mask-input" mask="000.000.000-00" />
    );
    const label = screen.getByTestId("mask-input-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("test");
  });

  it("should render error", () => {
    render(
      <MaskInput error="test" data-testid="mask-input" mask="000.000.000-00" />
    );
    const error = screen.getByTestId("mask-input-error-label");
    expect(error).toBeInTheDocument();
    expect(error).toHaveTextContent("test");
  });

  it("should be disabled", () => {
    render(
      <MaskInput disabled data-testid="mask-input" mask="000.000.000-00" />
    );
    const input = screen.getByTestId("mask-input");
    expect(input).toBeDisabled();
  });

  it("should be required", () => {
    render(
      <MaskInput
        required
        data-testid="mask-input"
        label="test"
        mask="000.000.000-00"
      />
    );
    const label = screen.getByTestId("mask-input-label");
    expect(label).toHaveTextContent("test *");
  });

  it("should apply mask to input value", async () => {
    render(<MaskInput data-testid="mask-input" mask="000.000.000-00" />);
    const input = screen.getByTestId("mask-input");

    fireEvent.focus(input);
    fireEvent.input(input, { target: { value: "12345678901" } });

    expect(input).toHaveValue("123.456.789-01");
  });

  it("should handle placeholder", () => {
    render(
      <MaskInput
        data-testid="mask-input"
        mask="000.000.000-00"
        placeholder="Digite seu CPF"
      />
    );
    const input = screen.getByTestId("mask-input");

    expect(input).toHaveAttribute("placeholder", "Digite seu CPF");
  });

  it("should handle name attribute", () => {
    render(
      <MaskInput data-testid="mask-input" mask="000.000.000-00" name="cpf" />
    );
    const input = screen.getByTestId("mask-input");

    expect(input).toHaveAttribute("name", "cpf");
  });
});
