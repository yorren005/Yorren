---
name: schema-markup
description: Generate comprehensive, SEO-optimized structured data (Schema.org JSON-LD) markup for any website. Use this skill when building or editing websites with agentic tools (Cursor, Google's Project IDX, Windsurf, Bolt, v0, etc.) and the goal is to make all page content clearly understood by search engines (Google, Bing, Yahoo, DuckDuckGo) for rich results, knowledge panels, and accurate keyword ranking. Triggers: any mention of "schema", "structured data", "JSON-LD", "rich snippets", "SEO markup", "search engine visibility", or "schema.org". Also trigger when creating any new website page and SEO is a concern.
---

This skill produces production-ready **JSON-LD Schema Markup** following Schema.org vocabulary, optimized for Google's Rich Results, Bing's structured data parser, and all major crawlers. The output is injected into `<head>` as `<script type="application/ld+json">` blocks.

---

## Workflow

### Step 1 — Identify Page Type & Business Context

Before writing any markup, answer these questions from the codebase/brief:

| Question | Why It Matters |
|---|---|
| What type of page is this? (Home, Blog, Product, Contact…) | Determines which Schema types to use |
| What is the business category? | Selects the right `@type` (LocalBusiness, SoftwareApplication, etc.) |
| What content exists on the page? | Maps to specific Schema properties |
| Are there reviews, prices, events, people, FAQs? | Triggers additional nested schemas |
| What keywords should this page rank for? | Informs `description`, `name`, `keywords` field values |

---

### Step 2 — Choose the Right Schema Types

Always use the **most specific type available**. Never default to generic `Thing` or `WebPage` alone.

#### Page-Level Schemas (always include at minimum):

```
WebSite        → Homepage only. Enables sitelinks searchbox.
WebPage        → Every page. Subtypes: AboutPage, ContactPage, FAQPage, CollectionPage
BreadcrumbList → Any page with navigation depth > 1
```

#### Business / Organization Schemas:

```
Organization          → Companies, nonprofits, brands
LocalBusiness         → Physical locations (triggers Google Maps rich results)
  ├── Restaurant
  ├── MedicalBusiness → Clinics, hospitals
  ├── LegalService    → Law firms
  ├── FinancialService
  └── Store
Person                → Founders, authors, professionals
```

#### Content Schemas:

```
Article / NewsArticle / BlogPosting   → Editorial content
Product                               → E-commerce items (price, availability, reviews)
Service                               → Service offerings
Event                                 → Conferences, webinars, workshops
FAQPage                               → FAQ sections (expands in SERPs)
HowTo                                 → Step-by-step guides
Recipe                                → Food content
JobPosting                            → Career pages
Course                                → Educational content
SoftwareApplication                   → Apps, SaaS products
VideoObject                           → Embedded videos
ImageObject                           → Key images (hero, product)
```

#### Trust & Authority Schemas:

```
Review / AggregateRating   → Star ratings in search results
Offer / AggregateOffer     → Pricing blocks
ContactPoint               → Support, sales channels
SiteLinksSearchBox         → Homepage search
```

---

### Step 3 — Mandatory Base Template (Every Page)

Inject this into `<head>` on **every page** of the site:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "WebSite",
      "@id": "https://www.example.com/#website",
      "url": "https://www.example.com",
      "name": "Brand Name",
      "description": "One-sentence description — include primary keyword naturally.",
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.example.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },

    {
      "@type": "Organization",
      "@id": "https://www.example.com/#organization",
      "name": "Brand Name",
      "url": "https://www.example.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.example.com/logo.png",
        "width": 600,
        "height": 60
      },
      "sameAs": [
        "https://www.linkedin.com/company/example",
        "https://twitter.com/example",
        "https://www.facebook.com/example",
        "https://www.instagram.com/example"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-000-0000",
        "contactType": "customer service",
        "availableLanguage": ["English"]
      }
    },

    {
      "@type": "WebPage",
      "@id": "https://www.example.com/PAGE-SLUG/#webpage",
      "url": "https://www.example.com/PAGE-SLUG/",
      "name": "Page Title — Include Primary Keyword | Brand",
      "description": "Meta description text. 150–160 chars. Include primary + secondary keywords.",
      "isPartOf": { "@id": "https://www.example.com/#website" },
      "publisher": { "@id": "https://www.example.com/#organization" },
      "inLanguage": "en-US",
      "datePublished": "YYYY-MM-DD",
      "dateModified": "YYYY-MM-DD",
      "breadcrumb": { "@id": "https://www.example.com/PAGE-SLUG/#breadcrumb" }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://www.example.com/PAGE-SLUG/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Category Name",
          "item": "https://www.example.com/category/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Current Page Title"
        }
      ]
    }

  ]
}
</script>
```

> **Rule**: Always use `@graph` array to combine multiple schemas in one `<script>` block. This lets Google resolve entity relationships efficiently.

---

### Step 4 — Page-Specific Schema Templates

#### 🏠 Homepage

```json
{
  "@type": ["Organization", "LocalBusiness"],
  "@id": "https://www.example.com/#organization",
  "name": "Business Name",
  "description": "What you do — include your main service keyword and city/region.",
  "url": "https://www.example.com",
  "telephone": "+60-XX-XXXX-XXXX",
  "email": "hello@example.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "00000",
    "addressCountry": "MY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 1.4927,
    "longitude": 103.7414
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$"
}
```

---

#### 📝 Blog Post / Article

```json
{
  "@type": "BlogPosting",
  "@id": "https://www.example.com/blog/post-slug/#article",
  "headline": "Article Title — Primary Keyword Included",
  "description": "Article summary with secondary keywords. 150–200 chars.",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.example.com/images/featured.jpg",
    "width": 1200,
    "height": 628
  },
  "author": {
    "@type": "Person",
    "name": "Author Full Name",
    "url": "https://www.example.com/author/name/",
    "sameAs": "https://www.linkedin.com/in/authorname"
  },
  "publisher": { "@id": "https://www.example.com/#organization" },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "mainEntityOfPage": { "@id": "https://www.example.com/blog/post-slug/#webpage" },
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "articleSection": "Category Name",
  "wordCount": 1500,
  "inLanguage": "en-US"
}
```

---

#### 🛍️ Product Page

```json
{
  "@type": "Product",
  "@id": "https://www.example.com/products/product-name/#product",
  "name": "Product Name — Model / Variant",
  "description": "Full product description. Include use-case keywords.",
  "image": [
    "https://www.example.com/images/product-front.jpg",
    "https://www.example.com/images/product-back.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Brand Name"
  },
  "sku": "SKU-12345",
  "gtin13": "0000000000000",
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/products/product-name/",
    "priceCurrency": "MYR",
    "price": "299.00",
    "priceValidUntil": "YYYY-MM-DD",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": { "@id": "https://www.example.com/#organization" }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "124",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Reviewer Name" },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Review text here."
    }
  ]
}
```

---

#### ❓ FAQ Page / Section

```json
{
  "@type": "FAQPage",
  "@id": "https://www.example.com/faq/#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [primary keyword]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text. Include related keywords naturally. Minimum 50 words for best results."
      }
    },
    {
      "@type": "Question",
      "name": "How does [secondary keyword] work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Detailed answer text."
      }
    }
  ]
}
```

> **SEO Note**: FAQ schema expands your SERP real estate by showing Q&A directly in Google results. Use it on any page with 2+ questions.

---

#### 🛠️ Service Page

```json
{
  "@type": "Service",
  "@id": "https://www.example.com/services/service-name/#service",
  "name": "Service Name — e.g., Web Design in Johor Bahru",
  "description": "Describe the service with primary keyword + location + benefit.",
  "provider": { "@id": "https://www.example.com/#organization" },
  "areaServed": {
    "@type": "City",
    "name": "Johor Bahru"
  },
  "serviceType": "Web Design",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "MYR",
    "price": "1500",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "priceCurrency": "MYR",
      "price": "1500",
      "unitText": "project"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Service Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Package"
        }
      }
    ]
  }
}
```

---

#### 🎓 How-To Guide

```json
{
  "@type": "HowTo",
  "@id": "https://www.example.com/guides/how-to-do-something/#howto",
  "name": "How to [Achieve Goal] — Step-by-Step Guide",
  "description": "Learn how to [achieve goal] with these [N] proven steps.",
  "image": "https://www.example.com/images/howto-cover.jpg",
  "totalTime": "PT30M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "MYR",
    "value": "0"
  },
  "supply": [
    { "@type": "HowToSupply", "name": "Tool or item needed" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Step 1 Title",
      "text": "Detailed instruction for step 1. Include relevant keywords.",
      "image": "https://www.example.com/images/step1.jpg",
      "url": "https://www.example.com/guides/how-to-do-something/#step1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Step 2 Title",
      "text": "Detailed instruction for step 2."
    }
  ]
}
```

---

#### 📅 Event

```json
{
  "@type": "Event",
  "@id": "https://www.example.com/events/event-slug/#event",
  "name": "Event Name",
  "description": "What this event covers. Include topic keywords.",
  "startDate": "YYYY-MM-DDTHH:MM:SS+08:00",
  "endDate": "YYYY-MM-DDTHH:MM:SS+08:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Venue Name",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Venue Street",
      "addressLocality": "City",
      "addressCountry": "MY"
    }
  },
  "organizer": { "@id": "https://www.example.com/#organization" },
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/events/event-slug/",
    "price": "150",
    "priceCurrency": "MYR",
    "availability": "https://schema.org/InStock",
    "validFrom": "YYYY-MM-DD"
  },
  "image": "https://www.example.com/images/event-banner.jpg"
}
```

---

### Step 5 — Keyword Optimization Rules for Schema Fields

These fields are read by search engine NLP parsers. Write them as if writing meta tags:

| Schema Field | SEO Strategy |
|---|---|
| `name` | Include primary keyword; match `<title>` tag |
| `description` | 150–200 chars; primary + 1–2 secondary keywords; matches meta description |
| `keywords` | Array of 5–10 exact-match and LSI keywords |
| `headline` (Article) | H1-equivalent; primary keyword near the start |
| `articleSection` | Maps to site category/topic cluster |
| `areaServed` | Critical for local SEO; include city, region |
| `serviceType` | Exact service keyword as searched by users |
| `offers.price` | Always include; triggers price rich results |
| `sameAs` | Links to authoritative profiles (LinkedIn, Wikipedia, Wikidata) — builds entity authority |

---

### Step 6 — Implementation in Agentic Builders

#### Cursor / VS Code (Next.js / React)

Create a reusable utility at `lib/schema.ts`:

```typescript
// lib/schema.ts
export function generateOrganizationSchema(config: {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${config.url}/#organization`,
    name: config.name,
    url: config.url,
    description: config.description,
    logo: {
      "@type": "ImageObject",
      url: config.logo,
    },
    sameAs: config.sameAs ?? [],
  };
}

