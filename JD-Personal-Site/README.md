# Joe Deng Personal Website

Run-ready React/Vite version of the approved 2056 personal website design.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Structure

```text
index.html
src/
  App.tsx
  main.tsx
  index.css
public/images/generated/
  extracted webp assets
```

## Notes

- The Figma-style React code has been converted into a normal Vite React project.
- Embedded base64 images were extracted into WebP files under `public/images/generated/`.
- Motion effects are preserved through the `motion` package.
- Icons are preserved through `lucide-react`.


## GitHub Pages deployment

This package is configured for the repository `realJoeDeng/JD-Personal-Site`.

- Vite base path: `/JD-Personal-Site/`
- Images are referenced via `import.meta.env.BASE_URL + images/site-assets/...`
- GitHub Pages workflow: `.github/workflows/deploy.yml`

After uploading to the repository root, set GitHub Pages source to **GitHub Actions**.
