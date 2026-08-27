## 3. Typography

### 3.1 Families

| Token | Stack | Loaded | Role |
|---|---|---|---|
| `font-sans` | `Inter, system-ui, sans-serif` | `@fontsource/inter` 400/500/600/700 | default everywhere (set on `body`, never re-declared) |
| `font-mono` | `'IBM Plex Mono', ui-monospace, monospace` | `@fontsource/ibm-plex-mono` 400/500 | numbers, kickers, metadata, HUD readouts |
| `font-display` | `var(--font-display)` (Newsreader → system serifs) | `@fontsource/newsreader` 400/600 — system serifs are the offline fallthrough | marquee headlines only |

**The display serif rule:** marquee headings (entry screens, heroes, workflow step titles, room titles) use the editorial serif via `font-display`. Body and UI **stay Inter** — never revert marquee headings to sans, never spread the serif into body copy. One deliberate exception: the Login headline is white Inter (not `font-display`) and the app's only fluid type — see the front-door note in §5.1.

Marquee formula: `font-display font-semibold text-balance` + `leading-[1.05–1.15]` + `tracking-tight` or `tracking-[-0.01em]`, sized in rem brackets with an `lg:` bump. Canonical ladders: `text-[1.5rem] lg:text-[1.9rem]` (workflow step h2), `text-[1.7rem] lg:text-[2rem]` (entry/workspace/room h1 — one serif per screen, everything below it is Inter), `text-[4rem]–[5rem] leading-none` (display stats/marketing).

### 3.2 Type scale (as actually used)

| Class | Size | Use |
|---|---|---|
| `text-[9px]`–`text-[11px]` | 9–11px | mono micro-labels/badges, always `font-mono uppercase` + wide tracking |
| `text-2xs` | custom token `0.6875rem/1rem` (11px/16px) | pills, badges, `.label-mono` kicker, metadata — the most-used size (169×) |
| `text-xs` | 12px | secondary captions, delta chips, empty-state notes |
| `text-[12.5px]` / `text-[13.5px]` | — | secondary / slightly-large body (`leading-relaxed text-fg-muted`) |
| `text-[13px]` | 13px | **the workhorse body size** (109×) — paragraphs, buttons, labels, inputs |
| `text-sm` | 14px | inputs, list-item titles (`text-sm font-semibold text-fg`) |
| `text-[14.5px]` | — | primary CTA label (`font-bold`) |
| `text-[15px]` | 15px | emphasized body / question titles |
| `text-base` | 16px | `SectionCard` h3: `text-base font-semibold tracking-tight text-fg` |
| `text-[16.5px]` | — | modal titles (`font-bold tracking-tight`) |
| `text-lg` / `text-xl` | 18/20px | panel titles (`font-bold tracking-tight`) / page-section headings (`font-semibold tracking-tight`) |
| `text-2xl`–`text-4xl` | 24–36px | big stats and page h1s; hero `MetricTile` value is `text-4xl text-brand-blue` |
| rem brackets `[1.35rem]`–`[5rem]` | — | the `font-display` marquee ladder (§3.1) |

### 3.3 Weights, tracking, leading

- Weights: `font-semibold` is the default emphasis (354×); `font-bold` for CTAs/panel titles/big stats; `font-medium` for pills and quiet mono metadata; 400 is implicit body. (Weights >700 render synthesized — Inter loads to 700, Plex Mono to 500.)
- Tracking: every sans heading gets `tracking-tight`; big serif heroes `tracking-[-0.01em]`. **Mono uppercase rule: smaller → wider** — `tracking-[0.14em]` at `text-2xs` up to `tracking-[0.18em]`–`[0.22em]` at 9–10px; small pills 0.06–0.12em.
- Leading: `leading-relaxed` is the dominant body line-height (154×); `leading-snug` multi-line titles; `leading-none` big stats; `leading-[1.03–1.15]` serif heroes. `text-balance` on headings (21×).
- Italic is rare (6 sites): quotes and asides only, always muted.

### 3.4 Component-class recipes (`src/index.css @layer components`)

```css
.label-mono   { @apply font-mono text-2xs uppercase tracking-[0.14em] text-fg-faint; }  /* THE kicker/eyebrow */
.stat-num     { @apply font-mono tabular-nums tracking-tight; }                         /* ALL numerals; size+color per-site */
.gradient-text{ @apply bg-brand-gradient bg-clip-text text-transparent; }               /* defined, currently unused */
```

### 3.5 Text color hierarchy

`text-fg` (headings, primary copy) → `text-fg-muted` (supporting prose — the largest bucket) → `text-fg-faint` (kickers, timestamps, disabled). `text-white` on gradient/deep surfaces. Accents use brand/semantic tokens (`text-brand-blue`, `text-pos`, …), not the fg ramp.

---

