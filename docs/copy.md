# ContractorSiteAudit — Copy document

Every user-visible string, ordered by page. Change strings here and mirror into the corresponding component/page file. Voice: contractor's brother-in-law who happens to know SEO. Direct, numbers over adjectives, no agency-speak.

---

## Global

- **Product name:** ContractorSiteAudit
- **One-liner:** See what your contractor website is costing you, in 30 seconds.
- **Contact:** hello@contractorsiteaudit.com

---

## Landing page (`app/page.tsx`)

### Hero

- **Display headline:** Fixable.
- **Sub-headline:** Your contractor website is losing you leads. See exactly how many, in 30 seconds.
- **URL input placeholder:** `https://your-hvac-site.com`
- **Primary CTA button:** Audit my site
- **Loading state text:** Auditing…
- **Loading helper (below input):** Running Google PageSpeed on mobile and desktop — takes up to 30 seconds.
- **Trust markers (dot-separated):** No signup · Score in 30s · Screenshot & share
- **Positioning line:** Competitors charge $500 and take 48 hours. We do it live.

### Inline error messages

- **Invalid URL:** That doesn't look like a valid website. Try yourcompany.com
- **Timeout:** Your site took longer than 30 seconds. Try again.
- **Generic:** Something went wrong. Try again in a minute.

### Comparison section

- **Eyebrow / title:** The audit market, honestly.
- **Sub-title:** Three ways to check your site. Here's what each one actually gives you.
- **Column headers:** ContractorSiteAudit · Agency audit · PageSpeed Insights
- **Rows** (label → us / agency / google):
  - Turnaround time → **30 seconds** / 24–48 hours / 45 seconds
  - Email required → **No** / Yes, plus phone / No
  - Contractor-specific → **Yes** / Sometimes / Generic dev output
  - Fix priority ranking → **Top 3–5, plain English** / 40-item PDF / Wall of Lighthouse metrics
  - Screenshot-friendly score card → **Built for sharing** / PDF only / Dev-tool UI
  - Price → **Free** / $0 (they sell you later) / Free
- **Footnote:** Google's PageSpeed Insights is free and the raw numbers are trustworthy — we use its API under the hood. The difference is we translate the numbers into what a contractor can actually do about them.

### Six checks section

- **Title:** 6 things we check
- **Sub-title:** Not 40. Not 12. The six that decide whether Google sends you jobs.
- **Cards:**
  1. **Google speed** — Mobile and desktop PageSpeed scores from Google's own API — the same numbers Google uses to rank you.
  2. **Mobile experience** — Core Web Vitals: how fast your page shows up, how much it jumps around, how quickly it reacts to a tap.
  3. **Local SEO signals** — Whether Google can tell you're a local business — the switch that gets you into the Maps pack.
  4. **Schema markup** — The invisible code that tells Google your hours, service area, and rating. Missing on 8 in 10 contractor sites.
  5. **Missing alt tags** — Homepage images with no description — free local-SEO points most contractors don't know they're leaving on the table.
  6. **Fix priorities** — Every issue ranked by impact, in plain English. Not a 40-item wall — the 3 to 5 things that actually matter.

### Cost-of-inaction calculator

- **Title:** The math your ad guy won't show you.
- **Sub-title:** If your site loses 40% of the traffic your ads pay for, this is what that costs you.
- **Input label:** Your monthly ad spend (Google, Facebook, LSAs — whatever you run)
- **Output tile 1 label:** Wasted every month
- **Output tile 1 caption:** Assumes 40% of visitors leave without calling — the average for slow contractor sites.
- **Output tile 2 label:** Wasted every year
- **Output tile 2 caption:** Roughly one extra truck on the road, if your site converted like it should.
- **Soft CTA below calculator:** This uses a 40% assumption. Your actual number could be lower — or a lot worse. **Run the audit to see your real bounce risk →**

### How it works

- **Title:** How it works
- **Sub-title:** No calls. No salespeople. No 48-hour wait.
- **Step 1:** Paste your URL — One field. No name, no phone, no service area.
- **Step 2:** Watch the score fill in — Live in your browser. Under 30 seconds.
- **Step 3:** Get the fix list — Read it on screen. PDF version by email if you want one.

### Social proof (live counter)

- **Eyebrow:** Just launched
- **Title:** Be one of the first 100.
- **Sub-title:** We're not going to fake testimonials. Here's the real count.
- **Counters:** Audits today · This week · All-time

### FAQ

- **Title:** Straight answers
- **Sub-title:** The questions contractors actually ask before running the tool.
- **Q1:** Is it really free? What's the catch?
  - **A:** The audit is free. One per website per day, no signup. We built this to show off what we do — some people will hire us for the fixes, most won't, and both are fine. The paid tier (coming this launch week) unlocks unlimited audits and weekly monitoring of your site.
- **Q2:** Do you spam my inbox?
  - **A:** You only give us your email if you want the full PDF version of the report. When you do, you'll hear from us maybe twice a month with actual useful stuff (a new check we added, a bug we found in the last audit). One-click unsubscribe. No selling your address to anyone.
- **Q3:** What exactly do you check?
  - **A:** Six things: mobile speed, desktop speed, Core Web Vitals (loading, stability, responsiveness), whether your site has LocalBusiness schema markup for Google Maps, whether your mobile viewport tag is set, and how many images on your homepage are missing alt descriptions. Every check runs against your real live homepage.
