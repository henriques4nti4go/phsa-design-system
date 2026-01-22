# Padrão de Estrutura de Componentes

Este diretório é organizado em **camadas**, para separar claramente:

- **Primitivos de UI (shadcn)** – componentes internos, não exportados diretamente pela lib
- **Componentes do Design System (abstrações oficiais)** – API pública da biblioteca

---

## 1. `ui/` – Primitivos do shadcn

```
src/
  components/
    ui/
      button.tsx
      input.tsx
      card.tsx
      ...
```

### Regras

- Pasta **reservada exclusivamente para componentes gerados pelo shadcn CLI**
- Pode ter ajustes de:
  - Tema/estilo (classes Tailwind, variantes extras, tokens do design system)
  - Acessibilidade
  - Pequenas melhorias genéricas
- **NÃO** coloque lógica de negócio aqui
- **NÃO** exporte esta pasta diretamente no pacote (é detalhe de implementação)

---

## 2. Camada de Abstração – Componentes Oficiais do Design System

As abstrações que serão **exportadas pela lib** e documentadas no Storybook ficam fora de `ui/`.

Organizamos por contexto/categoria e **cada componente tem sua própria pasta**:

```
src/
  components/
    ui/
      button.tsx              # primitivo shadcn

    actions/
      Button/
        index.tsx             # implementação do Button oficial
        Button.stories.tsx    # Storybook
        Button.types.ts       # (opcional) tipos específicos
        Button.test.tsx       # (opcional) testes
        Button.styles.ts      # (opcional) estilos adicionais

    forms/
      FormField/
        index.tsx
        FormField.stories.tsx
        ...

    data-display/
      DataTable/
        index.tsx
        DataTable.stories.tsx
        ...
```

### Categorias Sugeridas

- **`actions/`** – botões, links de ação, ícones de ação, etc.
- **`forms/`** – campos de formulário compostos, validações, máscaras
- **`data-display/`** – tabelas, listas, chips, badges, etc.
- **`feedback/`** – alertas, toasts, modais, loaders
- **`layout/`** – grid, container, card composto, etc.

> **Regra de Ouro**: A API pública sempre vem dessa camada, **nunca** direto de `ui/`.

---

## 3. Estrutura de Pasta por Componente

Cada componente oficial deve ter sua própria pasta com a seguinte estrutura:

```
ComponentName/
  index.tsx              # implementação principal (obrigatório)
  ComponentName.stories.tsx  # Storybook (obrigatório)
  ComponentName.types.ts     # tipos específicos (opcional)
  ComponentName.test.tsx     # testes (opcional)
  ComponentName.styles.ts    # estilos adicionais (opcional)
```

### Exemplo: Button

```
actions/
  Button/
    index.tsx           # exporta o Button oficial
    Button.stories.tsx  # documentação no Storybook
```

O `index.tsx` pode simplesmente re-exportar o componente de `ui/` ou criar uma abstração:

```tsx
// src/components/actions/Button/index.tsx
import { Button as UIButton } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

export const Button = UIButton
export type { ButtonProps }
```

Ou criar uma abstração customizada:

```tsx
// src/components/actions/Button/index.tsx
import { Button as UIButton } from "@/components/ui/button"
import type { ButtonProps as UIButtonProps } from "@/components/ui/button"

export interface ButtonProps extends UIButtonProps {
  // props adicionais específicas do design system
}

export const Button = ({ ...props }: ButtonProps) => {
  // lógica customizada se necessário
  return <UIButton {...props} />
}
```

---

## 4. Exportações

As exportações seguem o fluxo hierárquico:

```
src/
  components/
    index.ts          # exporta todos os componentes oficiais
  index.ts            # exporta tudo da lib
```

### Exemplo de `components/index.ts`

```typescript
// src/components/index.ts
export * from "./actions/Button"
export * from "./forms/FormField"
export * from "./data-display/DataTable"
// ... outros componentes oficiais
```

### Exemplo de `src/index.ts`

```typescript
// src/index.ts
export * from "./components"
```

### Resultado

- `components/ui/*` continua como **infraestrutura interna** (shadcn)
- `components/*/<Componente>` é o que define **o contrato do design system**
- O consumidor importa sempre da lib, nunca de `ui`:

```typescript
// ✅ Correto
import { Button, FormField, DataTable } from "@phsa.tec/design-system-react"

// ❌ Errado (não expor ui/)
import { Button } from "@phsa.tec/design-system-react/ui/button"
```

---

## 5. Storybook

### Regras

- Stories devem ser criadas **junto da abstração**, não do primitivo
- Cada componente oficial tem sua story na mesma pasta
- O Storybook reflete **a API real do design system**, não os detalhes internos do shadcn

### Exemplo

```tsx
// src/components/actions/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./index"

const meta = {
  title: "Actions/Button",
  component: Button,
  // ...
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}
```

---

## 6. Fluxo de Trabalho

### Adicionando um novo componente do shadcn

1. Instalar via CLI:
   ```bash
   npx shadcn@latest add button
   ```
   → Cria em `components/ui/button.tsx`

2. Criar abstração oficial:
   ```
   components/actions/Button/
     index.tsx
     Button.stories.tsx
   ```

3. Exportar em `components/index.ts`:
   ```typescript
   export * from "./actions/Button"
   ```

4. Documentar no Storybook (já criado em `Button.stories.tsx`)

---

## Resumo Visual

```
components/
├── ui/                          # 🔒 Interno (shadcn)
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
│
├── actions/                     # 🌐 Público (Design System)
│   └── Button/
│       ├── index.tsx            # usa ui/button
│       └── Button.stories.tsx
│
├── forms/                       # 🌐 Público
│   └── FormField/
│       ├── index.tsx            # usa ui/input + ui/label
│       └── FormField.stories.tsx
│
└── index.ts                     # exporta actions/, forms/, etc.
```

---

## Benefícios desta Estrutura

✅ **Separação clara** entre primitivos (shadcn) e abstrações (design system)  
✅ **Manutenibilidade** – atualizações do shadcn não quebram abstrações  
✅ **Escalabilidade** – fácil adicionar novos componentes  
✅ **Organização** – cada componente tem sua pasta com tudo relacionado  
✅ **Storybook limpo** – documenta apenas a API pública  
✅ **Compatibilidade** – shadcn CLI continua funcionando normalmente

---

**Última atualização**: 2024
