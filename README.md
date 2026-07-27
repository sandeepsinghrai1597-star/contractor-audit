# ContractorSiteAudit

Instant SEO and speed audit for US/Canadian home-service contractor websites (HVAC, plumbing, roofing, electrical). Enter a URL, get a 1-page report: Google PageSpeed mobile + desktop scores, Core Web Vitals, LocalBusiness schema check, viewport check, and missing image alt-tags — with plain-English fix advice. Lead capture gate below the report. Free tier is 9 audits per IP per 24 hours (see `lib/rate-limit.ts` `FREE_AUDITS_PER_DAY`).

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

## Pro tier — manual activation runbook (launch week)

During launch week, Pro accounts are activated by hand. The auth path that reads `pro_users` (magic-link email + signed cookie) is not built yet — so paying today unlocks nothing automated. You promise activation within 24 hours on `/pro/thanks`; make good on that.

**PayPal setup (one-time, in the PayPal Business dashboard):**

1. Open the no-code checkout page ([https://www.paypal.com/ncp/payment/G6BNL2M7B5VEE](https://www.paypal.com/ncp/payment/G6BNL2M7B5VEE)) → **Edit**.
2. Under **After payment**, set the return URL to `https://blue-lark-181638.hostingersite.com/pro/thanks` (swap in your production hostname).
3. Save.
4. Optional: turn on **PayPal email notifications** so every completed sale hits your inbox with the buyer's email address.

**Per-sale workflow (do this within 24 hours of payment):**

1. PayPal emails you when a sale completes. Note the buyer's email address and the transaction ID.
2. In the Supabase dashboard → SQL Editor, run:
   ```sql
   insert into pro_users (email, expires_at, paypal_transaction_id, notes)
   values (
     'buyer@example.com',
     now() + interval '30 days',
     'TRANSACTION_ID_FROM_PAYPAL',
     'manual activation, launch week'
   );
   ```
3. Reply to the buyer from `hello@contractorsiteaudit.com` confirming their Pro account is active and set to expire on `now + 30 days`. Include the current UTC date so they can reconcile.
4. When you renew the same buyer next month, either update the existing row (`update pro_users set expires_at = now() + interval '30 days' where email = 'buyer@example.com'`) or insert a new row — the unique index on `email` will force an update. Simpler: always update.

**When to automate this:**

Once you hit 10+ active Pro users, replace this runbook with:
- PayPal IPN webhook → `POST /api/paypal/ipn` → inserts/updates `pro_users` automatically
- Magic-link login on the site → sets a signed cookie tied to email → `/api/audit` skips the rate limit when the cookie's email matches a live row in `pro_users`

Both are planned; neither is built. Cutover blocks: (a) enable IPN on the PayPal Business account, (b) add a `RESEND_API_KEY` or similar for magic-link emails, (c) add a `SESSION_SECRET` env var for signing the cookie.