export function generateArticleSchema(post: {
  title: string;
  slug: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  siteUrl: string;
  orgId: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${post.siteUrl}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.description,
    image: post.image,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": post.orgId },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    keywords: post.keywords,
    mainEntityOfPage: `${post.siteUrl}/blog/${post.slug}/`,
  };
}
```

Inject in `app/layout.tsx` or page-level:

```tsx
// app/layout.tsx
import { generateOrganizationSchema } from "@/lib/schema";

export default function RootLayout({ children }) {
  const schema = generateOrganizationSchema({
    name: "My Brand",
    url: "https://www.mybrand.com",
    logo: "https://www.mybrand.com/logo.png",
    description: "Primary keyword-rich business description.",
    sameAs: ["https://linkedin.com/company/mybrand"],
  });

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

#### Plain HTML / Static Sites (Bolt, v0, Webflow custom code)

Paste directly before `</head>`:

```html
<script type="application/ld+json">
{ ...schema object here... }
</script>
```

For multi-schema pages, use one `@graph` block — never duplicate `<script>` tags for the same entity.

---

#### WordPress / CMS

If using a CMS, output via `wp_head` hook or theme `functions.php`:

```php
function add_schema_markup() {
  $schema = array(
    "@context" => "https://schema.org",
    "@type" => "Organization",
    "name" => get_bloginfo('name'),
    "url" => home_url(),
    "description" => get_bloginfo('description'),
  );
  echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
}
add_action('wp_head', 'add_schema_markup');
```

---

### Step 7 — Quality Checklist Before Shipping

Run through this before committing schema to production:

- [ ] **Validate** with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **Validate** with [Schema.org Validator](https://validator.schema.org/)
- [ ] All URLs are **absolute** (include `https://`)
- [ ] `@id` values use fragment identifiers (`#organization`, `#webpage`, `#article`)
- [ ] `datePublished` and `dateModified` use ISO 8601 format (`YYYY-MM-DD`)
- [ ] No fake reviews or misleading ratings (violates Google guidelines → manual penalty)
- [ ] Image URLs return `200 OK` and are publicly accessible
- [ ] `description` fields match or closely align with the page's HTML meta description
- [ ] `sameAs` links are live and authoritative
- [ ] Breadcrumb `position` values are sequential integers starting at `1`
- [ ] Schema is inside `<head>`, not `<body>`

---

### Step 8 — Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---|---|
| Using relative URLs (`/logo.png`) | Always use absolute URLs (`https://example.com/logo.png`) |
| Marking up content not visible on the page | Only mark up content the user can actually see |
| Using `WebPage` for a product page | Use `Product` with `WebPage` in `@graph` |
| Inventing reviews or fake star ratings | Only mark up real, user-generated reviews |
| Multiple `<script type="application/ld+json">` for same entity | Combine in one `@graph` array |
| Omitting `dateModified` on articles | Always include; Google uses it for freshness ranking |
| Generic description text with no keywords | Write descriptions like meta tags — keyword-first |
| Missing `@id` cross-references between types | Use `@id` URIs to link `WebPage → Organization → BreadcrumbList` |

---

### Step 9 — Advanced: Entity Authority (E-E-A-T Signals)

Google's quality rater guidelines reward **Experience, Expertise, Authoritativeness, Trustworthiness**. Schema helps signal this:

```json
{
  "@type": "Person",
  "@id": "https://www.example.com/#founder",
  "name": "Founder Full Name",
  "jobTitle": "CEO & Founder",
  "worksFor": { "@id": "https://www.example.com/#organization" },
  "url": "https://www.example.com/about/",
  "sameAs": [
    "https://www.linkedin.com/in/foundername",
    "https://twitter.com/foundername",
    "https://en.wikipedia.org/wiki/Founder_Name"
  ],
  "knowsAbout": ["Web Development", "SEO", "Digital Marketing"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "Google Analytics Certified"
  }
}
```

Link authors to their profiles via `sameAs` on every `BlogPosting`. This builds the author's entity profile in Google's Knowledge Graph over time.

---

## Quick Reference: Schema Type → Page Type Mapping

| Page Type | Required Schemas | Optional Add-ons |
|---|---|---|
| Homepage | `WebSite`, `Organization`/`LocalBusiness` | `SiteLinksSearchBox` |
| About Page | `AboutPage`, `Person` (founder), `Organization` | `Organization` details |
| Blog Index | `CollectionPage`, `BreadcrumbList` | `WebSite` |
| Blog Post | `BlogPosting`, `BreadcrumbList`, `Person` (author) | `HowTo`, `FAQPage` |
| Product Page | `Product`, `Offer`, `BreadcrumbList` | `AggregateRating`, `Review` |
| Category Page | `CollectionPage`, `BreadcrumbList` | `ItemList` |
| FAQ Page | `FAQPage` | `WebPage` |
| Contact Page | `ContactPage`, `LocalBusiness` | `ContactPoint` |
| Services Page | `Service`, `Organization` | `Offer`, `AggregateRating` |
| Event Page | `Event` | `Offer`, `Place` |
| Job Page | `JobPosting`, `Organization` | — |
| Recipe Page | `Recipe` | `AggregateRating`, `HowToStep` |
| Video Page | `VideoObject` | `BreadcrumbList` |
