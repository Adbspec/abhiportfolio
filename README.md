# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cloudflare Pages Deployment

This portfolio is set up to deploy to Cloudflare Pages with an edge runtime for the AI route.

Use these settings in Cloudflare Pages:

- Build command: `npm run pages:build`
- Build output directory: `.vercel/output/static`
- Root directory: repository root
- Environment variable: `GEMINI_API_KEY` as a secret value

To get the `abhi.pages.dev` style domain, name the Pages project `abhi`.

For local preview of the Cloudflare build output:

1. Run `npm run pages:build`.
2. Run `npm run pages:dev`.
