// src/components/feedback/Sonner/Sonner.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"

import { Toaster, toast } from "./index"
import { Button } from "../../actions/Button"

const meta = {
  title: "Feedback/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
    },
    richColors: {
      control: "boolean",
    },
    closeButton: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Toaster Component",
  render: (args) => (
    <div className="space-y-4">
      <Toaster {...args} />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast("Notificação padrão")}>
          Toast Padrão
        </Button>
        <Button onClick={() => toast.success("Operação realizada com sucesso!")}>
          Toast de Sucesso
        </Button>
        <Button onClick={() => toast.error("Erro ao processar requisição")}>
          Toast de Erro
        </Button>
        <Button onClick={() => toast.warning("Atenção: verifique os dados")}>
          Toast de Aviso
        </Button>
        <Button onClick={() => toast.info("Informação importante")}>
          Toast Informativo
        </Button>
      </div>
    </div>
  ),
  args: {
    position: "bottom-right",
  },
}

export const ComDescricao: Story = {
  name: "Toast com Descrição",
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            toast.success("Perfil atualizado", {
              description: "Suas alterações foram salvas com sucesso.",
            })
          }
        >
          Sucesso com Descrição
        </Button>
        <Button
          onClick={() =>
            toast.error("Falha na conexão", {
              description: "Não foi possível conectar ao servidor. Tente novamente.",
            })
          }
        >
          Erro com Descrição
        </Button>
        <Button
          onClick={() =>
            toast("Nova mensagem", {
              description: "Você tem uma nova mensagem na sua caixa de entrada.",
            })
          }
        >
          Padrão com Descrição
        </Button>
      </div>
    </div>
  ),
}

export const ComAcao: Story = {
  name: "Toast com Ação",
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            toast("Item removido", {
              description: "O item foi removido da lista.",
              action: {
                label: "Desfazer",
                onClick: () => toast.success("Ação desfeita!"),
              },
            })
          }
        >
          Toast com Ação
        </Button>
        <Button
          onClick={() =>
            toast.error("Erro ao enviar", {
              description: "Não foi possível enviar o formulário.",
              action: {
                label: "Tentar novamente",
                onClick: () => toast.loading("Tentando novamente..."),
              },
            })
          }
        >
          Erro com Ação
        </Button>
      </div>
    </div>
  ),
}

export const Loading: Story = {
  name: "Toast de Carregamento",
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            const toastId = toast.loading("Carregando dados...")
            setTimeout(() => {
              toast.dismiss(toastId)
              toast.success("Dados carregados com sucesso!")
            }, 2000)
          }}
        >
          Loading → Success
        </Button>
        <Button
          onClick={() => {
            const toastId = toast.loading("Processando...")
            setTimeout(() => {
              toast.dismiss(toastId)
              toast.error("Falha ao processar")
            }, 2000)
          }}
        >
          Loading → Error
        </Button>
      </div>
    </div>
  ),
}

export const Promise: Story = {
  name: "Toast com Promise",
  render: () => {
    const saveData = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve("Dados salvos!") : reject("Erro ao salvar")
        }, 2000)
      })

    const fetchData = () =>
      new Promise((resolve) => {
        setTimeout(() => resolve("Dados carregados!"), 1500)
      })

    return (
      <div className="space-y-4">
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            onClick={() =>
              toast.promise(saveData(), {
                loading: "Salvando dados...",
                success: "Dados salvos com sucesso!",
                error: "Erro ao salvar dados",
              })
            }
          >
            Promise (Sucesso/Erro)
          </Button>
          <Button
            onClick={() =>
              toast.promise(fetchData(), {
                loading: "Carregando...",
                success: "Dados carregados!",
                error: "Erro ao carregar",
              })
            }
          >
            Promise (Sempre Sucesso)
          </Button>
        </div>
      </div>
    )
  },
}

export const Customizado: Story = {
  name: "Toast Customizado",
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            toast.custom((t) => (
              <div className="flex items-center gap-2 bg-background border rounded-lg p-4 shadow-lg">
                <span>Toast customizado com JSX</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.dismiss(t)}
                >
                  Fechar
                </Button>
              </div>
            ))
          }
        >
          Toast Customizado
        </Button>
        <Button
          onClick={() =>
            toast("Toast com ícone customizado", {
              icon: "🎉",
            })
          }
        >
          Toast com Ícone
        </Button>
        <Button
          onClick={() =>
            toast.success("Toast com duração customizada", {
              duration: 10000,
            })
          }
        >
          Toast Longo (10s)
        </Button>
      </div>
    </div>
  ),
}

export const Posicoes: Story = {
  name: "Diferentes Posições",
  render: () => (
    <div className="space-y-4">
      <Toaster position="top-left" />
      <Toaster position="top-center" />
      <Toaster position="top-right" />
      <Toaster position="bottom-left" />
      <Toaster position="bottom-center" />
      <Toaster position="bottom-right" />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast("Top Left", { position: "top-left" })}>
          Top Left
        </Button>
        <Button onClick={() => toast("Top Center", { position: "top-center" })}>
          Top Center
        </Button>
        <Button onClick={() => toast("Top Right", { position: "top-right" })}>
          Top Right
        </Button>
        <Button onClick={() => toast("Bottom Left", { position: "bottom-left" })}>
          Bottom Left
        </Button>
        <Button onClick={() => toast("Bottom Center", { position: "bottom-center" })}>
          Bottom Center
        </Button>
        <Button onClick={() => toast("Bottom Right", { position: "bottom-right" })}>
          Bottom Right
        </Button>
      </div>
    </div>
  ),
}
