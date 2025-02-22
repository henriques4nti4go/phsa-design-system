import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NumberInput } from "../number-input";
import userEvent from "@testing-library/user-event";

describe("NumberInput", () => {
  it("deve renderizar o input com label", () => {
    render(<NumberInput label="Valor" data-testid="test" />);

    expect(screen.getByTestId("test-number-input")).toBeInTheDocument();
  });

  it("deve renderizar a descrição quando fornecida", () => {
    render(<NumberInput description="Digite um número" />);

    expect(screen.getByText("Digite um número")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando fornecida", () => {
    render(<NumberInput error="Valor inválido" />);

    expect(screen.getByText("Valor inválido")).toBeInTheDocument();
  });

  it("deve chamar onValueChange com o valor numérico correto", async () => {
    const onValueChange = jest.fn();
    render(<NumberInput onChange={onValueChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "123.45");

    expect(onValueChange).toHaveBeenCalledWith(123.45);
  });

  it("deve aceitar apenas números e separador decimal", async () => {
    const onValueChange = jest.fn();
    render(<NumberInput onChange={onValueChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "abc123.45def");

    expect(input).toHaveValue("123.45");
  });

  it("deve renderizar componente adicional quando fornecido", () => {
    render(
      <NumberInput
        component={<button data-testid="extra-component">Extra</button>}
      />
    );

    expect(screen.getByTestId("extra-component")).toBeInTheDocument();
  });

  it("deve aplicar className customizada", () => {
    render(<NumberInput className="custom-class" />);

    expect(
      screen.getByRole("textbox").parentElement?.parentElement
    ).toHaveClass("custom-class");
  });

  it("deve formatar o valor inicial corretamente", () => {
    render(
      <NumberInput
        value={1234.56}
        data-testid="test"
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
      />
    );

    expect(screen.getByTestId("test-number-input")).toHaveValue("1.234,56");
  });

  it("deve formatar o valor conforme digitação", async () => {
    const user = userEvent.setup();
    render(
      <NumberInput
        data-testid="test"
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
      />
    );

    const input = screen.getByTestId("test-number-input");
    await user.type(input, "123456");

    expect(input).toHaveValue("123.456,00");
  });
});
