# erin-portfolio

Personal portfolio site (Work / Play / About) built with React + Vite.

## Getting started

```bash
npm run dev
```

Starts the Vite dev server (prints the localhost URL, usually `:5173`).

Other commands:

- `npm run fetch-data` — re-pulls fresh data from Notion, Ravelry, and Strava into the JSON files the pages read from. Not needed just to start the server, only when you want current data.
- `npm install` — if it's been a while since you last opened this repo and deps might be stale.
- `npm run build` — production build (also runs `fetch-data` first, via `prebuild`).
- `npm run lint` — Oxlint.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
