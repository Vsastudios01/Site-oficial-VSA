# AGENTS.md

- Mídia exibida pelo app (vídeos, imagens, fontes) é servida por apontadores CDN `src/assets/*.asset.json` do Lovable Assets; não deixar binários no repositório, exceto ícones em `public/`.
- A prévia de vídeo que abre em tela cheia vive em `src/components/vsa/VideoPreview.tsx` e é ativada por card pela flag `video` no `siteConfig`, para que a escolha do vídeo demonstre sem tocar no layout.
