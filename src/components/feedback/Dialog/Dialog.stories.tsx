// src/components/feedback/Dialog/Dialog.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"

import {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  type DialogProps,
} from "./index"
import { Button } from "../../actions/Button"

const meta = {
  title: "Feedback/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    open: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Button>Abrir Dialog</Button>,
    title: "Título do Dialog",
    description: "Esta é uma descrição do conteúdo do dialog.",
    children: (
      <p className="text-sm text-muted-foreground">
        Este é o conteúdo principal do dialog. Você pode colocar textos,
        formulários, listas ou qualquer outro componente aqui.
      </p>
    ),
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Cancelar</Button>
        <Button>Confirmar</Button>
      </div>
    ),
  } as DialogProps,
}

export const SemHeader: Story = {
  name: "Sem header (apenas conteúdo)",
  args: {
    trigger: <Button>Abrir Dialog</Button>,
    children: (
      <p className="text-sm">
        Este dialog não possui título nem descrição, apenas conteúdo livre.
      </p>
    ),
    footer: (
      <div className="flex gap-2 justify-end">
        <Button variant="outline">Fechar</Button>
      </div>
    ),
  } as DialogProps,
}

export const SemFooter: Story = {
  name: "Sem footer",
  args: {
    trigger: <Button>Abrir Dialog</Button>,
    title: "Dialog sem rodapé",
    description: "Este dialog não possui rodapé com ações.",
    children: (
      <p className="text-sm text-muted-foreground">
        O conteúdo pode ser fechado usando o botão X no canto superior direito.
      </p>
    ),
  } as DialogProps,
}

export const CustomizadoComPrimitivos: Story = {
  name: "Usando primitivos do Dialog",
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Usar Primitivos</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dialog Customizado</DialogTitle>
          <DialogDescription>
            Exemplo usando diretamente os primitivos do Dialog.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            Aqui você tem controle total sobre a estrutura do dialog,
            combinando os elementos conforme a necessidade.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
}

export const ComFormulario: Story = {
  name: "Dialog com formulário",
  render: () => (
    <Dialog
      trigger={<Button>Abrir Formulário</Button>}
      title="Criar novo item"
      description="Preencha os campos abaixo para criar um novo item."
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nome</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="Digite o nome"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Descrição</label>
          <textarea
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="Digite a descrição"
            rows={3}
          />
        </div>
      </div>
    </Dialog>
  ),
}

export const Confirmacao: Story = {
  name: "Dialog de confirmação",
  render: () => (
    <Dialog
      trigger={<Button variant="destructive">Excluir</Button>}
      title="Confirmar exclusão"
      description="Esta ação não pode ser desfeita. Tem certeza que deseja continuar?"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Excluir</Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">
        O item será permanentemente removido do sistema.
      </p>
    </Dialog>
  ),
}
