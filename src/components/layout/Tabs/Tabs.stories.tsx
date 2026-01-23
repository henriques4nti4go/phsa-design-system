// src/components/layout/Tabs/Tabs.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { User, Settings, Mail, Bell, FileText } from "lucide-react"
import { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent } from "./index"
import { Button } from "../../actions/Button"

const meta = {
  title: "Layout/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        value: "tab1",
        label: "Tab 1",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 1</h3>
            <p className="text-sm text-muted-foreground">
              Este é o conteúdo da primeira tab. Você pode colocar qualquer conteúdo aqui.
            </p>
          </div>
        ),
      },
      {
        value: "tab2",
        label: "Tab 2",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 2</h3>
            <p className="text-sm text-muted-foreground">
              Este é o conteúdo da segunda tab.
            </p>
          </div>
        ),
      },
      {
        value: "tab3",
        label: "Tab 3",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 3</h3>
            <p className="text-sm text-muted-foreground">
              Este é o conteúdo da terceira tab.
            </p>
          </div>
        ),
      },
    ],
  },
}

export const ComIcones: Story = {
  name: "Com ícones",
  args: {
    items: [
      {
        value: "profile",
        label: "Perfil",
        icon: <User className="h-4 w-4" />,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Perfil do Usuário</h3>
            <p className="text-sm text-muted-foreground">
              Informações do perfil do usuário.
            </p>
          </div>
        ),
      },
      {
        value: "settings",
        label: "Configurações",
        icon: <Settings className="h-4 w-4" />,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Configurações</h3>
            <p className="text-sm text-muted-foreground">
              Ajustes e preferências do sistema.
            </p>
          </div>
        ),
      },
      {
        value: "notifications",
        label: "Notificações",
        icon: <Bell className="h-4 w-4" />,
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Notificações</h3>
            <p className="text-sm text-muted-foreground">
              Gerenciar notificações e alertas.
            </p>
          </div>
        ),
      },
    ],
  },
}

export const ComBadges: Story = {
  name: "Com badges",
  args: {
    items: [
      {
        value: "inbox",
        label: "Caixa de Entrada",
        icon: <Mail className="h-4 w-4" />,
        badge: (
          <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
            5
          </span>
        ),
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Caixa de Entrada</h3>
            <p className="text-sm text-muted-foreground">Você tem 5 mensagens não lidas.</p>
          </div>
        ),
      },
      {
        value: "drafts",
        label: "Rascunhos",
        icon: <FileText className="h-4 w-4" />,
        badge: (
          <span className="ml-1 rounded-full bg-muted text-muted-foreground text-xs px-2 py-0.5">
            2
          </span>
        ),
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Rascunhos</h3>
            <p className="text-sm text-muted-foreground">Você tem 2 rascunhos salvos.</p>
          </div>
        ),
      },
      {
        value: "sent",
        label: "Enviados",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Mensagens Enviadas</h3>
            <p className="text-sm text-muted-foreground">Histórico de mensagens enviadas.</p>
          </div>
        ),
      },
    ],
  },
}

export const ComTabDesabilitada: Story = {
  name: "Com tab desabilitada",
  args: {
    items: [
      {
        value: "tab1",
        label: "Tab Ativa",
        content: (
          <div className="p-4">
            <p className="text-sm">Esta tab está ativa e funcional.</p>
          </div>
        ),
      },
      {
        value: "tab2",
        label: "Tab Desabilitada",
        disabled: true,
        content: (
          <div className="p-4">
            <p className="text-sm">Esta tab está desabilitada.</p>
          </div>
        ),
      },
      {
        value: "tab3",
        label: "Tab Ativa 2",
        content: (
          <div className="p-4">
            <p className="text-sm">Outra tab ativa.</p>
          </div>
        ),
      },
    ],
  },
}

