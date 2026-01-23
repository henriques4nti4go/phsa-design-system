"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { 
  Button, 
  Card, 
  Input, 
  TextArea, 
  Select, 
  RadioGroup, 
  Switch 
} from "@/components";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  estado: string;
  genero: string;
  descricao: string;
  notificacoes: boolean;
  newsletter: boolean;
}

export default function Home() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      notificacoes: false,
      newsletter: false,
    }
  });
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    console.log("Dados do formulário:", data);
  };

  return (
    <div className="flex w-full justify-center flex-col items-center min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-2xl">
        <Card
          title="Formulário de Cadastro"
          description="Preencha os campos abaixo com suas informações"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nome completo"
                placeholder="Digite seu nome"
                description="Informe seu nome completo"
                {...register("nome", { 
                  required: "Nome é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Nome deve ter pelo menos 3 caracteres"
                  }
                })}
                error={errors.nome?.message}
              />

              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                description="Informe um e-mail válido"
                {...register("email", { 
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido"
                  }
                })}
                error={errors.email?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                description="Informe seu telefone com DDD"
                {...register("telefone", { 
                  required: "Telefone é obrigatório"
                })}
                error={errors.telefone?.message}
              />

              <Controller
                name="estado"
                control={control}
                rules={{ required: "Estado é obrigatório" }}
                render={({ field, fieldState }) => (
                  <Select
                    label="Estado"
                    placeholder="Selecione seu estado"
                    description="Selecione o estado onde você reside"
                    options={[
                      { value: "sp", label: "São Paulo" },
                      { value: "rj", label: "Rio de Janeiro" },
                      { value: "mg", label: "Minas Gerais" },
                      { value: "rs", label: "Rio Grande do Sul" },
                      { value: "pr", label: "Paraná" },
                      { value: "sc", label: "Santa Catarina" },
                      { value: "ba", label: "Bahia" },
                      { value: "go", label: "Goiás" },
                    ]}
                    searchable
                    value={field.value}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <Controller
              name="genero"
              control={control}
              rules={{ required: "Gênero é obrigatório" }}
              render={({ field, fieldState }) => (
                <RadioGroup
                  label="Gênero"
                  description="Selecione seu gênero"
                  options={[
                    { value: "masculino", label: "Masculino" },
                    { value: "feminino", label: "Feminino" },
                    { value: "outro", label: "Outro" },
                    { value: "prefiro-nao-dizer", label: "Prefiro não dizer" },
                  ]}
                  orientation="horizontal"
                  value={field.value}
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <TextArea
              label="Descrição"
              placeholder="Conte-nos um pouco sobre você..."
              description="Máximo de 500 caracteres"
              rows={4}
              {...register("descricao", { 
                maxLength: {
                  value: 500,
                  message: "Descrição deve ter no máximo 500 caracteres"
                }
              })}
              error={errors.descricao?.message}
            />

            <div className="space-y-4">
              <Controller
                name="notificacoes"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Receber notificações por e-mail"
                    description="Você receberá atualizações importantes por e-mail"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    labelPosition="right"
                  />
                )}
              />

              <Controller
                name="newsletter"
                control={control}
                render={({ field }) => (
                  <Switch
                    label="Assinar newsletter"
                    description="Receba nosso newsletter semanal com novidades"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    labelPosition="right"
                  />
                )}
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setFormData(null);
                  window.location.reload();
                }}
              >
                Limpar
              </Button>
              <Button type="submit">
                Enviar Formulário
              </Button>
            </div>
          </form>
        </Card>

        {formData && (
          <Card
            title="Dados Enviados"
            description="Confira os dados que foram enviados"
            className="mt-6"
          >
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}
