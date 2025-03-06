import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../index";
import { FormProvider, useForm } from "react-hook-form";

// Componente wrapper para testar o Input dentro de um formulário
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Componente Input", () => {
  it("deve renderizar com label", () => {
    render(
      <FormWrapper>
        <Input label="Nome" name="name" />
      </FormWrapper>
    );

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("deve renderizar sem formulário quando withoutForm é true", () => {
    render(<Input label="Email" name="email" withoutForm={true} />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando fornecida", () => {
    render(
      <FormWrapper>
        <Input label="Senha" name="password" error="Senha é obrigatória" />
      </FormWrapper>
    );

    expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
  });

  it("deve aplicar data-testid quando fornecido", () => {
    render(
      <FormWrapper>
        <Input label="Telefone" name="phone" data-testid="phone-input" />
      </FormWrapper>
    );

    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
  });

  it("deve lidar corretamente com a entrada do usuário", async () => {
    const user = userEvent.setup();

    render(
      <FormWrapper>
        <Input label="Usuário" name="username" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Usuário");
    await user.type(input, "testuser");

    expect(input).toHaveValue("testuser");
  });

  it("deve passar props adicionais para o elemento input", () => {
    render(
      <FormWrapper>
        <Input
          label="Código"
          name="code"
          placeholder="Digite o código"
          maxLength={6}
        />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Código");
    expect(input).toHaveAttribute("placeholder", "Digite o código");
    expect(input).toHaveAttribute("maxLength", "6");
  });

  it("deve chamar o onChange quando usado sem formulário", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    render(
      <Input
        label="Comentário"
        name="comment"
        withoutForm={true}
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText("Comentário");
    await user.type(input, "a");

    expect(handleChange).toHaveBeenCalled();
  });
});
