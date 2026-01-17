const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Script para compilar CSS isolado do design system
 * Roda durante o build da biblioteca
 */

const cssEntry = path.join(__dirname, '../src/components/config/DesignSystemProvider/globals.css');
const outputCss = path.join(__dirname, '../dist/styles.css');
const outputJs = path.join(__dirname, '../dist/styles.js');

console.log('📦 Compilando CSS isolado...');

// Definir variáveis de ambiente para build isolado
process.env.BUILD_LIB = 'true';
process.env.DS_PREFIX = 'phsa-';

try {
  // Compilar CSS usando Tailwind CLI
  execSync(
    `npx tailwindcss -i "${cssEntry}" -o "${outputCss}" --minify`,
    {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
      env: {
        ...process.env,
        BUILD_LIB: 'true',
        DS_PREFIX: 'phsa-',
      },
    }
  );

  // Ler CSS compilado
  let css = fs.readFileSync(outputCss, 'utf-8');

  // Escopar todas as regras CSS com .ds
  css = css.replace(/^([^{]+)\{/gm, (match, selector) => {
    const trimmed = selector.trim();
    
    // Não escopar se já tiver .ds
    if (trimmed.includes('.ds')) return match;
    
    // Manter variáveis CSS em :root (já transformado para .ds pelo postcss)
    if (trimmed === ':root' || trimmed === '.ds') return match;
    
    // Escopar classes utilitárias: .phsa-rounded-md -> .ds .phsa-rounded-md
    if (trimmed.startsWith('.')) {
      return `.ds ${trimmed}{`;
    }
    
    return match;
  });

  // Salvar CSS escopado
  fs.writeFileSync(outputCss, css);

  // Criar módulo JS com CSS para importação
  const jsContent = `export default ${JSON.stringify(css)};`;
  fs.writeFileSync(outputJs, jsContent);

  console.log('✅ CSS isolado compilado com sucesso!');
  console.log(`   - CSS: ${outputCss}`);
  console.log(`   - JS Module: ${outputJs}`);
} catch (error) {
  console.error('❌ Erro ao compilar CSS:', error);
  process.exit(1);
}
