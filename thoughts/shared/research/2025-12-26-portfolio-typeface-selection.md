---
date: 2025-12-26T23:09:29+11:00
git_commit: 7eaa869c37057362085c39048b36e8b98400068d
branch: styling-first-pass
repository: idamadam.com
topic: "Portfolio Typeface & Color System for Top Tech Companies"
tags: [research, typography, fonts, portfolio, branding, color-system]
status: complete
last_updated: 2025-12-26
last_updated_by: claude
---

# Research: Portfolio Typeface Selection for Top Tech Companies

Establishing a refined typeface set for a design portfolio targeting roles at Anthropic, Apple, Vercel, Airbnb, Stripe, and similar companies.

## Recommendation

**Keep Inter as your primary typeface. It's the right choice.** Inter is used by designers at Apple (Johnyvino, Ethan Chng), featured prominently on Michelle Gore's portfolio, and is the foundation of Vercel's Geist design system. It signals you understand modern UI design without being trendy. For monospace, stick with Geist Mono (system mono stack is also fine). Skip adding a serif unless you're doing editorial-heavy content.

Your current setup (Inter + Geist Mono) is already aligned with what designers at your target companies use. The refinement opportunity is in *how* you use these fonts (weight variation, spacing, hierarchy) rather than *which* fonts you choose.

## Quick Comparison

| Option | Signal | Complexity | Risk | Verdict |
|--------|--------|------------|------|---------|
| A: Inter only | "I ship product" | Minimal | Low | **Recommended** |
| B: Inter + Instrument Serif | "Design-forward" | Low | Low | Good alternative |
| C: Söhne/Aeonik (premium) | "I invest in craft" | Medium | Medium | Skip unless budget allows |

## Constraints Considered

- **Stack**: Next.js 16, Tailwind CSS 4, next/font/google
- **Current setup**: Inter (body) + Geist Mono (code)
- **Existing patterns**: Typography token system already in place
- **Priority**: Professional credibility at top tech companies, simplicity, fast load times

## What Designers at Target Companies Actually Use

### Apple Designers
| Designer | Portfolio | Primary Font | Notes |
|----------|-----------|--------------|-------|
| Johnyvino | johnyvino.com | **Inter** + Instrument Serif | Multi-weight Inter, serif for accents |
| Ethan Chng | ethanchng.com | **Inter** + Inter Display | Variable fonts, SF Pro fallback |
| Michelle Gore | michellegore.com | **Inter** + Europa + Karla | Three sans-serif layered system |

### Stripe Designers
| Designer | Portfolio | Primary Font | Notes |
|----------|-----------|--------------|-------|
| Karolis Kosas | karoliskosas.com | **Aeonik** | Single typeface, clean minimal |

### Airbnb Designers
| Designer | Portfolio | Primary Font | Notes |
|----------|-----------|--------------|-------|
| Jonathan Rahmani | jonathan.cv | **Moderat** + New Burns | Sans + serif pairing |
| Arlen McCluskey | arlenmccluskey.com | Unknown (minimal site) | - |

### Company Brand Fonts (for context)
| Company | Website Font | Notes |
|---------|--------------|-------|
| Anthropic | Styrene + Tiempos | Custom brand fonts |
| Vercel | Geist Sans/Mono | Open source, designed for UI |
| Stripe | Söhne | Premium, geometric |
| Linear | Inter UI | Clean, functional |
| Apple | SF Pro | System font, not available for web |

## Option A: Inter Only (Recommended)

### Why this works
Inter is the de facto standard for product design portfolios. It's used by designers at Apple, appears on Linear, and is recommended by every major portfolio guide. It signals you understand modern UI design without trying too hard. Your target companies (Anthropic, Vercel, Stripe) all hire designers who use Inter.

### Implementation sketch
```tsx
// layout.tsx - simplified
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add 500 for medium weight
});

// Use system mono stack instead of loading Geist Mono
// --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
```

### Similar to in codebase
Already implemented. Just needs cleanup per your existing research.

### Gotchas
- Ensure you're using Inter's medium weight (500) for subtle hierarchy
- Consider Inter Display for hero text at 48px+ for better optical balance
- Variable font version gives you more weight options but larger file size

## Option B: Inter + Instrument Serif

### Why this works
Adding a high-quality display serif creates visual interest and signals design sophistication. Johnyvino (Apple HI Designer) uses this exact pairing. Instrument Serif is free from Google Fonts and designed specifically for display use.

### Implementation sketch
```tsx
import { Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

// Use serif for hero headlines only
// .type-display { font-family: var(--font-display); }
```

### When to use this
- Hero headlines (display size, 48px+)
- Section headers (sparingly)
- Pull quotes or testimonials

### Gotchas
- Only use serif at display sizes (26px+)
- Italic is more interesting than regular for accents
- Don't overuse or it becomes distracting

## Option C: Premium Typefaces (Söhne/Aeonik)

