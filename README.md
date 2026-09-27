# vehicleproof.app

The VehicleProof website: home, privacy policy, terms, account deletion and support.
React + TypeScript + Vite. Every page is pre-rendered to plain HTML at build time, so
its text is readable without JavaScript (store reviewers, search engines, link
previews); React then adds the scroll effects in the browser.

## Work on it

```bash
npm install
npm run dev        # http://localhost:5173, reloads as you edit
npm run build      # type-check, build and pre-render into dist/
npm run preview    # serve dist/ to check the built site
```

## Where things are

| What | File |
|---|---|
| Home page | `src/pages/Home.tsx` |
| Privacy Policy | `src/pages/Privacy.tsx` |
| Terms of Service | `src/pages/Terms.tsx` |
| Delete your account | `src/pages/DeleteAccount.tsx` |
| Support | `src/pages/Support.tsx` |
| Page titles, descriptions and addresses | `src/routes.ts` |
| Top bar and footer | `src/components/Chrome.tsx` |
| Styles | `src/styles.css` |
| Images and fonts (served as-is) | `public/assets/` |

- When the privacy policy or terms change, update the "Effective" date at the top.
- A new page: add a component in `src/pages/` and a line in `src/routes.ts`.
- `public/CNAME` holds the custom domain. Don't delete it.

## Publishing

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. In the repo, **Settings → Pages → Source** must be
**GitHub Actions**.

Fonts: Inter (SIL Open Font License, see `public/assets/fonts/Inter-LICENSE.txt`).
