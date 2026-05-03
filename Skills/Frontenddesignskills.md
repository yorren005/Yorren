---
name: yorren-website
description: Use this skill whenever building or updating the Yorren startup website. Covers the full single-page website with Hero, Blog (2 sections), and About Me pages. Enforces a modern, minimalist design system in strict black, white, and grey only — with liquid glass navigation, collapsible arrow-mode nav, premium animations toggle, scroll animations, and full responsiveness.
---

## Project Overview

**Startup name:** Yorren  
**Website type:** Single-page startup website with multi-section navigation  
**Theme:** Light only — white backgrounds, black typography, shades of grey exclusively. No dark mode.  
**Aesthetic:** Modern minimalist. Clean, open, confident. Lots of white space. Every element has purpose. Think polished SaaS product site — structured but approachable, premium but readable.  
**Mood:** Calm, clear, trustworthy. Not cold or sterile — warm through generous spacing and good type rhythm.

---

## Pages & Sections

Single `.html` file, anchor-linked sections scrolling vertically.

### 1. Hero (`#hero`)
- Full-viewport section, vertically centered content
- Yorren wordmark or logotype at top (nav handles this)
- Large bold headline — short, punchy, clear. States what Yorren does.
- One-line subheading in grey — supports the headline, plain English
- Single CTA button — solid black, white text, sharp or minimally rounded corners (4px max)
- Background: `#ffffff` or `#fafafa`
- No shapes, no textures, no illustrations — space and type carry the design
- Thin `1px` bottom divider line in `#e8e8e8`

### 2. Blog — Section 1 (`#blog-1`)
- Section label: e.g. "Latest Posts" or "From the Blog"
- Layout: 3-column card grid on desktop, 1-column on mobile
- Each card: greyscale cover image, post title, date, 1-line excerpt, "Read →" link
- Cards: flat, white background, `1px solid #e8e8e8` border, 4px radius max
- Hover: border darkens to `#aaaaaa`, subtle upward shift `translateY(-4px)`
- Section background: `#ffffff`

### 3. Blog — Section 2 (`#blog-2`)
- Section label: e.g. "In Depth" or "Featured"
- Different layout: one large featured post (full-width image + headline left, excerpt right) + 2 smaller posts below in a row
- Same greyscale image treatment, same flat card rules
- Section background: `#f4f4f4`

### 4. About Me (`#about`)
- Two-column layout on desktop: photo left, text right
- Photo: greyscale, square crop, no border, no shadow — just clean
- Name in large type, title/role in grey below
- Bio: 2–3 short paragraphs. Conversational, warm, first person. Not academic.
- Optional row of simple text links: e.g. Twitter, LinkedIn, Email — grey, underline on hover
- Section background: `#ffffff`

---

## Navigation

### Liquid Glass Style
- Fixed top, full width
- Background: `rgba(255, 255, 255, 0.65)`
- `backdrop-filter: blur(20px) saturate(180%)`
- `-webkit-backdrop-filter: blur(20px) saturate(180%)`
- Border-bottom: `1px solid rgba(0, 0, 0, 0.07)`
- Box-shadow: `0 2px 20px rgba(0, 0, 0, 0.05)`
- Height: `60px`
- On scroll past 60px: opacity increases to `0.85`, shadow deepens slightly

### Layout
- Left: "Yorren" wordmark — `font-weight: 700`, `font-size: 1.2rem`, color `#111`
- Right: nav links — Hero, Blog ▾, About

### Blog Dropdown (Collapsible Arrow)
- Clicking "Blog ▾" toggles a dropdown below the nav item
- Arrow chevron rotates `0deg → 180deg` on open (`transition: 0.2s ease`)
- Dropdown: white background, `1px solid #e8e8e8`, shadow, 4px radius
- Links: "Latest Posts" and "In Depth" — padding `12px 20px`, hover background `#f4f4f4`
- Dropdown animates open: `opacity 0→1`, `transform: translateY(-6px)→translateY(0)`, `0.2s ease`
- Closes on outside click or Escape key

### Mobile Nav (< 768px)
- Hamburger icon (3 lines → X on open) on the right
- Drawer slides down below nav — full width, white background
- Links stacked vertically
- Blog section has inline arrow toggle, sub-links indent and reveal on click
- Drawer closes on link click or outside tap

---

## Color System

Greyscale only. No hue, no tint.

```css
:root {
  --white:         #ffffff;
  --grey-50:       #fafafa;
  --grey-100:      #f4f4f4;
  --grey-200:      #e8e8e8;
  --grey-300:      #d0d0d0;
  --grey-400:      #aaaaaa;
  --grey-500:      #717171;
  --grey-700:      #3a3a3a;
  --black:         #111111;
  --glass-bg:      rgba(255, 255, 255, 0.65);
  --glass-border:  rgba(0, 0, 0, 0.07);
}
```

