# 📦 Guia de Publicação no NPM

## Processo Completo

### 1. Atualizar Versão

**Opção A - Automático (Recomendado):**
```bash
# Patch: 0.1.10 -> 0.1.11 (correções de bugs)
npm version patch

# Minor: 0.1.10 -> 0.2.0 (novas funcionalidades)
npm version minor

# Major: 0.1.10 -> 1.0.0 (mudanças incompatíveis)
npm version major
```

**Opção B - Manual:**
Edite `package.json` e altere a versão manualmente.

### 2. Verificar Build (Opcional)

O script `prepublishOnly` já executa o build automaticamente, mas você pode testar:

```bash
npm run build:lib
```

### 3. Publicar no NPM

**Certifique-se de estar logado:**
```bash
npm login
```

**Publicar:**
```bash
npm publish
```

O comando `npm publish` automaticamente:
- ✅ Executa `prepublishOnly` (que faz o build)
- ✅ Publica apenas os arquivos listados em `files: ["dist"]`
- ✅ Usa a configuração `publishConfig.access: "public"`

### 4. Commit e Push (se necessário)

Se você usou `npm version`, o commit já foi criado. Apenas faça push:

```bash
git push
git push --tags  # para enviar as tags de versão
```

Se atualizou manualmente, faça commit:

```bash
git add package.json package-lock.json
git commit -m "chore: bump version to X.X.X"
git push
```

## Checklist Antes de Publicar

- [ ] Versão atualizada no `package.json`
- [ ] Build executado com sucesso (`npm run build:lib`)
- [ ] Testes passando (`npm test`)
- [ ] Logado no npm (`npm whoami`)
- [ ] Verificado que não está em modo `private: true`

## Comandos Úteis

```bash
# Ver versão atual
npm version

# Ver quem está logado no npm
npm whoami

# Ver informações do pacote publicado
npm view @phsa.tec/design-system-react

# Ver versões publicadas
npm view @phsa.tec/design-system-react versions

# Publicar com tag específica (ex: beta)
npm publish --tag beta
```

## Versão Atual

A versão atual está em: `package.json` linha 3