- **Q4:** Do I have to give you my website password?
  - **A:** No. We only look at your public homepage — the same thing any visitor or Google bot sees. We don't touch your admin, your hosting, or anything behind a login.
- **Q5:** What if my site scores fine?
  - **A:** Then that's a screenshot worth taking. Post it in your Facebook group, tell your competitors to try it. If your site's genuinely in good shape, we'll say so — no upsell, no fear-mongering.
- **Q6:** What's the paid tier?
  - **A:** $29/month unlocks unlimited audits, weekly automatic re-scans of your site with email alerts when something drops, and a shareable public score page you can put in your Google Business profile. Launching this week — audits stay free forever regardless.

### Final CTA

- **Display headline:** 30 seconds.
- **Sub-headline:** That's the whole thing. See what Google sees and decide from there.
- **Below input:** Or **read the blog first** before you decide. (link → dailyaifixs.com)

### Footer

- © {year} ContractorSiteAudit · Run an audit · hello@contractorsiteaudit.com

---

## Report page (`app/audit/[id]/page.tsx`)

- **Back link:** ← ContractorSiteAudit
- **Timestamp prefix:** Audited {date}
- **Eyebrow:** Audit report
- **Score labels:** Mobile · Desktop
- **Under scores helper:** Screenshot this page and share it — the URL works too.

### Section title

- **Title:** What we found, in order.
- **Sub-title:** Tap any category to see the details and the fix.

### Category status badges

- **Green:** Looks good
- **Amber:** Needs work
- **Red:** Fix this
- **Grey:** No data

### Category — Mobile speed

- **Good headline:** Your mobile site is fast. Google likes that.
- **Warn headline:** There's room to speed things up for phone visitors.
- **Poor headline:** Slow on phones — this is quietly costing you calls.
- **Detail:** Most homeowners find contractors on their phone. If your page takes more than three seconds to show up, one in three visitors is already gone and calling the next name on the list.
- **Fix:** Compress the big image on your homepage (usually the hero banner) and remove any auto-playing sliders. Those two changes fix most contractor sites.

### Category — Core Web Vitals

- **Good headline:** Loading, stability, and responsiveness all check out.
- **Warn/poor headline:** Google's three speed signals — at least one needs attention.
- **Detail:** Loading (LCP): {value}. Stability (CLS): {value}. Responsiveness (INP): {value or "no field data yet"}. These come straight from Google.
- **Fix:** Fixing LCP usually means compressing the hero image. Fixing CLS means setting fixed width/height on images so the page doesn't jump. Any web person can do both in an hour.

### Category — LocalBusiness schema

- **Good headline:** Google can tell you're a local business.
- **Poor headline:** Google can't tell you're a local business.
- **Detail:** LocalBusiness schema is a small chunk of code that tells Google your hours, service area, and rating. It's the switch that gets you into the map results — where most contractor jobs actually come from.
- **Fix:** Ask your web person to add LocalBusiness JSON-LD schema to your homepage with your NAP (name, address, phone), hours, and service areas. Fifteen-minute job.

### Category — Mobile viewport tag

- **Good headline:** Your site tells phones how to display it.
- **Poor headline:** Your site doesn't tell phones how to display it.
- **Detail:** The viewport tag is a one-line piece of code that tells phones to show your site at the right zoom. Without it, your site looks tiny and hard to tap.
- **Fix:** Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to the `<head>` of your homepage. Any web person can do this in two minutes.

### Category — Missing image descriptions

- **Good headline:** Every homepage image has a description.
- **Warn/poor headline:** {N} homepage image(s) missing descriptions.
- **Detail:** Google reads image descriptions (alt tags) to understand what your work looks like. Missing alt tags are free local-SEO points you're leaving on the table.
- **Fix:** For every image, add a short description of what it shows — "HVAC technician installing a new AC unit in Phoenix" beats a blank tag every time.

### Lead capture card (report variant)

- **Icon eyebrow:** (envelope icon)
- **Headline:** Get the full PDF report emailed to you
- **Sub-headline:** Every issue we found, prioritized, with plain-English fixes you can hand to any web person.
- **Field placeholders:** Your name · you@yourcompany.com · Business name
- **Submit button:** Email me the full report
- **Success state:** You're on the list. Full PDF report is on its way to {email}.
- **Privacy note:** No spam. We use your email for the report and occasional product updates. Unsubscribe with one click.

### Audit-another section

- **Title:** Audit another site.
- **Sub-title:** Check a competitor. Check a friend's site. See how they stack up.
- **Button:** Run another audit

---

## Rate-limit page (`app/limit-reached/page.tsx`)

- **Title:** You've used your free audit today.
- **Sub-title:** Drop your email to unlock unlimited audits during our launch week — no card, no charge.

### Lead capture card (gate variant)

- **Headline:** Unlock unlimited audits this launch week
- **Sub-headline:** One free audit per day is our launch limit. Drop your details to run more.
- **Submit button:** Unlock unlimited audits
- **Fallback line:** Or wait 24 hours for your next free audit — no signup needed. **Back to home**

---

## Open Graph card (share preview)

- **Brand line:** ContractorSiteAudit
- **Section label:** Audit report
- **Hero line:** {hostname}
- **Scores:** {mobile} MOBILE · OUT OF 100 / {desktop} DESKTOP · OUT OF 100
- **Footer:** Free 30-second SEO & speed audit for contractor websites.
