// src/components/data-display/Typography/Typography.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  Ul,
  Ol,
  Li,
  Code,
  Pre,
  Lead,
  Large,
  Small,
  Muted,
  TypographyTable,
  TypographyThead,
  TypographyTbody,
  TypographyTr,
  TypographyTh,
  TypographyTd,
  Typography,
} from "./index"

const meta = {
  title: "Data Display/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["tight", "normal", "relaxed"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Headings: Story = {
  name: "Cabeçalhos (H1-H4)",
  render: () => (
    <div className="space-y-6">
      <H1>Heading 1 - Título Principal</H1>
      <H2>Heading 2 - Subtítulo</H2>
      <H3>Heading 3 - Seção</H3>
      <H4>Heading 4 - Subseção</H4>
    </div>
  ),
}

export const Paragraph: Story = {
  name: "Parágrafo",
  render: () => (
    <div className="space-y-4">
      <P>
        Este é um parágrafo padrão. Ele tem espaçamento adequado entre linhas e margem superior
        quando não é o primeiro elemento.
      </P>
      <P>
        Este é outro parágrafo. Observe como há espaçamento automático entre parágrafos para
        melhorar a legibilidade.
      </P>
    </div>
  ),
}

export const BlockquoteExample: Story = {
  name: "Blockquote",
  render: () => (
    <Blockquote>
      "A tipografia é a arte e técnica de organizar o tipo para tornar a linguagem escrita
      legível, legível e atraente quando exibida."
    </Blockquote>
  ),
}

export const Lists: Story = {
  name: "Listas",
  render: () => (
    <div className="space-y-6">
      <div>
        <H3>Lista não ordenada</H3>
        <Ul>
          <Li>Primeiro item</Li>
          <Li>Segundo item</Li>
          <Li>Terceiro item</Li>
        </Ul>
      </div>
      <div>
        <H3>Lista ordenada</H3>
        <Ol>
          <Li>Primeiro passo</Li>
          <Li>Segundo passo</Li>
          <Li>Terceiro passo</Li>
        </Ol>
      </div>
    </div>
  ),
}

export const CodeExample: Story = {
  name: "Código",
  render: () => (
    <div className="space-y-4">
      <P>
        Use <Code>código inline</Code> para destacar comandos ou valores em um texto.
      </P>
      <Pre>
        <code>{`function exemplo() {
  return "Código em bloco";
}`}</code>
      </Pre>
    </div>
  ),
}

export const TextVariants: Story = {
  name: "Variantes de texto",
  render: () => (
    <div className="space-y-4">
      <Lead>
        Este é um texto lead - usado para destacar informações importantes no início de uma
        seção.
      </Lead>
      <Large>Este é um texto large - maior e em negrito.</Large>
      <P>Este é um parágrafo normal.</P>
      <Small>Este é um texto small - menor e mais discreto.</Small>
      <Muted>Este é um texto muted - com cor mais suave para informações secundárias.</Muted>
    </div>
  ),
}

export const TableExample: Story = {
  name: "Tabela",
  render: () => (
    <TypographyTable>
      <TypographyThead>
        <TypographyTr>
          <TypographyTh>Nome</TypographyTh>
          <TypographyTh>Email</TypographyTh>
          <TypographyTh align="right">Idade</TypographyTh>
        </TypographyTr>
      </TypographyThead>
      <TypographyTbody>
        <TypographyTr>
          <TypographyTd>João Silva</TypographyTd>
          <TypographyTd>joao@example.com</TypographyTd>
          <TypographyTd align="right">30</TypographyTd>
        </TypographyTr>
        <TypographyTr>
          <TypographyTd>Maria Santos</TypographyTd>
          <TypographyTd>maria@example.com</TypographyTd>
          <TypographyTd align="right">25</TypographyTd>
        </TypographyTr>
        <TypographyTr>
          <TypographyTd>Pedro Costa</TypographyTd>
          <TypographyTd>pedro@example.com</TypographyTd>
          <TypographyTd align="right">35</TypographyTd>
        </TypographyTr>
      </TypographyTbody>
    </TypographyTable>
  ),
}

export const TypographyContainer: Story = {
  name: "Container Typography",
  render: () => (
    <Typography spacing="normal">
      <H1>Taxing Laughter: The Joke Tax Chronicles</H1>
      <Lead>
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
        on his throne.
      </Lead>
      <H2>The King's Plan</H2>
      <P>
        The king thought long and hard, and finally came up with a brilliant plan: he would tax the
        jokes in the kingdom.
      </P>
      <Blockquote>
        "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay
        for the privilege."
      </Blockquote>
      <H3>The Joke Tax</H3>
      <P>The king's subjects were not amused. They grumbled and complained, but the king was firm:</P>
      <Ul>
        <Li>1st level of puns: 5 gold coins</Li>
        <Li>2nd level of jokes: 10 gold coins</Li>
        <Li>3rd level of one-liners: 20 gold coins</Li>
      </Ul>
    </Typography>
  ),
}

