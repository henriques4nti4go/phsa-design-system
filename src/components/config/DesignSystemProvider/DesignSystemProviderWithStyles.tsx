"use client";
import { useLayoutEffect } from "react";
import { DesignSystemProvider as BaseDesignSystemProvider } from "./index";
import type { DesignSystemProviderProps } from "./index";
import { injectDesignSystemStyles } from "./injectStyles";

// Flag global para evitar múltiplas injeções
let stylesInjected = false;

/**
 * DesignSystemProvider - Carrega CSS automaticamente
 * 
 * O CSS é injetado diretamente no DOM usando useLayoutEffect para garantir
 * que seja carregado antes do primeiro paint, evitando FOUC (Flash of Unstyled Content).
 * Funciona tanto quando publicado quanto quando linkado via yarn/npm link.
 */
export function DesignSystemProviderWithStyles(
  props: DesignSystemProviderProps
) {
  // useLayoutEffect executa antes do paint, garantindo CSS antes do render
  useLayoutEffect(() => {
    // Verificar se já foi injetado (evita duplicação)
    if (stylesInjected) return;
    
    // Verificar se já existe no DOM (caso múltiplos providers sejam montados)
    const styleId = 'phsa-design-system-styles';
    if (typeof document !== 'undefined' && document.getElementById(styleId)) {
      stylesInjected = true;
      return;
    }

    // Carregar e injetar CSS usando helper
    injectDesignSystemStyles()
      .then((success) => {
        if (success) {
          stylesInjected = true;
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ CSS do design system injetado com sucesso');
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              '⚠️ CSS do design system não pôde ser carregado automaticamente.'
            );
            console.warn(
              '💡 Solução: Importe manualmente no seu layout.tsx:',
              'import "@phsa.tec/design-system-react/styles"'
            );
          }
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Erro ao carregar CSS:', error);
        }
      });
  }, []);

  return <BaseDesignSystemProvider {...props} />;
}

// Re-exportar o tipo para facilitar o uso
export type { DesignSystemProviderProps } from "./index";
