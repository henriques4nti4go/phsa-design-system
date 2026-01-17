# 🚀 Deploy Guide - PHSA Design System

Guia completo para fazer deploy e publicar o design system no npm.

## 📋 Pré-requisitos

1. **Conta npm** com acesso ao escopo `@phsa.tec`
2. **Node.js** 18+ instalado
3. **Yarn** ou npm instalado
4. **Git** configurado

## 🔧 Configuração Inicial

### 1. Login no npm

```bash
npm login
```

Certifique-se de estar logado no escopo correto:

```bash
npm whoami
```

### 2. Verificar Configuração do Package

Verifique se o `package.json` está correto:

```json
{
  "name": "@phsa.tec/design-system-react",
  "version": "0.1.10",
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```

## 🏗️ Build do Projeto

### Build Completo

O build é executado automaticamente antes de publicar graças ao hook `prepublishOnly`:

```bash
yarn build:lib
```

Este comando:
1. ✅ Transforma classes Tailwind para usar prefixo `phsa-`
2. ✅ Compila TypeScript para JavaScript (CJS e ESM)
3. ✅ Gera arquivos de tipos TypeScript (.d.ts)
4. ✅ Compila CSS isolado com Tailwind
5. ✅ Escopa CSS com `.ds` para isolamento
6. ✅ Cria módulo JS com CSS para importação

### Verificar Build

Após o build, verifique se os arquivos foram gerados:

```bash
ls -lh dist/
```

Você deve ver:
- `index.js` - CommonJS bundle
- `index.mjs` - ES Module bundle
- `index.d.ts` - TypeScript definitions
- `styles.css` - CSS compilado isolado
- `styles.js` - CSS como módulo JS
- Arquivos `.map` para source maps

## 📦 Publicação

### 1. Verificar Versão

Antes de publicar, atualize a versão no `package.json`:

```bash
# Versão patch (0.1.10 -> 0.1.11)
npm version patch

# Versão minor (0.1.10 -> 0.2.0)
npm version minor

# Versão major (0.1.10 -> 1.0.0)
npm version major
```

Ou edite manualmente o `package.json`.

### 2. Testar Build Localmente

```bash
# Build completo
yarn build:lib

# Verificar se tudo está correto
ls -lh dist/
```

### 3. Publicar no npm

```bash
npm publish
```

O comando `prepublishOnly` executará automaticamente:
- `yarn build:lib` - Build completo da biblioteca

### 4. Verificar Publicação

Após publicar, verifique no npm:

```bash
npm view @phsa.tec/design-system-react
```

Ou acesse: https://www.npmjs.com/package/@phsa.tec/design-system-react

## 🔄 Workflow Completo

### Desenvolvimento

```bash
# 1. Desenvolver componentes
yarn dev              # Desenvolvimento Next.js
yarn storybook        # Desenvolvimento Storybook

# 2. Testar build localmente
yarn build:lib

# 3. Verificar dist/
ls -lh dist/
```

### Publicação

```bash
# 1. Atualizar versão
npm version patch     # ou minor, major

# 2. Commit e push
git add .
git commit -m "chore: bump version to X.X.X"
git push

# 3. Publicar (build roda automaticamente)
npm publish

# 4. Criar tag Git (opcional)
git tag vX.X.X
git push --tags
```

## 📝 Checklist Antes de Publicar

- [ ] ✅ Código testado e funcionando
- [ ] ✅ Build executado com sucesso (`yarn build:lib`)
- [ ] ✅ Arquivos em `dist/` verificados
- [ ] ✅ Versão atualizada no `package.json`
- [ ] ✅ Changelog atualizado (se aplicável)
- [ ] ✅ README atualizado
- [ ] ✅ Login no npm verificado (`npm whoami`)
- [ ] ✅ Acesso ao escopo `@phsa.tec` confirmado

## 🐛 Troubleshooting

### Erro: "You do not have permission"

```bash
# Verificar login
npm whoami

# Verificar acesso ao escopo
npm access ls-packages @phsa.tec

# Se necessário, solicitar acesso ao time
```

### Erro: "Package already exists"

A versão já foi publicada. Atualize a versão:

```bash
npm version patch
npm publish
```

### Erro no Build

```bash
# Limpar e reinstalar
rm -rf node_modules dist
yarn install
yarn build:lib
```

### CSS não está sendo gerado

Verifique se:
1. Tailwind está instalado: `yarn list tailwindcss`
2. Arquivo `globals.css` existe
3. `tailwind.config.ts` está configurado corretamente
4. Variáveis de ambiente estão definidas durante o build

## 📊 Estrutura do Pacote Publicado

Quando publicado, o npm inclui apenas:

```
@phsa.tec/design-system-react/
├── dist/
│   ├── index.js          # CommonJS
│   ├── index.mjs         # ES Module
│   ├── index.d.ts        # TypeScript types
│   ├── styles.css        # CSS isolado
│   └── styles.js         # CSS como módulo
├── package.json
└── README.md
```

Arquivos excluídos (via `.npmignore`):
- `src/` - Código fonte
- `node_modules/`
- `.storybook/`
- Arquivos de configuração de desenvolvimento

## 🔐 CI/CD (Opcional)

Para automatizar publicação via GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: yarn install --frozen-lockfile
      - run: yarn build:lib
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 📚 Recursos Adicionais

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Package.json Fields](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

---

**Nota**: O build é executado automaticamente antes de cada publicação via `prepublishOnly`. Não é necessário rodar `yarn build:lib` manualmente antes de `npm publish`.
