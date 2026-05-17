---
name: google-seo
description: Expert Google SEO optimization skill for improving website page rankings, search visibility, and organic traffic. Use this skill whenever the user mentions SEO, search engine optimization, Google ranking, page rank, keyword research, meta tags, backlinks, site speed, Core Web Vitals, schema markup, on-page SEO, off-page SEO, technical SEO, sitemap, robots.txt, canonical tags, SERP, organic traffic, domain authority, link building, content strategy for search, or anything related to getting a website to rank higher on Google. Also trigger when the user asks "why isn't my site ranking", "how do I get more traffic", "how do I appear on Google", or wants an SEO audit of their website.
---

# Google SEO Optimization Skill

A comprehensive skill for helping users rank higher on Google and improve their website's organic search performance. Covers technical SEO, on-page optimization, off-page strategy, content planning, and measurement.

---

## Workflow: Start Here

When a user asks for SEO help, first determine their context:

1. **New website** → Start with Technical SEO Foundation + On-Page basics
2. **Existing site with low traffic** → Run an SEO Audit checklist first
3. **Ranking dropped** → Diagnose: algorithm update? penalty? technical issue?
4. **Specific page to optimize** → On-Page SEO deep dive
5. **Content strategy** → Keyword research + content gap analysis
6. **General improvement** → Full audit across all pillars

Always ask for the website URL and target audience/niche if not provided.

---

## Pillar 1: Technical SEO Foundation

These are non-negotiable baseline requirements for Google to crawl and index a site correctly.

### Crawlability & Indexing
- **robots.txt** — ensure it doesn't accidentally block Googlebot from important pages
- **XML Sitemap** — submit to Google Search Console; include only canonical, indexable URLs
- **Canonical tags** (`<link rel="canonical">`) — prevent duplicate content penalties
- **Noindex tags** — apply to thin/duplicate/admin pages that shouldn't rank
- **Redirect chains** — eliminate 301 chains longer than 1 hop; fix 302s that should be 301s

### Site Architecture
- Keep important pages within **3 clicks** from the homepage
- Use a **flat URL structure**: `domain.com/category/page` not `domain.com/cat/sub/sub/page`
- Implement **internal linking** strategically — link from high-authority pages to pages you want to rank
- Use **breadcrumbs** for navigation and schema markup

### Core Web Vitals (Google ranking signal since 2021)
| Metric | Target | What it measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Loading speed |
| FID / INP (Interaction to Next Paint) | < 200ms | Interactivity |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |

**Tools to check:** Google PageSpeed Insights, Search Console Core Web Vitals report

### HTTPS & Security
- Site must be on **HTTPS** — Google gives a small ranking boost and Chrome flags HTTP as "Not Secure"
- Ensure no **mixed content** warnings (HTTP assets on HTTPS pages)

### Mobile-First
- Google uses **mobile-first indexing** — the mobile version of your site is what Google indexes
- Test with Google's Mobile-Friendly Test tool
- Use responsive design, not separate mobile URLs unless carefully canonicalized

---

## Pillar 2: On-Page SEO

Optimization of individual pages to signal relevance to target keywords.

### Keyword Research Process
1. **Seed keywords** — brainstorm 5–10 core topics relevant to the business
2. **Expand** — use tools (Google Keyword Planner, Ahrefs, Semrush, Ubersuggest) to find variations
3. **Evaluate** — balance **search volume** vs **keyword difficulty (KD)**
4. **Intent matching** — classify each keyword:
   - Informational ("how to bake bread") → blog/guide
   - Navigational ("Nike official site") → brand page
   - Transactional ("buy running shoes online") → product/category page
   - Commercial ("best running shoes 2024") → comparison/review page
5. **Long-tail targeting** — lower competition, higher conversion rate

