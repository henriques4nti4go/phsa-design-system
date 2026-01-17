import "./globals.css";
import { DesignSystemProvider as BaseDesignSystemProvider } from "./index";
import type { DesignSystemProviderProps } from "./index";

/**
 * DesignSystemProvider com CSS importado automaticamente
 * Este componente importa o CSS necessário e renderiza o DesignSystemProvider base
 */
export function DesignSystemProviderWithStyles(
  props: DesignSystemProviderProps
) {
  return <BaseDesignSystemProvider {...props} />;
}

// Re-exportar o tipo para facilitar o uso
export type { DesignSystemProviderProps } from "./index";
