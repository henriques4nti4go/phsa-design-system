import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { InputBase, CustomInputProps } from "..";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

describe("InputBase", () => {
  const MockInput = (props: CustomInputProps) => (
    <input
      data-testid="mock-input"
      {...props}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );

  it("deve renderizar sem contexto de formulário", () => {
    render(<InputBase data-testid="test">{() => <MockInput />}</InputBase>);
    expect(screen.getByTestId("mock-input")).toBeInTheDocument();
  });

  it("deve renderizar label e descrição", () => {
    render(
      <InputBase
        label="Test Label"
        description="Test Description"
        data-testid="test"
      >
        {() => <MockInput />}
      </InputBase>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("deve mostrar indicador de obrigatório quando required é true", () => {
    render(
      <InputBase label="Test Label" required data-testid="test">
        {() => <MockInput />}
      </InputBase>
    );

    expect(screen.getByText("Test Label *")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro", () => {
    render(
      <InputBase error="Test Error" data-testid="test">
        {() => <MockInput />}
      </InputBase>
    );

    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  it("deve funcionar com contexto de formulário", () => {
    const TestForm = () => {
      const form = useForm();
      return (
        <Form {...form}>
          <InputBase name="test" data-testid="test">
            {() => <MockInput />}
          </InputBase>
        </Form>
      );
    };

    render(<TestForm />);
    expect(screen.getByTestId("mock-input")).toBeInTheDocument();
  });

  it("deve aplicar className customizada", () => {
    render(
      <InputBase className="custom-class" data-testid="test">
        {() => <MockInput />}
      </InputBase>
    );

    const container = screen.getByTestId("input-base-test");
    expect(container).toHaveClass("custom-class");
  });

  it("deve lidar com estado disabled", () => {
    render(
      <InputBase disabled data-testid="mock-input">
        {(props) => <MockInput {...props} />}
      </InputBase>
    );

    expect(screen.getByTestId("mock-input")).toBeDisabled();
  });

  it("deve validar erros do React Hook Form", async () => {
    const TestForm = () => {
      const form = useForm({
        defaultValues: {
          test: "",
        },
      });

      React.useEffect(() => {
        form.setError("test", { message: "Test Error" });
      }, [form]);

      return (
        <Form {...form}>
          <InputBase name="test" data-testid="mock-input" required>
            {(props) => <MockInput {...props} />}
          </InputBase>
        </Form>
      );
    };

    render(<TestForm />);

    const errorMessage = await screen.findByText("Test Error");
    expect(errorMessage).toBeInTheDocument();
  });
});
