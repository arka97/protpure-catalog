---
title: Design System
description: Colour tokens, typography, layout patterns and chart rules of the 2026 identity
phase: production
last_updated: 2026-10-02
owner: Protpure engineering
---

# Design system

The identity is built outward from the logo: its indigo, its italic serif (Old Standard TT) and its five dots.
Everything is defined once in `src/index.css` and exposed through `tailwind.config.ts`.

## Colour

All colours are HSL triplets in CSS variables. Components use the Tailwind names, never hex values.

| Token | Hex | Use |
| --- | --- | --- |
| `paper` | `#F6F4EE` | Page background |
| `paper-2` | `#EDEAE1` | Recessed panels, hover surfaces |
| `rule` | `#D9D5C9` | Hairlines, card borders |
| `card` | `#FFFFFF` | Cards, form fields |
| `ink` | `#14132B` | Text, dark surfaces, primary buttons |
| `ink-2` | `#4B4D62` | Secondary text (7.5:1 on paper) |
| `ink-3` | `#62647A` | Captions, mono labels (5.3:1 on paper) |
| `brand` | `#393185` | Logo indigo; the serif accent word in headlines |
| `brand-dot` | `#27488D` | Logo dots |
| `signal` | `#F0502E` | Coral: the quote button, chart marks, the closing band. Graphics and large type only |
| `signal-ink` | `#C13A1B` | Coral for small text (labels, numbering) |

Text on `signal` is always `ink` (5.1:1). White text on coral fails contrast: do not use it.

### Chromatography families

Each family has a mid tone (dots, strokes) and a tint (surfaces):

| Family | Token | Hex |
| --- | --- | --- |
| Metal affinity | `imac` | `#0E8FB8` |
| Ion exchange | `iex` | `#5148B8` |
| Hydrophobic interaction | `hic` | `#B8740F` |
| Metal removal | `mrc` | `#B03A7E` |
| Size exclusion | `sec` | `#259A54` |
| Formats (columns, kits, hardware) | `fmt` | `#716E60` |

Mixed-mode is drawn in two tones (`iex` + `hic`). A family colour never appears without its text label:
the hues are distinguishable in normal vision, but only just under colour-vision deficiency.
Static class names per family live in `src/lib/family-style.ts`.

### Dark sections

Add `theme-ink` to a section. It remaps the semantic tokens (`background`, `foreground`, `card`, `border`,
`ink-2`, `ink-3`, `rule`, `brand`), so the same components work unchanged on the dark surface.
`.dark` shares the mapping; no theme toggle is exposed.

## Typography

| Role | Family | Class |
| --- | --- | --- |
| Everything | Schibsted Grotesk (variable, 400–900) | default |
| One accent word per headline | Old Standard TT Italic, the logo's typeface | `.em` (or `<Em>`) |
| Eyebrows, numbering, table headings | IBM Plex Mono, uppercase | `.label` |
| Catalogue numbers, anything with a unit | IBM Plex Mono, case kept | `.code` |

Sizes: `.display-1` (hero), `.display-2` (page titles), `.display-3` (section titles), `.heading-4`, `.lede`.
Large figures use `.numeral` (the sans, tight tracking).

Rules:

- **Units and element symbols keep their case.** `.label` uppercases its text, so never put `mL`, `µm`, `cm/h`,
  `Co-NTA` or a catalogue number in it. Use `.code` or normal text.
- One `.em` per headline, at the end where possible.
- Fonts are self-hosted (`src/assets/fonts`, SIL OFL licences included). No external font requests.

## Layout

- `.shell`: page gutter and max width (1320 px).
- Section rhythm: `py-20 md:py-28`; a 12-column grid with the headline on 7 columns and the lede on 5 (`SectionHeader`).
- Inner pages start with `PageHeader` (breadcrumb, eyebrow, `h1`, lede, optional aside).
- Detail pages use a margin column: label + heading on 3 columns, content on 9.
- Radii: `rounded-panel` (1.75 rem) for cards and panels, `rounded-lg` for small boxes, pills for buttons and chips.
- Tables are hairline tables: a dark top rule, light row rules, no zebra.
- Every page ends with `CTASection` (the coral band), except Contact and Quote.

## Buttons

`Button` variants: `signal` (the one primary action on a view), `default` (ink), `outline`, `secondary`, `ghost`.
All are pills. `AddToQuote` wraps `Button` and handles the "Added" state.

## Illustration

- `Halftone` draws a dot field per family; the pattern says something about the technique
  (concentric for metal affinity, two poles for ion exchange, a diagonal for HIC, a ring for metal removal,
  large-to-small for size exclusion).
- `ColumnHero` is the animated column and trace on the home page (CSS keyframes in `index.css`,
  paused off-screen, still frame under reduced motion).
- Photographs are the client's own (`src/data/photos.ts`); use `Photo` so space is reserved and captions are consistent.

## Charts

`components/viz/Charts.tsx` holds one small SVG line/scatter chart and a data table. Conventions:

- One series per chart, drawn in `signal`; no legend.
- 2 px line; markers r = 4.5 with a 2 px ring in the surface colour.
- Every point is labelled directly, in the text colour, never in the series colour.
- Hairline solid grid; horizontal axis titles in sentence case with units in their proper case.
- Charts are laid out in real pixels from the measured width, so labels stay readable on phones.
- Every chart is followed by `DataTable` with the same numbers, and has a text summary for screen readers.
- Acceptance ranges are a shaded band with a label; reference values a labelled line.
- State the test conditions next to the chart.

Stat tiles (`StatTile`): figure, unit, what it is, and the condition or source underneath.

## Motion

- `Reveal` fades content up once when it scrolls into view.
- Hover states move by a few pixels at most.
- `prefers-reduced-motion` disables all of it.

## Accessibility baseline

- Text contrast at least 4.5:1, graphics and field outlines at least 3:1 (checked for every token pairing).
- Visible `:focus-visible` ring on every interactive element.
- Touch targets: 36 px or more for primary controls (40 px for icon buttons), never below 24 px (WCAG 2.2).
- Tested with axe-core on every route and every overlay state: no violations.
