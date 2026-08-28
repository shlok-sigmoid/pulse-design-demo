## 8. Iconography & data-viz

### 8.1 lucide-react conventions

- Size with Tailwind classes, **never the `size` prop**: `h-4 w-4` default (buttons/nav), `h-3 w-3` in pills/badges, `h-3.5 w-3.5` status chips/trend arrows, `h-5 w-5`+ for tiles.
- Stroke: lucide default 2; `Check` gets heavier as it shrinks (`strokeWidth={2.5–3.5}`); custom SVGs are lighter (AiMascot 1.6, lens glyphs 1.9, Sparkline 1.75).
- Pairing: `inline-flex items-center gap-1.5`, icon first, icon matches text tone. Icon-in-tile: `h-7/8 w-7/8 rounded-lg` with a 10–12% tint bg; "AI made this" variant `bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-glow`.
- Fixed vocabularies: `CHAPTER_ICONS` (`src/lib/chapters.tsx`) — Compass/Lightbulb/Grid2x2/TrendingUp/Target/ListChecks/Rocket; coverage status — `CheckCircle2`/`CircleDot`/`CircleDashed`; SWOT — `ShieldCheck`/`TriangleAlert`/`Sparkles`/`Swords`.

### 8.2 AiMascot (Iris)

Inline 32×32 SVG, monochrome line-art in `currentColor` at strokeWidth 1.6 — tint with any `text-*` class. **Canonical presentation: white mascot on a `bg-brand-gradient` rounded chip** ("the gradient mascot chip = Iris"), e.g. `h-6 w-6 rounded-lg bg-brand-gradient text-white shadow-[0_2px_8px_-2px_rgba(1,1,201,0.5)]` with mascot `h-4 w-4`. Chat headers: mascot in `h-11 w-11 rounded-full bg-white/20 ring-1 ring-white/40` on the gradient band + presence dot.

### 8.3 Data-viz color mapping (the house rule)

| Encoding | Color |
|---|---|
| Ahead / positive | `pos #0f8a5f` (AA-darker `#0a6b49` on tinted fills) |
| Behind / negative | burnt orange `#bb3e0b` — **never red, never magenta** |
| Captured / strong / favorable | bright blue `#0187FA` |
| Partial / stall / watch-out | deep blue `#0101C9` |
| Missing | grey `#8a99ab` (track `rgba(11,33,56,0.07)`) |
| Needs review `[confirm]` | `warn #b7791f`, mono uppercase |
| Opportunity fills | `bg-brand-gradient-light` (pale `#B9C4FF→#BFE0FF`) |

Shared mechanics: every viz declares `const EASE = [0.2, 0.7, 0.2, 1]`; staggered entrances ~`i * 0.07`; `useReducedMotion` respected; all numbers `.stat-num`; kickers `.label-mono`; value labels as HTML overlays (not SVG text) so they don't scale with the viewBox; hover dims siblings to ~0.35–0.4; dark `bg-fg` tooltips with white `stat-num`; `sr-only` tables restate charts.

---