---

## Typography

### Fonts
- **Headings:** `Outfit` (weights 600, 700) — modern, geometric, highly readable
- **Body:** `Outfit` (weights 300, 400) — use same family for clean cohesion
- **Metadata / labels:** `Outfit` 400, uppercase, `letter-spacing: 0.08em`, `font-size: 0.75rem`, color `var(--grey-500)`
- Load from Google Fonts: `Outfit:wght@300;400;600;700`
- Never use: Inter, Roboto, Arial, system-ui, Space Grotesk, DM Sans

### Scale
- Hero headline: `clamp(3rem, 6vw, 6rem)`, weight 700, `letter-spacing: -0.03em`, color `var(--black)`
- Section title: `clamp(1.75rem, 3vw, 2.75rem)`, weight 600
- Body text: `1.0625rem` (17px), weight 400, line-height `1.75`, color `var(--grey-700)`
- Card title: `1.125rem`, weight 600, color `var(--black)`
- Small label: `0.75rem`, weight 400, uppercase, `letter-spacing: 0.08em`

---

## Images

- All images: `filter: grayscale(1) contrast(1.03)` via CSS
- Placeholder images from Unsplash (use direct image URLs)
- Blog cards: `aspect-ratio: 16/9`, `object-fit: cover`, no border-radius or max `2px`
- About photo: square, `max-width: 320px`, `width: 100%`
- No frames, no shadows on images — clean crop only

---

## Animations

### Toggle Button
- Fixed bottom-right: `position: fixed; bottom: 24px; right: 24px`
- Style: pill shape, `background: var(--black)`, white text, `font-size: 0.8rem`
- Label: "✦ Animations ON" / "✦ Animations OFF"
- Click toggles class `no-animations` on `<body>`
- State saved to `localStorage` and applied on page load

```css
body.no-animations *,
body.no-animations *::before,
body.no-animations *::after {
  animation: none !important;
  transition: none !important;
}
```

### Scroll Reveal (IntersectionObserver)
- All `.reveal` elements start: `opacity: 0; transform: translateY(24px)`
- On intersection: class `visible` added → `opacity: 1; transform: translateY(0)`
- Transition: `0.65s cubic-bezier(0.22, 1, 0.36, 1)`
- Children staggered via inline `transition-delay` (`0s`, `0.08s`, `0.16s`, `0.24s`...)
- Threshold: `0.15` — triggers when 15% of element is visible

### Page Load (Hero)
- Headline: `animation: fadeUp 0.6s ease forwards; animation-delay: 0.1s`
- Subheadline: same, delay `0.25s`
- CTA button: same, delay `0.4s`

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Hover States
- Cards: `transform: translateY(-4px); border-color: var(--grey-400)` — `0.2s ease`
- CTA button: `background: var(--grey-700)` — `0.15s ease`
- Nav links: `opacity: 0.55 → 1` — `0.15s ease`
- "Read →" links: arrow nudges right `2px` on hover

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsiveness

| Breakpoint | Layout |
|---|---|
| `< 480px` | 1-col everything, full-width cards, stacked about |
| `480–767px` | 1–2 col blog, compact nav drawer |
| `768–1023px` | Full horizontal nav, 2-col blog grid |
| `≥ 1024px` | 3-col blog grid, 2-col about, max-width `1140px` centered |

- No CSS frameworks — Grid + Flexbox only
- All padding/gap values use `clamp()` for fluid scaling
- Mobile touch targets: min `44px` height
- Images scale fluidly with `width: 100%; height: auto`

---

## Code Structure

One single `.html` file containing everything:

```
<head>
  Google Fonts link (Outfit)
  <style> — all CSS, using CSS variables
</head>
<body>
  <nav> — liquid glass, fixed
  <section id="hero">
  <section id="blog-1">
  <section id="blog-2">
  <section id="about">
  <button class="anim-toggle"> — fixed bottom-right
  <script> — IntersectionObserver, nav logic, animation toggle, smooth scroll
</body>
```

---

## Quality Checklist

Before delivering, verify:
- [ ] No hue anywhere — strictly greyscale
- [ ] Light background throughout — no dark sections
- [ ] Modern and minimal — not sterile, not editorial, not academic
- [ ] Outfit font loaded and applied correctly at all weights
- [ ] Liquid glass nav: blur + border + shadow working
- [ ] Blog dropdown: chevron rotates, sub-links animate in, closes on outside click
- [ ] Mobile drawer: opens/closes, blog sub-links toggle with arrow
- [ ] Animation toggle: switches correctly, persists via localStorage
- [ ] Scroll reveal: IntersectionObserver fires, stagger works
- [ ] All images greyscale via CSS filter
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Hover states smooth and restrained — no bounce or glow
- [ ] Copy tone: warm, direct, human — not corporate, not academic