### Why you might consider this
Premium typefaces signal investment in craft. Stripe uses Söhne. Karolis Kosas (Stripe designer) uses Aeonik. These fonts have refined details that distinguish serious portfolios.

### The fonts
- **Söhne** (Klim Type Foundry): ~$150-300, Stripe's website font
- **Aeonik** (CoType Foundry): ~$50-200, modern workhorse
- **Neue Montreal** (Pangram Pangram): ~$50, trendy grotesque

### Why I'm ruling this out for you
1. Inter is free and already excellent
2. License management adds complexity
3. Subtle improvements don't justify cost for a job search
4. Premium fonts can signal "style over substance" if not executed perfectly

## What I Ruled Out

- **Geist Sans**: Redundant with Inter, adds no value. Keep Geist Mono only for code.
- **IBM Plex Sans**: Already removed from your codebase. It's fine but Inter is better for portfolios.
- **Multiple sans-serif pairing**: Michelle Gore uses 3 sans-serifs which is over-engineered. One is enough.
- **SF Pro**: Not available for web licensing. Only use if specifically building iOS demos.
- **Playfair Display**: Too editorial/traditional for tech company portfolios.

## Implementation Recommendation

### Immediate (0 effort)
Keep your current Inter + Geist Mono setup. It's correct.

### Optional Enhancement (1-2h)
1. Add Inter weight 500 (medium) for subtle hierarchy
2. Replace Geist Mono with system mono stack (faster load, no visual difference)
3. Consider adding Instrument Serif for hero headlines only

