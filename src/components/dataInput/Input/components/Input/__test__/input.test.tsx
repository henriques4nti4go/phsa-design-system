import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "..";
import { Form } from "../../../../../../components/ui/form";
import { useForm } from "react-hook-form";
import React from "react";

describe("Input", () => {
  it("deve renderizar o input corretamente", () => {
    render(<Input data-testid="test-input" />);
    expect(screen.getByTestId("input-test-input")).toBeInTheDocument();
  });

  it("deve renderizar com label e descrição", () => {
    render(
      <Input
        label="Username"
        description="Enter your username"
        data-testid="test-input"
      />
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
    expect(screen.getByTestId("input-test-input")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando fornecida", () => {
    render(
      <Input
        label="Username"
        error="This field is required"
        data-testid="test-input"
      />
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("deve chamar o manipulador onChange com o valor do input", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} data-testid="test-input" />);

    const input = screen.getByTestId("input-test-input");
    fireEvent.change(input, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalledWith("test value");
  });

  it("deve renderizar componente adicional quando fornecido", () => {
    render(
      <Input
        component={
          <div data-testid="additional-component">Extra Component</div>
        }
        data-testid="test-input"
      />
    );

    expect(screen.getByTestId("additional-component")).toBeInTheDocument();
  });

  it("deve funcionar dentro de um contexto de formulário", () => {
    const TestForm = () => {
      const form = useForm();
      return (
        <Form {...form}>
          <form>
            <Input name="test" data-testid="test-input" />
          </form>
        </Form>
      );
    };

    render(<TestForm />);
    expect(screen.getByTestId("input-test-input")).toBeInTheDocument();
  });

  it("deve aplicar className personalizada", () => {
    render(<Input className="custom-class" data-testid="test-input" />);

    const inputBase = screen.getByTestId("input-base-test-input");
    expect(inputBase).toHaveClass("custom-class");
  });

  it("deve encaminhar a ref corretamente", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="test-input" />);

    const input = screen.getByTestId("input-test-input");
    expect(input).toBe(ref.current);
  });
});
