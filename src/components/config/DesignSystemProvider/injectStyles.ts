/**
 * Helper para injetar CSS do design system
 * Usa múltiplas estratégias para garantir que o CSS seja carregado
 */

let cssCache: string | null = null;

export async function injectDesignSystemStyles(): Promise<boolean> {
  if (typeof document === 'undefined') {
    return false; // SSR
  }

  const styleId = 'phsa-design-system-styles';
  
  // Verificar se já foi injetado
  if (document.getElementById(styleId)) {
    return true;
  }

  // Se já temos o CSS em cache, usar diretamente
  if (cssCache) {
    injectCSS(cssCache, styleId);
    return true;
  }

  // Tentar carregar o CSS
  const css = await loadCSS();
  if (css) {
    cssCache = css;
    injectCSS(css, styleId);
    return true;
  }

  return false;
}

async function loadCSS(): Promise<string | null> {
  // Estratégia 1: Import via export do package.json
  try {
    const module = await import('@phsa.tec/design-system-react/styles');
    const css = module.default;
    if (css && typeof css === 'string') {
      return css;
    }
  } catch (error) {
    // Continuar para próxima estratégia
  }

  // Estratégia 2: Import direto do arquivo
  try {
    const module = await import('@phsa.tec/design-system-react/dist/styles.js');
    const css = module.default;
    if (css && typeof css === 'string') {
      return css;
    }
  } catch (error) {
    // Continuar para próxima estratégia
  }

  return null;
}

function injectCSS(css: string, styleId: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (document.getElementById(styleId)) {
    return; // Já existe
  }

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}