### Your updated layout.tsx
```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### Updated globals.css
```css
@theme inline {
  --font-sans: var(--font-inter);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

## Typography Best Practices from Top Portfolios

### Common patterns observed
1. **Single typeface dominance**: Most portfolios use one sans-serif, varied by weight
2. **Weight hierarchy**: 400 for body, 500/600 for subheads, 700 for emphasis
3. **Generous line-height**: 1.5-1.7 for body text
4. **Tight tracking on headlines**: -0.02em to -0.04em
5. **Large display sizes**: Hero text often 48-72px+

### What distinguishes top portfolios
- Consistent application (not font choice)
- White space and restraint
- Clear hierarchy through weight, not multiple fonts
- High contrast between headline and body sizes

## Sources

- [Stripe Designer Portfolios](https://medium.com/top-designers-portfolio/4-amazing-portfolios-of-stripe-designers-1784296da55b) - Karolis Kosas uses Aeonik
- [Apple Designer Portfolios](https://medium.com/top-designers-portfolio/4-amazing-portfolios-of-apple-designers-95eb496ea69f) - Overview of Apple designers
- [Johnyvino Portfolio](https://johnyvino.com) - Apple HI Designer, Inter + Instrument Serif
- [Ethan Chng Portfolio](https://ethanchng.com) - Apple Design Team 2025, Inter-based
- [Jonathan Rahmani Portfolio](https://jonathan.cv) - Airbnb designer, Moderat + New Burns
- [Anthropic Typography](https://type.today/en/journal/anthropic) - Uses Styrene + Tiempos
- [Stripe Website Fonts](https://fontsinuse.com/uses/35338/stripe-website-2020) - Switched to Söhne in 2020
- [Vercel Geist Typography](https://vercel.com/geist/typography) - Geist design system
- [Top Portfolio Fonts 2025](https://www.playbook.com/blog/top-10-fonts-for-your-design-portfolio/) - Industry recommendations
- [Font Pairing Trends 2025](https://pangrampangram.com/blogs/journal/best-font-pairings-2025) - Serif/sans-serif guidance
- [Inter on Typewolf](https://www.typewolf.com/inter) - Inter usage and pairings

---

## Follow-up: Color System Research

### Current State

Your existing color system in `globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#fefefe` | Page background |
| `--foreground` | `#1a1d23` | Base text |
| `--primary` | `#1a1d23` | Headlines |
| `--secondary` | `#6b7280` | Body text |
| `--tertiary` | `#9ca3af` | Captions, labels |
| `--muted` | `#f8f9fa` | Surface backgrounds |
| `--border` | `#e5e7eb` | Borders |
| `--accent` | `#2563eb` | Links, focus |
| `--warm-accent` | `#f59e0b` | Warning, highlights |

### What Designer Portfolios Use

| Designer | Background | Text | Accent | Theme |
|----------|------------|------|--------|-------|
| Karolis Kosas (Stripe) | `#ffffff` | `#000000` | `#1500ff` (blue) | Stark minimal |
| Johnyvino (Apple) | `#1f1104` (dark brown) | `#ffffff` | `#ec662b` (rust) | Warm dark |
| Michelle Gore (Apple) | `#ffffff` | `#000000` | Multiple pastels | Light with color |
| Ethan Chng (Apple) | `#ffffff` | `#000000` | `#09f` / `#2f80eb` (blue) | Clean minimal |
| Jonathan Rahmani (Airbnb) | `#1a231c` (forest) | `#ffffff` | Pastels per project | Dark with warmth |

### Anthropic Brand Colors (for context)

| Color | Hex | Name | Usage |
|-------|-----|------|-------|
| Rust/Terracotta | `#CC785C` | Antique Brass | Primary brand |
| Warm Gray | `#828179` | Friar Gray | Secondary |
| Off-white | `#F0EFEA` | Cararra | Backgrounds |
| Near-black | `#141413` | Cod Gray | Text |
| Claude Orange | `#C15F3C` | Crail | Claude brand |

Anthropic's approach: warm neutrals, no pure white or black, terracotta accent.

### Color System Recommendation

**Your current palette is solid but could be refined.** Here's a suggested evolution:

#### Option A: Refine Current (Minimal change)

Keep your grays, but consider:
1. Warm up your background slightly (pure white → off-white)
2. Add a personality accent beyond utility blue
3. Consider whether you want a warm or cool personality

```css
:root {
  /* Refined neutrals - slightly warmer */
  --background: #fafaf9;      /* Warm white (was #fefefe) */
  --foreground: #18181b;      /* Zinc-900 (was #1a1d23) */
  --primary: #18181b;
  --secondary: #52525b;       /* Zinc-600 (was #6b7280) */
  --tertiary: #a1a1aa;        /* Zinc-400 (was #9ca3af) */
  --muted: #f4f4f5;           /* Zinc-100 (was #f8f9fa) */
  --border: #e4e4e7;          /* Zinc-200 (was #e5e7eb) */

  /* Accent - pick one direction */
  --accent: #2563eb;          /* Keep blue for utility */
}
```

#### Option B: Anthropic-Inspired Warm Palette

Align with Anthropic's aesthetic while keeping it professional:

```css
:root {
  /* Warm off-white background */
  --background: #faf9f7;
  --foreground: #1c1917;      /* Stone-900 */
  --primary: #1c1917;
  --secondary: #57534e;       /* Stone-600 */
  --tertiary: #a8a29e;        /* Stone-400 */
  --muted: #f5f5f4;           /* Stone-100 */
  --border: #e7e5e4;          /* Stone-200 */

  /* Warm accent (Anthropic-like) */
  --accent: #c2410c;          /* Orange-700 */
  --accent-foreground: #ffffff;
}
```

#### Option C: High-Contrast Minimal (Like Stripe designers)

Maximum restraint, let work speak:

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #000000;
  --secondary: #525252;       /* Neutral-600 */
  --tertiary: #a3a3a3;        /* Neutral-400 */
  --muted: #fafafa;           /* Neutral-50 */
  --border: #e5e5e5;          /* Neutral-200 */

  /* Single sharp accent */
  --accent: #0000ff;          /* Pure blue (like Karolis) */
}
```

### Building a Flexible Gray Scale

For future shade picking, establish a full neutral scale:

```css
:root {
  /* Neutral scale (Zinc-based, slightly warm) */
  --neutral-50: #fafafa;
  --neutral-100: #f4f4f5;
  --neutral-200: #e4e4e7;
  --neutral-300: #d4d4d8;
  --neutral-400: #a1a1aa;
  --neutral-500: #71717a;
  --neutral-600: #52525b;
  --neutral-700: #3f3f46;
  --neutral-800: #27272a;
  --neutral-900: #18181b;
  --neutral-950: #09090b;

  /* Semantic mapping */
  --background: var(--neutral-50);
  --foreground: var(--neutral-900);
  --primary: var(--neutral-900);
  --secondary: var(--neutral-600);
  --tertiary: var(--neutral-400);
  --muted: var(--neutral-100);
  --border: var(--neutral-200);
}
```

This gives you the full scale to pick from while maintaining semantic tokens.

### Recommendation

**Go with Option A (refined current) or Option B (warm shift) based on personal preference.**

| Question | Option A | Option B |
|----------|----------|----------|
| Do you want to feel "tech/modern"? | Yes | - |
| Do you want to feel "crafted/warm"? | - | Yes |
| Do you admire Anthropic's aesthetic? | - | Yes |
| Do you want maximum neutrality? | Yes | - |

Both are valid. The key insight from researching these portfolios:

1. **Restraint matters more than choice** - 3-4 grays + 1 accent beats a complex palette
2. **Warm vs cool is personality** - Neither is wrong
3. **True black/white vs near-black/off-white** - Top designers split 50/50
4. **Single accent color** - Almost all portfolios use one, applied sparingly

### Color Sources

- [Anthropic Brand Colors](https://brandfetch.com/anthropic.com) - Official palette
- [Minimalist Color Palettes](https://hookagency.com/blog/minimalistic-color-palettes/) - Strategy guide
- [Design System Color Tokens](https://medium.com/@tarun_design00/color-system-color-theory-primitives-semantics-tokens-567f64368d30) - Token architecture
- [Portfolio Color Palettes](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio) - Specific examples
- [UI Color Palette Best Practices](https://www.interaction-design.org/literature/article/ui-color-palette) - IxDF guide