export const SpacingVariants: Story = {
  name: "Variantes de espaçamento",
  render: () => (
    <div className="space-y-8">
      <div>
        <H3>Espaçamento Tight</H3>
        <Typography spacing="tight">
          <P>Parágrafo 1</P>
          <P>Parágrafo 2</P>
          <P>Parágrafo 3</P>
        </Typography>
      </div>
      <div>
        <H3>Espaçamento Normal</H3>
        <Typography spacing="normal">
          <P>Parágrafo 1</P>
          <P>Parágrafo 2</P>
          <P>Parágrafo 3</P>
        </Typography>
      </div>
      <div>
        <H3>Espaçamento Relaxed</H3>
        <Typography spacing="relaxed">
          <P>Parágrafo 1</P>
          <P>Parágrafo 2</P>
          <P>Parágrafo 3</P>
        </Typography>
      </div>
    </div>
  ),
}

export const AlignmentVariants: Story = {
  name: "Variantes de alinhamento",
  render: () => (
    <div className="space-y-8">
      <div>
        <H3>Alinhamento à esquerda</H3>
        <Typography align="left">
          <P>Este texto está alinhado à esquerda, que é o padrão para a maioria dos idiomas.</P>
        </Typography>
      </div>
      <div>
        <H3>Alinhamento centralizado</H3>
        <Typography align="center">
          <P>Este texto está centralizado, útil para títulos e chamadas de ação.</P>
        </Typography>
      </div>
      <div>
        <H3>Alinhamento à direita</H3>
        <Typography align="right">
          <P>Este texto está alinhado à direita, comum em alguns layouts.</P>
        </Typography>
      </div>
      <div>
        <H3>Justificado</H3>
        <Typography align="justify">
          <P>
            Este texto está justificado, onde as linhas são esticadas para preencher toda a largura
            do container. Útil para textos longos e formais.
          </P>
        </Typography>
      </div>
    </div>
  ),
}

export const CompleteExample: Story = {
  name: "Exemplo completo",
  render: () => (
    <Typography spacing="normal">
      <H1>Guia de Tipografia</H1>
      <Lead>
        Este é um exemplo completo de como usar os componentes de tipografia do design system.
      </Lead>

      <H2>Introdução</H2>
      <P>
        A tipografia é fundamental para criar interfaces claras e legíveis. Este design system
        fornece componentes padronizados para garantir consistência visual.
      </P>

      <H3>Hierarquia de Cabeçalhos</H3>
      <P>Use os cabeçalhos para criar uma hierarquia clara:</P>
      <Ul>
        <Li>
          <Code>H1</Code> - Título principal da página
        </Li>
        <Li>
          <Code>H2</Code> - Seções principais
        </Li>
        <Li>
          <Code>H3</Code> - Subseções
        </Li>
        <Li>
          <Code>H4</Code> - Subsubseções
        </Li>
      </Ul>

      <H3>Citações</H3>
      <Blockquote>
        "A tipografia existe para honrar o conteúdo." - Robert Bringhurst
      </Blockquote>

      <H3>Variantes de Texto</H3>
      <P>Use diferentes variantes para destacar informações:</P>
      <Ul>
        <Li>
          <Large>Large</Large> - Para títulos secundários
        </Li>
        <Li>
          <Small>Small</Small> - Para informações auxiliares
        </Li>
        <Li>
          <Muted>Muted</Muted> - Para texto secundário
        </Li>
      </Ul>

      <H2>Tabelas</H2>
      <TypographyTable>
        <TypographyThead>
          <TypographyTr>
            <TypographyTh>Componente</TypographyTh>
            <TypographyTh>Uso</TypographyTh>
            <TypographyTh align="right">Prioridade</TypographyTh>
          </TypographyTr>
        </TypographyThead>
        <TypographyTbody>
          <TypographyTr>
            <TypographyTd>H1</TypographyTd>
            <TypographyTd>Título principal</TypographyTd>
            <TypographyTd align="right">Alta</TypographyTd>
          </TypographyTr>
          <TypographyTr>
            <TypographyTd>P</TypographyTd>
            <TypographyTd>Parágrafos</TypographyTd>
            <TypographyTd align="right">Alta</TypographyTd>
          </TypographyTr>
          <TypographyTr>
            <TypographyTd>Code</TypographyTd>
            <TypographyTd>Código inline</TypographyTd>
            <TypographyTd align="right">Média</TypographyTd>
          </TypographyTr>
        </TypographyTbody>
      </TypographyTable>
    </Typography>
  ),
}
