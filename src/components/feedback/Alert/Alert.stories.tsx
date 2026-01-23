// src/components/feedback/Alert/Alert.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { Alert, AlertRoot, AlertTitle, AlertDescription } from "./index"
import { Button } from "../../actions/Button"

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
    dismissible: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Atenção",
    description: "Esta é uma mensagem de alerta padrão.",
  },
}

export const Destructive: Story = {
  name: "Variante Destrutiva",
  args: {
    variant: "destructive",
    title: "Erro",
    description: "Ocorreu um erro ao processar sua solicitação.",
  },
}

export const Success: Story = {
  name: "Variante Sucesso",
  args: {
    variant: "success",
    title: "Sucesso!",
    description: "Operação realizada com sucesso.",
  },
}

export const Warning: Story = {
  name: "Variante Aviso",
  args: {
    variant: "warning",
    title: "Aviso",
    description: "Verifique os dados antes de continuar.",
  },
}

export const Info: Story = {
  name: "Variante Informação",
  args: {
    variant: "info",
    title: "Informação",
    description: "Esta é uma mensagem informativa.",
  },
}

export const SemTitulo: Story = {
  name: "Sem título",
  args: {
    description: "Este alerta não possui título, apenas descrição.",
  },
}

export const SemDescricao: Story = {
  name: "Sem descrição",
  args: {
    title: "Apenas título",
  },
}

export const ComConteudoCustomizado: Story = {
  name: "Com conteúdo customizado",
  render: () => (
    <Alert variant="info" title="Informação importante">
      <AlertDescription>
        Este alerta contém conteúdo customizado além da descrição padrão.
      </AlertDescription>
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="outline">
          Saiba mais
        </Button>
        <Button size="sm">Entendi</Button>
      </div>
    </Alert>
  ),
}

export const Dismissible: Story = {
  name: "Com botão de fechar",
  args: {
    variant: "warning",
    title: "Alerta descartável",
    description: "Este alerta pode ser fechado clicando no botão X.",
    dismissible: true,
  },
}

export const ComIconeCustomizado: Story = {
  name: "Com ícone customizado",
  render: () => (
    <Alert
      variant="success"
      icon={<span className="text-2xl">🎉</span>}
      title="Parabéns!"
      description="Você completou todas as tarefas."
    />
  ),
}

export const UsandoPrimitivos: Story = {
  name: "Usando primitivos",
  render: () => (
    <AlertRoot variant="default">
      <AlertTitle>Alert usando primitivos</AlertTitle>
      <AlertDescription>
        Quando precisar de mais controle, use os componentes primitivos diretamente.
      </AlertDescription>
    </AlertRoot>
  ),
}

export const Variantes: Story = {
  name: "Todas as variantes",
  render: () => (
    <div className="space-y-4">
      <Alert variant="default" title="Padrão" description="Mensagem padrão." />
      <Alert variant="destructive" title="Erro" description="Mensagem de erro." />
      <Alert variant="success" title="Sucesso" description="Mensagem de sucesso." />
      <Alert variant="warning" title="Aviso" description="Mensagem de aviso." />
      <Alert variant="info" title="Informação" description="Mensagem informativa." />
    </div>
  ),
}

export const ComAcoes: Story = {
  name: "Com ações",
  render: () => (
    <Alert
      variant="info"
      title="Nova atualização disponível"
      description="Uma nova versão do sistema está disponível."
    >
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="outline">
          Ver detalhes
        </Button>
        <Button size="sm">Atualizar agora</Button>
      </div>
    </Alert>
  ),
}

export const LongoTexto: Story = {
  name: "Texto longo",
  args: {
    variant: "warning",
    title: "Aviso importante",
    description:
      "Este é um exemplo de alerta com texto longo. O componente se adapta automaticamente ao conteúdo, quebrando linhas conforme necessário para garantir uma boa legibilidade em todos os dispositivos.",
  },
}