### Page-Level Optimization Checklist
- [ ] **Title tag** — include primary keyword near the front; 50–60 characters; unique per page
- [ ] **Meta description** — 150–160 characters; compelling CTA; include keyword naturally (doesn't directly affect ranking but impacts CTR)
- [ ] **H1 tag** — one per page; contains primary keyword; matches search intent
- [ ] **H2/H3 headings** — logical hierarchy; include secondary/LSI keywords naturally
- [ ] **URL slug** — short, hyphenated, keyword-rich: `/best-running-shoes` not `/p?id=123`
- [ ] **First 100 words** — include primary keyword early in the content
- [ ] **Image alt text** — descriptive, keyword-relevant; helps with image search and accessibility
- [ ] **Internal links** — link to 3–5 relevant internal pages with descriptive anchor text
- [ ] **External links** — link out to authoritative sources (builds trust signals)
- [ ] **Content length** — match or exceed top-ranking competitors for that query
- [ ] **Keyword density** — aim for natural usage; avoid keyword stuffing (Google penalizes this)
- [ ] **LSI keywords** — use semantically related terms to establish topical authority

### Schema Markup (Structured Data)
Helps Google understand content and can unlock **rich results** in SERPs:
- **Article** — for blog posts and news
- **Product** — price, availability, reviews
- **FAQ** — expands listing with Q&A in SERPs
- **HowTo** — step-by-step instructions
- **LocalBusiness** — address, hours, phone
- **BreadcrumbList** — navigation trail
- **Review / AggregateRating** — star ratings in results

Use JSON-LD format (Google's preferred method). Validate with Google's Rich Results Test.

---

## Pillar 3: Content Strategy

### E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
Google's quality evaluator framework — critical for YMYL (Your Money, Your Life) niches (health, finance, legal):
- Add **author bios** with credentials
- Include **citations** and link to sources
- Display **trust signals**: reviews, awards, certifications, press mentions
- Publish **original research** or data when possible
- Keep content **up to date** — add "last updated" dates

### Content Types That Rank Well
| Format | Best For |
|--------|----------|
| Long-form guides (2,000+ words) | Informational keywords, topical authority |
| Comparison pages | Commercial intent keywords |
| FAQ pages | Featured snippet capture |
| Listicles | "Best X" queries |
| Case studies | Trust + conversion |
| Landing pages | Transactional keywords |

### Content Gap Analysis
1. Identify your top 5 competitors
2. Use Ahrefs/Semrush to find keywords they rank for that you don't
3. Prioritize gaps with high volume + medium difficulty
4. Create better, more comprehensive content than what's currently ranking

### Featured Snippets Strategy
- Target **question-based queries** ("how does X work", "what is X")
- Include the question as an H2, then answer it directly in 40–60 words below
- Use numbered lists for process queries, tables for comparison queries
- Already ranking on page 1? You're eligible for the snippet

---

## Pillar 4: Off-Page SEO & Link Building

Backlinks remain one of Google's strongest ranking signals.

### Link Quality Factors
- **Domain Authority (DA) / Domain Rating (DR)** of linking site
- **Relevance** — links from topically related sites carry more weight
- **Anchor text** — branded and natural anchor text is safest; avoid over-optimized exact-match anchors
- **Follow vs Nofollow** — dofollow links pass PageRank; nofollow/sponsored/UGC don't (but still have value)
- **Link placement** — editorial links in body content > footer/sidebar links

### Ethical Link Building Tactics
- **Guest posting** — write articles for relevant industry blogs with a contextual backlink
- **Digital PR** — publish data studies, surveys, or newsworthy content; pitch to journalists
- **Broken link building** — find broken links on relevant sites; offer your content as a replacement
- **Resource page outreach** — get listed on "best resources" / "useful tools" pages in your niche
- **HARO / Connectively** — respond to journalist queries to earn media mentions
- **Skyscraper technique** — find top-linked content; create a superior version; reach out to those linking to the original
- **Unlinked brand mentions** — find mentions of your brand that don't link; request a link

### What to Avoid (Google Penalties)
- Buying links
- Private blog networks (PBNs)
- Reciprocal link schemes ("link to me, I'll link to you")
- Comment spam / forum spam
- Low-quality directory submissions

---

## Pillar 5: Local SEO (if applicable)

For businesses targeting local customers:
- **Google Business Profile (GBP)** — claim, verify, and fully optimize; keep NAP (Name, Address, Phone) consistent everywhere
- **Local citations** — list on Yelp, Yellow Pages, industry directories; ensure NAP matches GBP exactly
- **Reviews** — actively request Google reviews; respond to all reviews
- **Local keywords** — target "[service] in [city]" and "[city] [service]" patterns
- **LocalBusiness schema** — implement on contact/location pages
- **Embed Google Map** on contact page

---

## Pillar 6: Measurement & Monitoring

### Essential Tools (Free)
| Tool | Purpose |
|------|---------|
| Google Search Console | Rankings, clicks, indexing issues, Core Web Vitals |
| Google Analytics 4 | Traffic, user behavior, conversions |
| Google PageSpeed Insights | Performance + Core Web Vitals |
| Google Rich Results Test | Validate schema markup |
| Bing Webmaster Tools | Bing search data (bonus coverage) |

### KPIs to Track
- **Organic impressions** and **clicks** (Search Console)
- **Average position** per keyword
- **Click-through rate (CTR)** — low CTR with high impressions = fix title/meta description
- **Organic sessions** (GA4)
- **Bounce rate / Engagement rate** (GA4)
- **Conversions from organic traffic**
- **Backlink count and DR growth** (Ahrefs/Semrush)

### Reporting Cadence
- **Weekly** — rankings check, Search Console errors
- **Monthly** — traffic trends, content performance, link acquisition
- **Quarterly** — full SEO audit, strategy review

---

## Quick SEO Audit Checklist

Run this when auditing an existing site:

**Technical**
- [ ] Site loads on HTTPS with no mixed content
- [ ] robots.txt is not blocking important pages
- [ ] Sitemap is submitted to Search Console
- [ ] No critical crawl errors in Search Console
- [ ] Core Web Vitals pass (LCP < 2.5s, CLS < 0.1)
- [ ] Mobile-friendly (pass Google's test)
- [ ] No duplicate content / missing canonical tags
- [ ] No redirect chains or broken links

**On-Page**
- [ ] Every page has a unique title tag and meta description
- [ ] H1 exists and is unique per page
- [ ] Images have descriptive alt text
- [ ] Target keyword is in title, H1, URL, and first paragraph
- [ ] Internal linking structure is logical

**Content**
- [ ] Content matches search intent for target keywords
- [ ] Author information is present (for E-E-A-T)
- [ ] Content is regularly updated

**Off-Page**
- [ ] Backlink profile has no toxic/spammy links (use Ahrefs/GSC Disavow if needed)
- [ ] Google Business Profile is claimed and complete (if local)

---

## Common SEO Mistakes to Flag

- **Keyword cannibalization** — multiple pages targeting the same keyword; consolidate or differentiate
- **Thin content** — pages with fewer than ~300 words rarely rank; expand or merge
- **Ignoring Search Console errors** — crawl errors, manual actions, and indexing issues must be fixed
- **No internal linking** — orphan pages (no internal links pointing to them) rarely rank
- **Slow page speed** — especially on mobile; largest competitive differentiator for many sites
- **Not optimizing for search intent** — writing a blog post when Google ranks product pages for that query
- **Duplicate title tags** — common on e-commerce sites; every page needs a unique title
