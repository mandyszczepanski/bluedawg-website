# BlueDawg AI Automation Readiness Audit — Lead Magnet Plan

> Adapted from GetXRayed (~/Desktop/MarkProjects/getxrayed/)
> Created: 2026-02-22

---

## Executive Summary

**Clone GetXRayed and re-skin it.** The funnel mechanics, scan animation, blurred-report paywall, and polling architecture are ~80% reusable. We swap the audit content from "website health for chiropractors" to "AI automation readiness for businesses" and change the paywall from $27 payment to free email capture.

**Estimated build time: 3-4 days.**

---

## 1. Funnel Comparison

| Step | GetXRayed (Current) | BlueDawg Audit (New) |
|------|-------------------|---------------------|
| Landing | Chiro website audit pitch | "How AI-Ready Is Your Business?" |
| Input | Business name, URL, email | Business name, URL, email, industry, employee count |
| Scan | 30-60s progress animation | 30-60s "Analyzing your business for AI opportunities" |
| Report (Free) | Performance, SEO, mobile scores | AI Readiness Score, automation opportunities (high-level) |
| Report (Locked) | Action steps blurred, $27 unlock | Detailed action steps + ROI projections blurred, **free email unlock** |
| Upsell | $500 website rebuild | Book a call → $10-20K BlueDawg pilot |

---

## 2. What We Keep vs Rebuild

### Keep As-Is (~80% of codebase)
- **Next.js 16 App Router structure** — all routes, layout, API patterns
- **Scan page** (`/scan`) — progress animation, polling logic, step display
- **Report page architecture** — blurred sections, unlock mechanism
- **Storage layer** (`src/lib/storage.ts`) — filesystem JSON works for MVP
- **Email system** (`src/lib/email.ts`) — Resend integration
- **Framer Motion animations** — scan progress, report reveals
- **Vercel deployment config**

### Rebuild / Modify
- **Landing page** (`src/app/page.tsx`) — New copy, new branding, new form fields
- **API audit route** (`src/app/api/audit/route.ts`) — New analysis pipeline
- **Report page UI** (`src/app/report/[id]/page.tsx`) — New sections, new scoring display
- **Checkout → Email capture** — Replace Stripe paywall with email gate
- **Email templates** — New sequences for BlueDawg funnel
- **Branding/styles** (`globals.css`) — BlueDawg colors, fonts, logo

### Delete
- Stripe checkout (`/api/checkout`, `/api/webhook`)
- Chiropractor-specific leads/CRM data
- $500 rebuild offer sections

---

## 3. The AI Automation Readiness Audit

### What We Scan (Input: URL + business info)

| Analysis Area | Data Source | Difficulty |
|--------------|------------|------------|
| **Website Tech Stack** | Wappalyzer API or BuiltWith (free tier) | Easy |
| **Page Speed / Performance** | Google PageSpeed Insights API (free) | Already built |
| **Current Automation Signals** | HTML scrape: chatbots, forms, booking widgets, CRM pixels | Easy |
| **Social Media Presence** | Scrape meta tags for social links, check activity | Medium |
| **Online Reputation** | Google Places API (reviews, ratings) | Already built |
| **Industry Benchmarks** | Static lookup table by industry | Easy |
| **AI Opportunity Score** | Algorithmic: gaps in automation = opportunities | Easy (rule-based) |

### Scoring System (0-100)

```
AI Readiness Score = weighted average of:

  Digital Presence     (15%) — Website quality, load speed, mobile
  Current Automation   (25%) — Chatbots, forms, booking, CRM, email automation
  Data Readiness       (20%) — Structured data, analytics, tracking pixels
  Customer Experience  (20%) — Reviews, social presence, response patterns
  Industry Opportunity (20%) — How much AI could help this vertical
```

**Score Bands:**
- **0-30: "Manual Mode"** — Running on paper and prayers. Massive AI opportunity.
- **31-55: "Getting Started"** — Some digital basics, but leaving money on the table.
- **56-75: "Partially Automated"** — Good foundation, ready for AI acceleration.
- **76-100: "AI-Ready"** — Already leveraging automation. Time for advanced AI.

Most businesses will score 25-55 (the sweet spot for selling services).

### Report Structure

**FREE SECTIONS (visible):**
1. **Overall AI Readiness Score** — Big number, color-coded gauge
2. **Digital Presence Summary** — Website speed, mobile, basic SEO
3. **Current Automation Detected** — What tools/integrations we found
4. **Industry Comparison** — "You're in the bottom 30% of [industry] businesses"
5. **Top 3 Quick Wins** — High-level teasers (e.g., "Automate your appointment booking")

**LOCKED SECTIONS (blurred, email unlock):**
6. **Detailed AI Action Plan** — 8-12 specific automation opportunities with priority ranking
7. **ROI Projections** — Estimated hours saved, cost reduction per automation
8. **Implementation Roadmap** — 30/60/90 day plan
9. **Tool Recommendations** — Specific platforms and integrations
10. **Custom AI Strategy Brief** — Tailored to their industry + current stack

**POST-UNLOCK CTA:**
- "Want us to implement this? Book a free 15-minute AI strategy call"
- Calendly embed or link → $10-20K pilot discussion

---

## 4. Technical Requirements

