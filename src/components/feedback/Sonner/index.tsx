// src/components/feedback/Sonner/index.tsx
import * as React from "react"
import { Toaster as UIToaster } from "@/components/ui/sonner"

/**
 * Toaster raiz (primitivo) baseado no sonner.
 *
 * Componente que renderiza o container de toasts.
 * Deve ser adicionado na raiz da aplicação (ex: layout.tsx).
 *
 * @example
 * ```tsx
 * import { Toaster } from "@phsa.tec/design-system-react"
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <Toaster />
 *     </>
 *   )
 * }
 * ```
 */
export const Toaster = UIToaster
export type ToasterProps = React.ComponentProps<typeof UIToaster>

/**
 * Função para exibir notificações toast.
 *
 * Re-exporta a função `toast` do sonner com todos os seus métodos:
 * - `toast()` - toast padrão
 * - `toast.success()` - toast de sucesso
 * - `toast.error()` - toast de erro
 * - `toast.warning()` - toast de aviso
 * - `toast.info()` - toast informativo
 * - `toast.loading()` - toast de carregamento
 * - `toast.promise()` - toast para promises
 * - `toast.custom()` - toast customizado
 * - `toast.dismiss()` - fechar toast
 * - `toast.message()` - toast com mensagem
 *
 * @example
 * ```tsx
 * import { toast } from "@phsa.tec/design-system-react"
 *
 * // Toast simples
 * toast("Operação realizada com sucesso!")
 *
 * // Toast de sucesso
 * toast.success("Dados salvos com sucesso!")
 *
 * // Toast de erro
 * toast.error("Erro ao salvar dados")
 *
 * // Toast com descrição
 * toast.success("Perfil atualizado", {
 *   description: "Suas alterações foram salvas."
 * })
 *
 * // Toast com ação
 * toast("Item removido", {
 *   action: {
 *     label: "Desfazer",
 *     onClick: () => console.log("Desfazer")
 *   }
 * })
 *
 * // Toast de promise
 * toast.promise(saveData(), {
 *   loading: "Salvando...",
 *   success: "Dados salvos!",
 *   error: "Erro ao salvar"
 * })
 * ```
 */
// Re-exportar a função toast do sonner
// Usando re-export direto para manter todos os métodos e tipos
export { toast, type ToastT } from "sonner"
