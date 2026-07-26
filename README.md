# ContractorSiteAudit

Instant SEO and speed audit for US/Canadian home-service contractor websites (HVAC, plumbing, roofing, electrical). Enter a URL, get a 1-page report: Google PageSpeed mobile + desktop scores, Core Web Vitals, LocalBusiness schema check, viewport check, and missing image alt-tags — with plain-English fix advice. Lead capture gate below the report. Free tier is 1 audit per IP per 24 hours.

## Local dev setup

Prerequisites: Node 20+, pnpm 9+.

1. Install dependencies:
   ```
   pnpm install
   ```
2. Create the database: open your Supabase project → SQL Editor → paste and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in all four values (see below).
4. Start the dev server:
   ```
   pnpm dev
   ```
   Open http://localhost:3000 and audit a URL.

Other scripts: `pnpm typecheck` (TypeScript check), `pnpm build` + `pnpm start` (production build/serve).

## Environment variables

All four are server-side only — none are exposed to the browser.

| Variable | Where to get it |
| --- | --- |
| `GOOGLE_PAGESPEED_API_KEY` | Google Cloud console → APIs & Services → Credentials → API key (enable the "PageSpeed Insights API") |
| `SUPABASE_URL` | Supabase dashboard → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase dashboard → Project Settings → API → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → `service_role` key (keep secret) |

## Hostinger Cloud deploy

Deployed from the GitHub `main` branch via hPanel — no server access needed.

1. Push this repository to GitHub (`main` branch).
2. In hPanel, create a new **Node.js** application and connect the GitHub repository, branch `main`.
3. Set the build command to `pnpm install && pnpm build` and the start command to `pnpm start`.
4. Add the four environment variables from the table above in the application's environment-variables section.
5. Deploy. Subsequent pushes to `main` redeploy automatically via Hostinger's GitHub integration.

Note: the app needs a Node.js runtime (it has API routes) — static export will not work.
