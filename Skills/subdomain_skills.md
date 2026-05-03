# SKILL: Multi-Subdomain Website Builder

## Purpose
This skill guides an agentic AI when building a website that consists of a root domain and multiple subdomains. Each subdomain is a standalone site coded from scratch, but all share a consistent brand identity, design system, and navigation context.

---

## Core Principles

1. **Every subdomain is coded from scratch.** Do not copy-paste or reuse HTML from another subdomain. Each site is freshly generated.
2. **Shared context is always carried.** Before generating any subdomain, the agent must read the Shared Context block below and apply it fully.
3. **Each subdomain has its own purpose.** Tailor layout, components, and content to the goal of that specific subdomain.
4. **Consistency over cleverness.** The brand and navigation must feel identical across all subdomains. The content and layout may vary.

---

## Shared Context (Apply to Every Subdomain)

When building any page on any subdomain, always include the following:

### Brand Identity
- **Site name:** `[FILL IN: e.g. "Acme"]`
- **Tagline:** `[FILL IN: e.g. "Build smarter, ship faster"]`
- **Primary color:** `[FILL IN: e.g. #4F46E5 indigo]`
- **Font:** `[FILL IN: e.g. Inter, system-ui, sans-serif]`
- **Logo:** Use a text-based logo with the site name in bold unless an image path is provided.

### Global Navigation
Every subdomain must include a top navigation bar with:
- Logo / site name (left-aligned), linking to `https://yourdomain.com`
- Nav links to each subdomain (e.g. Blog, Shop, App, Docs)
- Active link highlighted based on current subdomain

### Global Footer
Every page must include a footer with:
- Copyright line: `© 2025 [Site Name]. All rights reserved.`
- Links: Privacy Policy | Terms | Contact

### CSS / Design Tokens
Use these CSS variables across all subdomains (paste into every `<style>` block):
```css
:root {
  --color-primary: #4F46E5;
  --color-primary-dark: #3730A3;
  --color-bg: #ffffff;
  --color-surface: #F9FAFB;
  --color-border: #E5E7EB;
  --color-text: #111827;
  --color-text-muted: #6B7280;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0,0,0,0.08);
}
```

---

## Subdomain Catalogue

Define your subdomains here. Each entry tells the agent what to build.

| Subdomain | URL | Purpose | Key Sections |
|---|---|---|---|
| Root | yourdomain.com | Landing / marketing homepage | Hero, Features, CTA |
| Blog | blog.yourdomain.com | Articles and content | Post list, Post page, Tags |
| Shop | shop.yourdomain.com | Products and checkout | Product grid, Product page, Cart |
| App | app.yourdomain.com | Web application / dashboard | Auth, Dashboard, Settings |
| Docs | docs.yourdomain.com | Documentation | Sidebar nav, Content, Code blocks |

Add or remove rows as needed.

---

## Build Instructions (Per Subdomain)

When asked to build a subdomain, the agent must follow these steps:

### Step 1: Read Context
Read the Shared Context block above in full. Do not skip this step.

### Step 2: Identify the Subdomain
Determine which subdomain is being built and its purpose from the Subdomain Catalogue.

### Step 3: Plan the Page Structure
Before writing code, outline:
- What sections this page needs
- What components are required (cards, forms, tables, sidebars, etc.)
- What mock/placeholder content to use

### Step 4: Write the HTML
Generate a single, self-contained `index.html` file with:
- Inline `<style>` using the shared CSS variables
- Full navigation (see Global Navigation above)
- Page-specific content and layout
- Full footer (see Global Footer above)
- Responsive layout using CSS Grid or Flexbox
- No external dependencies unless specified (prefer vanilla HTML/CSS/JS)

### Step 5: Verify Checklist
Before delivering the file, check:
- [ ] Shared CSS variables present
- [ ] Navigation includes logo + all subdomain links
- [ ] Active link is highlighted
- [ ] Footer present with correct text
- [ ] Page is mobile-responsive
- [ ] No hardcoded colors outside the CSS variable block
- [ ] Placeholder content is clearly marked with `<!-- PLACEHOLDER -->`

---

## File Naming Convention

Save each subdomain's files as:
```
/subdomains/
  root/index.html
  blog/index.html
  blog/post.html
  shop/index.html
  shop/product.html
  app/index.html
  app/dashboard.html
  docs/index.html
```

---

## Agentic Workflow Notes

- **One task = one subdomain.** Do not build multiple subdomains in a single agent run unless explicitly asked.
- **Ask for missing context.** If brand colors, font, or subdomain purpose are not defined, ask before building.
- **Do not hallucinate subdomain URLs.** Only use URLs defined in the Subdomain Catalogue.
- **State what you are building.** At the start of each run, output: `> Building: [subdomain name] — [subdomain URL]`
- **Mark placeholders.** Any text or image that needs to be replaced by a human must be wrapped in `<!-- PLACEHOLDER: description -->`.

---

## Example Agent Prompt

Use this prompt format when invoking the agent for a specific subdomain:

```
Using the WEBSITE_SKILL.md, build the [subdomain name] subdomain.
Subdomain URL: [subdomain URL]
Purpose: [one sentence describing the subdomain]
Sections to include: [list of sections]
Brand context: [paste Shared Context block or reference the skill file]
Output: a single self-contained index.html file.
```

---

## Extending This Skill

To add a new subdomain:
1. Add a row to the Subdomain Catalogue table.
2. Add a nav link to the Global Navigation list.
3. Run the agent with the example prompt above.

To update the brand:
1. Update the Brand Identity section.
2. Update the CSS variables block.
3. Regenerate all subdomains using the updated skill.

---

*This skill file should be placed in the root of your project and referenced at the start of every agent run that involves building or editing a subdomain.*
