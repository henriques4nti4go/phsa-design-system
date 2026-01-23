// src/components/feedback/AlertDialog/AlertDialog.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"

import {
  AlertDialog,
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogProps,
} from "./index"
import { Button } from "../../actions/Button"

const meta = {
  title: "Feedback/AlertDialog",
  component: AlertDialog,
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
    actionLabel: {
      control: "text",
    },
    cancelLabel: {
      control: "text",
    },
    actionVariant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    showCancel: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Button>Abrir AlertDialog</Button>,
    title: "Confirmar ação",
    description: "Esta ação não pode ser desfeita. Tem certeza que deseja continuar?",
    actionLabel: "Confirmar",
    cancelLabel: "Cancelar",
  } as AlertDialogProps,
}

export const Destructive: Story = {
  name: "Ação destrutiva",
  args: {
    trigger: <Button variant="destructive">Excluir</Button>,
    title: "Confirmar exclusão",
    description: "Esta ação não pode ser desfeita. O item será permanentemente removido.",
    actionLabel: "Excluir",
    cancelLabel: "Cancelar",
    actionVariant: "destructive",
  } as AlertDialogProps,
}

export const SemCancelar: Story = {
  name: "Sem botão de cancelar",
  args: {
    trigger: <Button>Abrir</Button>,
    title: "Atenção",
    description: "Esta ação não pode ser cancelada.",
    actionLabel: "Entendi",
    showCancel: false,
  } as AlertDialogProps,
}

export const LabelsCustomizados: Story = {
  name: "Labels customizados",
  args: {
    trigger: <Button>Salvar</Button>,
    title: "Salvar alterações?",
    description: "Você tem alterações não salvas. Deseja salvá-las antes de sair?",
    actionLabel: "Salvar",
    cancelLabel: "Descartar",
  } as AlertDialogProps,
}

export const ComConteudoCustomizado: Story = {
  name: "Com conteúdo customizado",
  render: () => (
    <AlertDialog
      trigger={<Button>Abrir</Button>}
      title="Informação importante"
      description="Leia atentamente antes de continuar."
    >
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Este alert dialog contém conteúdo adicional além do título e descrição.
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Item 1: Verificação necessária</li>
          <li>Item 2: Confirmação obrigatória</li>
          <li>Item 3: Ação irreversível</li>
        </ul>
      </div>
    </AlertDialog>
  ),
}

export const FooterCustomizado: Story = {
  name: "Footer customizado",
  render: () => (
    <AlertDialog
      trigger={<Button>Abrir</Button>}
      title="Múltiplas opções"
      description="Escolha uma das opções abaixo."
      footer={
        <div className="flex gap-2 justify-end w-full">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="secondary">Opção 1</Button>
          </AlertDialogAction>
          <AlertDialogAction asChild>
            <Button>Opção 2</Button>
          </AlertDialogAction>
        </div>
      }
    />
  ),
}

export const UsandoPrimitivos: Story = {
  name: "Usando primitivos",
  render: () => (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <Button>Usar Primitivos</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AlertDialog Customizado</AlertDialogTitle>
          <AlertDialogDescription>
            Exemplo usando diretamente os primitivos do AlertDialog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <p className="text-sm">
            Aqui você tem controle total sobre a estrutura do alert dialog.
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button>Confirmar</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
}

export const ConfirmacaoExclusao: Story = {
  name: "Confirmação de exclusão",
  render: () => (
    <AlertDialog
      trigger={<Button variant="destructive">Excluir Item</Button>}
      title="Confirmar exclusão"
      description="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
      actionLabel="Excluir"
      actionVariant="destructive"
      onAction={() => {
        console.log("Item excluído")
      }}
    />
  ),
}

export const ConfirmacaoSalvamento: Story = {
  name: "Confirmação de salvamento",
  render: () => (
    <AlertDialog
      trigger={<Button>Salvar</Button>}
      title="Salvar alterações?"
      description="Você tem alterações não salvas. Deseja salvá-las antes de continuar?"
      actionLabel="Salvar"
      cancelLabel="Descartar"
      onAction={() => {
        console.log("Alterações salvas")
      }}
      onCancel={() => {
        console.log("Alterações descartadas")
      }}
    />
  ),
}

export const SemTitulo: Story = {
  name: "Sem título",
  args: {
    trigger: <Button>Abrir</Button>,
    description: "Este alert dialog não possui título, apenas descrição.",
    actionLabel: "OK",
    showCancel: false,
  } as AlertDialogProps,
}

export const SemDescricao: Story = {
  name: "Sem descrição",
  args: {
    trigger: <Button>Abrir</Button>,
    title: "Apenas título",
    actionLabel: "Confirmar",
  } as AlertDialogProps,
}

export const Controlado: Story = {
  name: "Controlado externamente",
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Abrir AlertDialog</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Fechar AlertDialog
          </Button>
        </div>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="AlertDialog Controlado"
          description="Este alert dialog é controlado externamente através de estado."
          actionLabel="Fechar"
          showCancel={false}
        />
      </div>
    )
  },
}