export const Vertical: Story = {
  name: "Orientação vertical",
  args: {
    orientation: "vertical",
    items: [
      {
        value: "tab1",
        label: "Tab 1",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 1</h3>
            <p className="text-sm text-muted-foreground">
              Tabs verticais são úteis para layouts com mais espaço horizontal.
            </p>
          </div>
        ),
      },
      {
        value: "tab2",
        label: "Tab 2",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 2</h3>
            <p className="text-sm text-muted-foreground">
              O conteúdo pode ser mais extenso em tabs verticais.
            </p>
          </div>
        ),
      },
      {
        value: "tab3",
        label: "Tab 3",
        content: (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Conteúdo da Tab 3</h3>
            <p className="text-sm text-muted-foreground">
              Ideal para painéis laterais e configurações.
            </p>
          </div>
        ),
      },
    ],
  },
}

export const Controlado: Story = {
  name: "Controlado externamente",
  render: () => {
    const [value, setValue] = React.useState("tab1")

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setValue("tab1")}>
            Ir para Tab 1
          </Button>
          <Button size="sm" onClick={() => setValue("tab2")}>
            Ir para Tab 2
          </Button>
          <Button size="sm" onClick={() => setValue("tab3")}>
            Ir para Tab 3
          </Button>
        </div>
        <Tabs
          value={value}
          onValueChange={setValue}
          items={[
            {
              value: "tab1",
              label: "Tab 1",
              content: (
                <div className="p-4">
                  <p className="text-sm">Tab controlada externamente - Tab 1</p>
                </div>
              ),
            },
            {
              value: "tab2",
              label: "Tab 2",
              content: (
                <div className="p-4">
                  <p className="text-sm">Tab controlada externamente - Tab 2</p>
                </div>
              ),
            },
            {
              value: "tab3",
              label: "Tab 3",
              content: (
                <div className="p-4">
                  <p className="text-sm">Tab controlada externamente - Tab 3</p>
                </div>
              ),
            },
          ]}
        />
        <p className="text-sm text-muted-foreground">
          Tab ativa: <strong>{value}</strong>
        </p>
      </div>
    )
  },
}

export const ComConteudoComplexo: Story = {
  name: "Com conteúdo complexo",
  args: {
    items: [
      {
        value: "overview",
        label: "Visão Geral",
        icon: <FileText className="h-4 w-4" />,
        content: (
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Visão Geral</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium mb-1">Total de Vendas</p>
                <p className="text-2xl font-bold">R$ 12.450,00</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm font-medium mb-1">Pedidos</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        value: "analytics",
        label: "Análises",
        icon: <Settings className="h-4 w-4" />,
        content: (
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Análises</h3>
            <p className="text-sm text-muted-foreground">
              Gráficos e métricas detalhadas apareceriam aqui.
            </p>
          </div>
        ),
      },
      {
        value: "reports",
        label: "Relatórios",
        icon: <FileText className="h-4 w-4" />,
        badge: (
          <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
            Novo
          </span>
        ),
        content: (
          <div className="p-6 space-y-4">
            <h3 className="text-xl font-semibold">Relatórios</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Relatório Mensal
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Relatório Anual
              </Button>
            </div>
          </div>
        ),
      },
    ],
  },
}

export const UsandoPrimitivos: Story = {
  name: "Usando primitivos",
  render: () => (
    <TabsRoot defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">
          <p className="text-sm">Conteúdo da Tab 1 usando primitivos.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">
          <p className="text-sm">Conteúdo da Tab 2 usando primitivos.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">
          <p className="text-sm">Conteúdo da Tab 3 usando primitivos.</p>
        </div>
      </TabsContent>
    </TabsRoot>
  ),
}

export const DefaultValue: Story = {
  name: "Com valor padrão",
  args: {
    defaultValue: "tab2",
    items: [
      {
        value: "tab1",
        label: "Tab 1",
        content: (
          <div className="p-4">
            <p className="text-sm">Esta não é a tab padrão.</p>
          </div>
        ),
      },
      {
        value: "tab2",
        label: "Tab 2 (Padrão)",
        content: (
          <div className="p-4">
            <p className="text-sm">Esta tab é aberta por padrão.</p>
          </div>
        ),
      },
      {
        value: "tab3",
        label: "Tab 3",
        content: (
          <div className="p-4">
            <p className="text-sm">Esta também não é a tab padrão.</p>
          </div>
        ),
      },
    ],
  },
}
