# Publicação estática

O build produz `dist/`. A base relativa funciona em domínio próprio ou subdiretório. Fontes, ícones e imagens são locais; não há configuração secreta.

No GitHub, abra **Settings → Pages → Source → GitHub Actions**. O workflow testa e constrói em isolamento antes do deploy; pull requests só validam. A permissão `pages: write` fica restrita ao job de publicação.

Para outra hospedagem estática, execute `npm ci --ignore-scripts`, `npm test` e `npm run build`, e publique somente `dist/`. Nunca publique o diretório de trabalho, dependências ou arquivos de ambiente.

O `sudo` do workflow existe apenas no runner Ubuntu efêmero para instalar Bubblewrap e iniciar o namespace. O processo de testes opera sem capabilities, com NoNewPrivs, fonte/dependências somente leitura e rede isolada. No PC local, execute o helper como usuário comum; não copie `sudo` para o seu terminal.
