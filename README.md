# Muhammad Usama — Portfolio

React + TypeScript + Vite, Tailwind CSS, Framer Motion, and Lucide. Dark by default, with a persistent light theme.

## Run

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` folder to any static hosting provider.

## Personalize

- `src/config/site.ts`: email, GitHub, LinkedIn, website, and education. Unknown links are intentionally blank and hidden; adding email enables the mailto contact form. This form opens an email draft; it does not send through a backend.
- `src/data/projects.ts`: project content, live and source links, and case study fields. Unprovided case-study details display “Details to be added.” No results or dates are invented.
- `src/data/experience.ts`: experience and optional dates.
- `public/projects/*.png`: replace illustrative placeholders with real screenshots using the same filenames.
- `src/index.css`: theme tokens, typography, and responsive layouts.

The portfolio adapts the supplied reference's condensed typography, charcoal/green palette, generous spacing, and editorial sections for Muhammad Usama. All project images are original illustrative placeholders, not screenshots of the actual products. Google Fonts are loaded online with local font fallbacks.

## Restricted Windows environment
The verified fallback build is `node build-portable.mjs`; serve its output with `node preview-portable.mjs`. See VERIFICATION.md for the completed checks.

## Projects showcase
Projects.tsx and Projects.css contain the scroll-driven desktop showcase. Mobile, short viewports, and reduced-motion preferences use a natural vertical flow. Project data and URLs stay in src/data/projects.ts.
