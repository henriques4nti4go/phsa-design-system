import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MaskInput } from "../mask-input";

describe("MaskInput", () => {
  const defaultProps = {
    options: {
      mask: "000.000.000-00",
    },
    name: "cpf",
    label: "CPF",
  };

  it("should render correctly", () => {
    render(<MaskInput {...defaultProps} />);

    expect(screen.getByTestId("input-base-cpf")).toBeInTheDocument();
    expect(screen.getByTestId("input-wrapper-cpf")).toBeInTheDocument();
    expect(screen.getByTestId("input-cpf")).toBeInTheDocument();
    expect(screen.getByText("CPF")).toBeInTheDocument();
  });

  it("should apply mask when typing", async () => {
    const user = userEvent.setup();
    render(<MaskInput {...defaultProps} />);

    const input = screen.getByTestId("input-cpf");
    await user.type(input, "12345678900");

    expect(input).toHaveValue("123.456.789-00");
  });

  it("should call onChange with masked value", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<MaskInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByTestId("input-cpf");
    await user.type(input, "12345678900");

    expect(onChange).toHaveBeenCalled();
  });

  it("should render with error state", () => {
    render(<MaskInput {...defaultProps} error="Invalid CPF" />);

    expect(screen.getByText("Invalid CPF")).toBeInTheDocument();
  });

  it("should render with description", () => {
    render(<MaskInput {...defaultProps} description="Enter your CPF number" />);

    expect(screen.getByText("Enter your CPF number")).toBeInTheDocument();
  });

  it("should render with custom component", () => {
    render(
      <MaskInput
        {...defaultProps}
        component={<span data-testid="custom-component">Custom</span>}
      />
    );

    expect(screen.getByTestId("custom-component")).toBeInTheDocument();
  });
});