### APIs Needed
| API | Cost | Purpose |
|-----|------|---------|
| Google PageSpeed Insights | Free | Performance scoring |
| BuiltWith or Wappalyzer | Free tier | Tech stack detection |
| Google Places API | Free tier (sufficient) | Reviews/reputation |
| Resend | Free tier (100/day) | Email delivery |
| OpenAI API (optional) | ~$0.01/audit | Generate personalized recommendations |

### New Dependencies (add to package.json)
- None required for MVP. All analysis via fetch + HTML parsing.
- Optional: `cheerio` for HTML parsing, `openai` for AI-generated insights.

### Environment Variables
```
RESEND_API_KEY=xxx          # Already have
GOOGLE_PLACES_API_KEY=xxx   # Already have from GetXRayed
OPENAI_API_KEY=xxx          # Optional, for personalized recs
```

### No Stripe needed — replace with simple email gate:
- User enters email → POST `/api/unlock` → marks report as unlocked
- Cookie or URL token for persistent access

---

## 5. Implementation Timeline

### Day 1 (Monday): Clone & Strip
- [ ] Clone getxrayed → `~/Desktop/MarkProjects/bluedawg-audit/`
- [ ] Remove Stripe (checkout, webhook routes)
- [ ] Remove chiro-specific content
- [ ] Update branding (colors, fonts, logo)
- [ ] New landing page copy

### Day 2 (Tuesday): New Audit Engine
- [ ] Build new analysis pipeline in `/api/audit/route.ts`:
  - Tech stack detection (fetch + parse HTML for scripts/meta)
  - Automation signal detection (chatbot widgets, form builders, CRM pixels)
  - Industry benchmarking (static lookup)
  - AI readiness scoring algorithm
- [ ] Update report data schema
- [ ] Build email unlock flow (replace Stripe paywall)

### Day 3 (Wednesday): Report UI
- [ ] New report page with AI readiness sections
- [ ] Score gauge / visualization
- [ ] Blurred locked sections with email capture overlay
- [ ] Post-unlock CTA (book a call)
- [ ] Mobile responsive check

### Day 4 (Thursday): Polish & Deploy
- [ ] Email templates (report ready, follow-up sequences)
- [ ] Testing with 5-10 real business URLs
- [ ] Edge cases (no website, bad URL, etc.)
- [ ] Deploy to Vercel
- [ ] Custom domain (audit.bluedawg.ai or similar)

### Day 5 (Friday): Buffer / Launch
- [ ] Bug fixes from testing
- [ ] Share link, start driving traffic
- [ ] Set up basic analytics (who's scanning, who's unlocking)

---

## 6. Analysis Pipeline (Technical Detail)

```typescript
// Pseudo-code for the new audit pipeline

async function analyzeBusinessForAI(url: string, industry: string) {
  // Step 1: Fetch & parse website
  const html = await fetch(url).then(r => r.text());
  const techStack = detectTechStack(html);        // scripts, meta tags, headers
  const automationSignals = detectAutomation(html); // chatbots, forms, booking
  
  // Step 2: PageSpeed (reuse from GetXRayed)
  const pageSpeed = await getPageSpeedInsights(url);
  
  // Step 3: Check for common automation tools
  const hasChat = /intercom|drift|crisp|tawk|livechat|tidio/i.test(html);
  const hasCRM = /hubspot|salesforce|mailchimp|activecampaign/i.test(html);
  const hasBooking = /calendly|acuity|booksy|square.*appointments/i.test(html);
  const hasAnalytics = /google-analytics|gtag|segment|mixpanel/i.test(html);
  const hasEmailAuto = /mailchimp|convertkit|drip|klaviyo/i.test(html);
  
  // Step 4: Score
  const scores = calculateScores(techStack, automationSignals, pageSpeed, industry);
  
  // Step 5: Generate recommendations
  const recommendations = generateActionPlan(scores, industry);
  
  return { scores, recommendations, techStack, automationSignals };
}
```

---

## 7. Recommendation

**CLONE, DON'T BUILD FROM SCRATCH.**

GetXRayed gives us:
- Working scan animation + polling (the "magic show" that builds anticipation)
- Blurred report paywall (proven conversion mechanic)
- Email infrastructure (Resend)
- Vercel deployment pipeline
- Mobile-responsive report layout

We're really only rebuilding:
1. The analysis engine (what we scan for)
2. The report content (what we display)
3. The landing page (new copy)
4. Payment → email gate swap

This is a **3-4 day job** with Codex doing the heavy lifting. The hardest part is making the audit results feel valuable and specific enough to drive "book a call" conversions.

---

## 8. Success Metrics

- **Scan completion rate:** >80% of people who start should see their report
- **Email unlock rate:** >40% of report viewers should unlock (it's free!)
- **Call booking rate:** >5% of email captures should book a call
- **Target:** 100 audits/week → 40 emails → 2 calls → 1 pilot at $10-20K

---

## 9. Future Enhancements (Post-MVP)

- **AI-generated personalized insights** via OpenAI (more specific recommendations)
- **Competitor comparison** — show how they stack up vs industry leaders
- **Auto-outreach pipeline** — scrape businesses, auto-generate audits, cold email with report link
- **Retargeting pixel** — Facebook/Google ads to report viewers who didn't unlock
- **SMS follow-up** — Twilio integration for higher touch
- **White-label version** — Let partners run their own audits
