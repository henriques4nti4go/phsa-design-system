// src/components/data-display/Typography/index.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Componente H1 padronizado.
 */
export const H1 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
)
H1.displayName = "H1"

/**
 * Componente H2 padronizado.
 */
export const H2 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
)
H2.displayName = "H2"

/**
 * Componente H3 padronizado.
 */
export const H3 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
)
H3.displayName = "H3"

/**
 * Componente H4 padronizado.
 */
export const H4 = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h4
      ref={ref}
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
)
H4.displayName = "H4"

/**
 * Componente de parágrafo padronizado.
 */
export const P = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  )
)
P.displayName = "P"

/**
 * Componente de blockquote padronizado.
 */
export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.BlockquoteHTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 pl-6 italic", className)}
    {...props}
  />
))
Blockquote.displayName = "Blockquote"

/**
 * Componente de lista não ordenada padronizada.
 */
export const Ul = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  )
)
Ul.displayName = "Ul"

/**
 * Componente de lista ordenada padronizada.
 */
export const Ol = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  )
)
Ol.displayName = "Ol"

/**
 * Componente de item de lista padronizado.
 */
export const Li = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
)
Li.displayName = "Li"

/**
 * Componente de código inline padronizado.
 */
export const Code = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
)
Code.displayName = "Code"

/**
 * Componente de código em bloco padronizado.
 */
export const Pre = React.forwardRef<HTMLPreElement, React.HTMLAttributes<HTMLPreElement>>(
  ({ className, ...props }, ref) => (
    <pre
      ref={ref}
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4",
        className
      )}
      {...props}
    />
  )
)
Pre.displayName = "Pre"

/**
 * Componente de texto lead (destaque) padronizado.
 */
export const Lead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
)
Lead.displayName = "Lead"

/**
 * Componente de texto large padronizado.
 */
export const Large = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
)
Large.displayName = "Large"

/**
 * Componente de texto small padronizado.
 */
export const Small = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <small ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
  )
)
Small.displayName = "Small"

/**
 * Componente de texto muted padronizado.
 */
export const Muted = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
Muted.displayName = "Muted"

/**
 * Componente de tabela padronizada para uso em tipografia.
 * Renomeado para TypographyTable para evitar conflito com Table do DataTable.
 */
export const TypographyTable = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="my-6 w-full overflow-y-auto">
      <table ref={ref} className={cn("w-full", className)} {...props} />
    </div>
  )
)
TypographyTable.displayName = "TypographyTable"

/**
 * Componente de cabeçalho de tabela padronizado para tipografia.
 */
export const TypographyThead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
))
TypographyThead.displayName = "TypographyThead"

/**
 * Componente de corpo de tabela padronizado para tipografia.
 */
export const TypographyTbody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
))
TypographyTbody.displayName = "TypographyTbody"

/**
 * Componente de linha de tabela padronizada para tipografia.
 */
export const TypographyTr = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("m-0 border-t p-0 even:bg-muted", className)} {...props} />
  )
)
TypographyTr.displayName = "TypographyTr"

/**
 * Componente de célula de cabeçalho de tabela padronizada para tipografia.
 */
export const TypographyTh = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right", className)}
    {...props}
  />
))
TypographyTh.displayName = "TypographyTh"

/**
 * Componente de célula de tabela padronizada para tipografia.
 */
export const TypographyTd = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right", className)}
    {...props}
  />
))
TypographyTd.displayName = "TypographyTd"

/**
 * Componente Typography - Container para agrupar elementos tipográficos.
 *
 * Útil para aplicar estilos consistentes a um bloco de texto.
 */
export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variante de espaçamento entre elementos.
   * @default "normal"
   */
  spacing?: "tight" | "normal" | "relaxed"
  /**
   * Alinhamento do texto.
   */
  align?: "left" | "center" | "right" | "justify"
}

export const Typography = React.forwardRef<HTMLDivElement, TypographyProps>(
  ({ className, spacing = "normal", align, ...props }, ref) => {
    const spacingClasses = {
      tight: "space-y-2",
      normal: "space-y-4",
      relaxed: "space-y-6",
    }

    return (
      <div
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          align && `text-${align}`,
          className
        )}
        {...props}
      />
    )
  }
)
Typography.displayName = "Typography"
