# AGENTS.md

- App media lives as real files in `public/media/` (each under 10 MB); `src/assets/*.asset.json` pointers keep their shape but `url` points to `/media/<file>`, because the site is also deployed on Vercel where Lovable CDN paths don't resolve.
- A prévia de vídeo que abre em tela cheia vive em `src/components/vsa/VideoPreview.tsx` e é ativada por card pela flag `video` no `siteConfig`, para que a escolha do vídeo demonstre sem tocar no layout.
