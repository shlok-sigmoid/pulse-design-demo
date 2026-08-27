# Design System — AIa Brand Planning (Frontend)

| | |
|---|---|
| **Product** | AIa Brand Planning — React frontend (`aia-brand-planning`) |
| **Document status** | Canonical design reference — organization-wide |
| **Version** | 1.6 |
| **Last generated** | 2026-08-13 (extracted and verified from the codebase); v1.1 2026-08-14 — analyst rooms aligned to the workspace type scale (one serif h1 per screen), analyst-brief selection unified on the brand gradient; v1.2 2026-08-18 — app-wide journey redesign: shared AppHeader/breadcrumbs, opening grammar (§6.11), chat identity unified, SectionCard chrome tiers; v1.3 2026-08-19 — hybrid journey (Iris Console home, JourneyBar, GuideStrip, §6.12), all page containers full-bleed; v1.4 2026-08-26 — governance layer: content density & progressive disclosure (§11), new-project adoption protocol (§12), design review gate & QA matrix (§13); document maintenance renumbered to §14; v1.5 2026-08-27 — full-width mandate: a screen never renders as a narrow centered column, page containers are full-bleed (§5.1); v1.6 2026-08-27 — responsive by default: every screen holds from phone to ultrawide without being asked (§5.3) |
| **Source of truth** | `tailwind.config.ts` + `src/index.css` — if this document and the code disagree, the code wins |
| **Stack** | Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · lucide-react |

**Purpose.** This is the single reference for anyone building or reviewing UI in this application. It captures the complete design language — color, typography, surfaces, layout, components, motion, iconography, and voice — with exact values, so that new UI can be produced on-brand without reverse-engineering the codebase.

**How to use it.** Building a new screen or component: read §1 (principles), then pull exact recipes from §4–§6. Choosing colors: §2. Setting type: §3. Adding motion: §7. Structuring text-heavy content or a page that has outgrown its scroll: §11. Standing this system up in a new project: §12 — when this document is present, everything is designed from it by default. Reviewing a PR for design fidelity: check it against §10 (the do/don't checklist), then confirm it through the §13 review gate — nothing is done until that gate passes.

## Table of contents

1. [Design identity & principles](#1-design-identity--principles)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Surfaces & elevation](#4-surfaces--elevation)
5. [Layout & spacing](#5-layout--spacing)
6. [Components](#6-components)
7. [Motion](#7-motion)
8. [Iconography & data-viz](#8-iconography--data-viz)
9. [Voice & microcopy](#9-voice--microcopy)
10. [Rules — do / don't](#10-rules--do--dont)
11. [Content density & progressive disclosure](#11-content-density--progressive-disclosure)
12. [Adoption protocol — new projects](#12-adoption-protocol--new-projects)
13. [Design review gate & QA](#13-design-review-gate--qa)
14. [Document maintenance](#14-document-maintenance)

---

## 1. Design identity & principles

A **light pharma canvas** (`color-scheme: light`): soft blue-tinted whites, deep navy ink, and one brand gradient — deep blue `#0101C9` → bright blue `#0187FA` — that marks every primary action and everything Iris (the AI analyst) touches.

Core principles, all enforced in code:

1. **Elevation = brighter.** The `ink` scale runs deepest (`ink-950`, pale blue) → most elevated (`ink-700`, pure white). Raised surfaces are whiter, not shadow-heavier.
2. **No red, ever.** Negative/danger is magenta-purple (`neg #a21caf`, deeper `#b4276e`) — it stays in the blue/purple family by design.
3. **No fill is ever flat** where the system provides a gradient. Primary fills use `bg-brand-gradient`; even the green "success path" ships as `bg-gradient-green` "so no fill is ever flat" (config comment).
4. **The AI is ambient, not loud.** Iris presence is signalled by quiet looping texture (orbiting comet borders, dot grids, HUD brackets, scan sweeps) — never spinners or checkmarks on analyst surfaces. "Ambient pinging is noise": one-shot hails, not loops.
5. **Two voices of type.** Editorial serif (`font-display`) for marquee headlines only; Inter for all body/UI; IBM Plex Mono for every number, kicker, and metadata readout.
6. **Prefer primitives.** `Pill`, `SectionCard`, `MetricTile`, `ProgressBar`, `.card`, `.label-mono`, `.stat-num` — compose these instead of one-off styling.
7. **AA contrast on white.** Semantic colors are pre-darkened; small text on tinted surfaces uses the deeper inks (`#8a5a12` gold, `#0b7a52` green, `#0101C9` blue).

---

## 2. Color

### 2.1 Ink scale (canvas / elevation)

| Token | Hex | Role |
|---|---|---|
| `ink-950` | `#DBE6FA` | deepest recessed pale blue |
| `ink-900` | `#ECF6FF` | base / body ("surface light") |
| `ink-850` | `#f6f9fc` | translucent card base |
| `ink-800` | `#ffffff` | solid card / elevated surface |
| `ink-750` | `#ffffff` | same as 800 |
| `ink-700` | `#ffffff` | same as 800 |

The top three steps are all white — elevation above `ink-850` is expressed with shadow + blur, not color.

### 2.2 Brand

| Token | Hex | Role |
|---|---|---|
| `brand-blue` | `#0187FA` | primary bright blue |
| `brand-sky` | `#0187FA` | alias of bright blue (legacy name) |
| `brand-purple` | `#0101C9` | **deep blue** — legacy name, no longer violet; the gradient's deep end |
| `brand-glow` | `#0187FA` | halos / glows |

Only two distinct brand hexes exist in the app shell: `#0187FA` and `#0101C9`. The one deliberate exception is the Login hero, which uses its own royal-blue family (`#2B47E0` / `#3A55EA` / `#5470FF` / `#8FB2FF` — see the front-door note in §5.1). The old palette (`#0093d0` / `#2bb8ff` / `#7c3aed`, still cited in CLAUDE.md) is dead — its last code survivor left with `VarianceWaterfall.tsx` (removed 2026-08-17 with LE Refresh).

### 2.3 Surface / text / lines

| Token | Value | Role |
|---|---|---|
| `surface` | `#E7F1FF` | elevated light surface fill |
| `fg` | `#0b2138` | deep Pfizer-navy ink (default text) |
| `fg-muted` | `#52647a` | secondary text |
| `fg-faint` | `#8a99ab` | tertiary text / metadata |
| `line` | `rgba(11,33,56,0.10)` | universal hairline border |
| `line-strong` | `rgba(11,33,56,0.18)` | edges against busy content (chat docks, drawers) |

### 2.4 Semantic (AA-darkened for white backgrounds)

| Token | Hex | Meaning |
|---|---|---|
| `pos` | `#0f8a5f` | success / positive / ahead |
| `neg` | `#a21caf` | negative / danger — **magenta, never red** |
| `warn` | `#b7791f` | warning / needs review |
| `info` | `#0b76c4` | informational / evidence |

### 2.5 Gradients (`backgroundImage` tokens)

| Token | Value | Use |
|---|---|---|
| `bg-brand-gradient` | `linear-gradient(270deg, #0101C9 0%, #0187FA 100%)` | THE primary gradient — CTAs, active pills, card caps, Iris chips (~140 uses) |
| `bg-brand-gradient-light` | `linear-gradient(270deg, #B9C4FF 0%, #BFE0FF 100%)` | pale fill that keeps dark text readable (inactive pills, "opportunity" funnel bars) |
| `bg-brand-soft` | `linear-gradient(270deg, rgba(1,1,201,0.10), rgba(1,135,250,0.14))` | tinted wash for chips/headers |
| `bg-surface-light` | `linear-gradient(93deg, #EDEFFF 2.9%, #ECF6FF 99.52%)` | page canvas (consumed only by `body`) |
| `bg-gradient-green` | `linear-gradient(135deg, #19c08a 0%, #0b7a52 100%)` | success / "Improve" / completed path |
| `bg-gradient-green-soft` | `linear-gradient(135deg, rgba(25,192,138,0.16), rgba(11,122,82,0.18))` | soft green wash |

### 2.6 CSS custom properties (`:root`)

| Var | Value | Meaning |
|---|---|---|
| `--font-display` | `"Newsreader", "Source Serif 4", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif` | editorial serif stack — Newsreader ships via `@fontsource/newsreader` 400/600; system serifs are the offline fallthrough |
| `--lens-challenge` | `#0187FA` | AI Analyst "Challenge" lens accent |
| `--lens-coherence` | `#0101C9` | "Coherence" lens accent |
| `--lens-evidence` | `#0b76c4` | "Evidence" lens accent |
| `--src-neutral` | `#52647a` | reserved neutral tint for non-branded provenance (currently unconsumed) |

### 2.7 De-facto rgba/hex tokens (recurring literals — use these, don't invent)

| Literal | Role |
|---|---|
| `rgba(11,33,56,α)` | the navy-alpha system: borders, shadows, scrims, scrollbars (α 0.04–0.75) |
| `rgba(1,135,250,α)` / `rgba(1,1,201,α)` | brand-blue / deep-blue glows, rings, pulses |
| `#0b7a52` | AA green ink on tinted surfaces (deep end of `gradient-green`) |
| `#19c08a` | bright green (gradient's light end) |
| `#dcf4e8 #e5f6ee #e9f9f1 #f3fcf8` | green tint ramp for accept chips/washes |
| `#8a5a12` | AA gold ink (on washes `#f9f3eb` / `#f6efdf`, hairline `#e9d7bc`) |
| `#c9891f` | bright gold — risk cap gradient `from-[#c9891f] to-[#8a5a12]` |
| `#866017` | cited-slide gold marker (SourceInspector) |
| `#b4276e` | deep danger magenta (Executive Lens / decision ledger) — still not red |
| `#14171c #9aa2ad #e7e9ee #d0d5dd` | SourceInspector drawer neutral micro-palette (drawer chrome only) |
| `#f6f7f9` | analyst-room canvas (Executive Lens + Risks & Opportunities only) — overrides the blue `surface-light` body wash |

### 2.8 Semantic meaning → color, in practice

| Meaning | Treatment |
|---|---|
| Primary action / active | `bg-brand-gradient` + `text-white` + `shadow-glow` |
| AI / Iris | brand blue-purple family; header gradient `linear-gradient(120deg, #0b76c4 0%, #0187FA 35%, #0101C9 100%)` |
| Success / completed | `pos`, `bg-gradient-green`, ink `#0b7a52` |
| Danger / rejected | magenta `neg #a21caf` (Pills) / `#b4276e` (lens surfaces) — **never red** |
| Warning / risk | `warn #b7791f`; small-text ink `#8a5a12`; cap `#c9891f→#8a5a12` |
| Info / evidence | `info #0b76c4` |
| Structural status (not good/bad) | bright blue `#0187FA` = captured/strong; deep blue `#0101C9` = partial/stall; grey `#8a99ab` = missing |

### 2.9 Global chrome color

- `body`: `bg-ink-900 text-fg font-sans antialiased` + fixed 3-layer background: bottom-right radial `rgba(1,135,250,0.10)` glow, top-left radial `rgba(1,1,201,0.09)` glow, over `linear-gradient(93deg, #EDEFFF 2.9%, #ECF6FF 99.52%)`.
- `::selection`: `rgba(1,135,250,0.22)`. `:focus-visible`: `outline: 2px solid rgba(1,135,250,0.8); outline-offset: 2px; border-radius: 4px`. Rounded/pill and segmented controls suppress this outline and wear an explicit ring instead: `focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60` is the dominant recipe (56× `focus:outline-none`, 20× the `/60` ring, plus `/50`/`/25`/`/20` variants) — the offset rectangle outline reads broken against a pill radius.
- Scrollbars: thin, navy thumb — WebKit `rgba(11,33,56,0.18)` (hover `0.30`); the standard `scrollbar-color` property (what Firefox renders) uses `rgba(11,33,56,0.20)`; `.scrollbar-visible` variant uses deep-blue track `rgba(1,1,201,0.08)` + thumb `rgba(1,1,201,0.45)`.

---

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

## 4. Surfaces & elevation

### 4.1 The glass card

```css
.card { @apply rounded-2xl border border-line bg-ink-800/70 shadow-card backdrop-blur-sm; }
```
= radius `1.25rem`, hairline `rgba(11,33,56,0.10)`, white at 70% opacity, `blur-sm` glass over the blue-tinted canvas. This is the base of `SectionCard`, `MetricTile`, and most panels.

### 4.2 Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 2px 0 rgba(11,33,56,0.04), 0 10px 28px -16px rgba(11,33,56,0.20)` | resting elevation (119×) |
| `shadow-glow` | `0 0 0 1px rgba(1,135,250,0.35), 0 12px 38px -10px rgba(1,135,250,0.32)` | brand halo — hover on cards, always-on for gradient elements (113×) |
| `shadow-modal` | `0 30px 70px -24px rgba(11,33,56,0.45)` | floating dialogs + rich tooltips |

Arbitrary shadows stay in the navy/brand families, e.g. user-bubble drop `shadow-[0_10px_26px_-14px_rgba(1,1,201,0.55)]`. Drawer edges: the standard chat-drawer edge is `shadow-[-16px_0_48px_-24px_rgba(11,33,56,0.42)]` (3×); the SourceInspector uses `-12px_0_40px_-12px`; the rarer `-12px_0_32px_-22px_rgba(11,33,56,0.35)` variant appears twice.

### 4.3 Radii (config overrides `xl: 0.875rem`, `2xl: 1.25rem`)

| Radius | Use |
|---|---|
| `rounded-full` | pills, badges, progress bars, dots, avatars, blur orbs |
| `rounded-lg` (0.5rem) | small icon chips, ghost icon buttons, micro-badges |
| `rounded-xl` (0.875rem) | buttons, inputs, icon squares, rich tooltips |
| `rounded-2xl` (1.25rem) | cards, chat bubbles, FAB squares, popovers |
| `rounded-3xl` (1.5rem) | modals and hero panels |
| `rounded-[calc(1.5rem-1px)]` | inner panel inset 1px inside a gradient `p-px` frame |

### 4.4 Borders, blur, scrims

- `border-line` is the universal hairline (258×); `border-line-strong` only on chat-dock/drawer left edges (17×). Dashed `border-dashed border-line` marks empty states and "add" affordances.
- `backdrop-blur-sm` on cards, translucent headers (`bg-white/50–/80`), tooltips (`bg-white/95`), nav rail (`bg-white/55`); `backdrop-blur-md` on the workspace/marketing sticky headers.
- Scrims: dark navy — `bg-[#0b2138]/45 backdrop-blur-[3px]` or `bg-[#0A1150]/55 backdrop-blur-sm`; popovers use an invisible `fixed inset-0` click-away layer instead.

---

## 5. Layout & spacing

### 5.1 Shells

| Shell | Recipe |
|---|---|
| Workspace (`/evolve/:planId`) | `relative flex h-screen overflow-hidden` → ambient orbs → nav rail → main column with **56px header** (`h-14 shrink-0 border-b border-line bg-white/55 px-6 backdrop-blur-md lg:px-8`) → one `overflow-y-auto` pane (`px-5 pb-28 pt-4 lg:px-6`, no max-width; `pb-28` clears the fixed bottom pill) → 380px chat dock |
| Analyst rooms | `relative flex min-h-screen flex-col overflow-hidden bg-[#f6f7f9] text-fg lg:h-screen` (the neutral-grey canvas overrides the blue-tinted body wash — Executive Lens + Risks & Opportunities only) → ~70px content-sized header → rail (`hidden lg:block`) + `main flex-1 overflow-y-auto px-6 pb-8 lg:px-10` with `mx-auto w-full max-w-[1600px]` (v1.2) |
| Entry flows | same header grammar (`border-b border-line bg-white/50 backdrop-blur-sm`) → `max-w-[1600px] px-6 pb-10 pt-6 lg:px-10` |
| Home (`/home`) | centered `max-w-[1600px] px-6 lg:px-10` (v1.2: one app-wide content cap — Home, Plans, and both analyst rooms all use `max-w-[1600px]`; prose keeps its own `max-w-2xl/3xl` measure) |
| Lists (`/plans`) | `mx-auto w-full max-w-[1600px] px-6 lg:px-10` |
| Guided workflow inner pane | `mx-auto w-full max-w-[1100px]` |

**Full width, always (v1.5).** A screen never renders as a narrow centered column — a form floating in the middle of a wide viewport is a defect. Page containers are full-bleed (`w-full px-6 lg:px-10`) and the layout **uses** the width: fields, cards, and panes organize across the canvas (grids, side-by-side columns, a context aside next to a form), not down a strip in the middle. The only `max-w` that survives on new screens is the line-length measure on running prose (`max-w-2xl`/`max-w-3xl` on a paragraph, never on the screen container). The capped shells in the table above describe this app as of v1.3 and remain valid there; screens built new — in this app or any adopting project — are full-bleed from the start.

Chrome dimensions: nav rail `w-[252px]` expanded / `w-[68px]` collapsed (expands on hover/focus, `transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`, `sticky top-0 border-r border-line bg-white/55 backdrop-blur-sm`); chat docks animate width 0→380 (`duration 0.34`, ease `[0.2,0.7,0.2,1]`); overlay drawers `w-[min(400px,100vw)]`; SourceInspector `w-[480px] max-w-[94vw]` expanded / `w-[420px]` docked; FABs `fixed bottom-6 right-6 h-14 w-14 rounded-2xl`.

**Front door (Login) — the one palette exception.** `src/pages/Login.tsx` deliberately uses its own royal-blue family (`#2B47E0` / `#3A55EA` / `#5470FF` / `#8FB2FF`), found nowhere else in the app. Do not rebuild the sign-in screen with `#0101C9`/`#0187FA`, and do not give it a serif heading.

- **Shell:** split layout `lg:grid lg:grid-cols-[1.62fr_1fr]`.
- **Left hero:** `bg-[#2B47E0]` under a radial wash `bg-[radial-gradient(120%_95%_at_10%_-5%,#5470FF_0%,#3A55EA_34%,#2B47E0_68%)]`, with breathing blur orbs (`bg-brand-blue/30 blur-[130px]`, `bg-[#8FB2FF]/25 blur-[120px]`) and a pool of light `rgba(170,200,255,0.38)` under the board.
- **Right form panel:** white, with edge shadow `lg:shadow-[-28px_0_70px_-40px_rgba(11,33,56,0.28)]`.
- **Headline:** white **Inter** (not `font-display`) and the app's only fluid type: `text-balance text-[clamp(2rem,2.7vw+0.85rem,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white`.

### 5.2 Spacing rhythm

- Gaps are small and dense: `gap-1.5` and `gap-2` dominate; `gap-3` for card grids; `gap-10+` only in hero two-column layouts.
- Card padding: `p-5 sm:p-6` (SectionCard); `p-8` hero cards; modals `p-6`. Section stacks: `space-y-3`.
- Control grammar: buttons `px-4 py-2` / `px-3.5 py-2` (near-tied, 23× vs 21×); pills `px-2.5 py-1`; chips `px-2 py-0.5`; page gutters `px-6` → `lg:px-8/10`.
- Deep-link targets get `scroll-mt-24`.

### 5.3 Responsive & z-index

**Responsive by default (v1.6).** Every screen ships responsive without being asked — it is part of building the screen, not a follow-up request. The bar:

- Holds at phone width (390px), tablet, laptop, and ultrawide — full-bleed at every size (§5.1) — with **never a horizontal scrollbar**: `scrollWidth == clientWidth` at every breakpoint.
- Grids collapse stepwise (`grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-N`); side-by-side panes stack in source order below `lg`, an `lg:`-only left hairline becoming a top hairline when stacked.
- Media, charts, and long strings scale or clamp with their container — nothing escapes its card at any width.
- Interactive targets stay comfortably tappable on touch (≥ 44px in at least one dimension, including padding).
- Verified by driving the §13.3 Responsive row (390px, the `lg` boundary, 125–150% zoom) — responsiveness is measured, not assumed.

House mechanics:

- Desktop-first; single column below `lg` (117× `lg:` vs 17× `md:`). Rails are `hidden lg:block`; the chat layer is `hidden md:block` (desktop-only); `sm:` mostly `sm:grid-cols-2` + padding bumps; no custom breakpoints.
- Ladder: `z-0/[1]/[2]` intra-card → `z-10` page content → `z-20` workspace header → `z-30` floating chat-reopen → `z-40` sticky headers/drawers/click-aways → `z-50` modals + primary drawers → `z-[60]` review sheet → `z-[70]` confirm dialog (topmost).
- One `overflow-y-auto` pane per shell; the chrome never scrolls.

---

## 6. Components

### 6.1 Pill (`src/components/primitives.tsx`)

Base `inline-flex items-center rounded-full border font-medium`; md `gap-1.5 px-2.5 py-1 text-2xs`, sm `gap-1 px-1.5 py-px text-[9px]`. **Universal tint formula: `border-{c}/30 bg-{c}/10 text-{c}` — status is never a solid fill.**

| Tone | Classes |
|---|---|
| `neutral` | `border-line bg-fg/[0.04] text-fg-muted` |
| `blue` | `border-brand-blue/30 bg-brand-blue/10 text-brand-blue` |
| `pink` | **deprecated** — renders identically to `blue`; use `blue` |
| `purple` | `border-brand-purple/30 bg-brand-purple/10 text-brand-purple` |
| `pos`/`neg`/`warn`/`info` | same /30–/10 formula per semantic token |

### 6.2 SectionCard (the workhorse container)

The base container for all plan content. `motion.section` with `card iris-futuristic relative overflow-hidden p-5 transition-shadow duration-300 hover:shadow-glow sm:p-6`.

- **Entrance:** `{opacity:0, y:18, scale:0.985}` → settled over 0.55s ease `[0.2,0.7,0.2,1]`; hover lift `whileHover={{ y: -4 }}`.
- **Decorative anatomy** (all `aria-hidden pointer-events-none`): two drifting aurora blobs (`bg-brand-blue/15` + `bg-brand-purple/15 blur-3xl`, 12s/14s loops), `.iris-grid` dot texture, four `.iris-bracket` HUD corners, a periodic top shimmer, and a one-shot entrance scan line.
- **Header:** pulsing eyebrow dot `h-1.5 w-1.5 animate-pulse rounded-full bg-brand-blue` → `.label-mono` kicker → h3 `text-base font-semibold tracking-tight text-fg` → right-side cluster for `GapBadge` / actions.
- **Footer:** `SourcesFooter` + `SectionComments`.
- **Deep-linking:** the `focusKey` prop renders `id="sec-…"` + `scroll-mt-24`.
- **Content cascade:** header → body → sources footer stagger in after the card reveals (`staggerChildren: 0.12, delayChildren: 0.25`; each zone `{opacity:0, y:12}` → `y:0` over 0.45s house ease). A rebuilt card must not pop in as one block.
- **Opt-in `askAi` prop** renders the "Shape the analysis" header pill: `inline-flex shrink-0 items-center gap-1 rounded-full border border-brand-blue/30 bg-brand-blue/5 px-2.5 py-1 text-2xs font-semibold text-brand-blue hover:bg-brand-blue/10` + `MessageSquare h-3 w-3`.

> ⚠️ **Known issue — spaced rgba in arbitrary values.** The eyebrow dot's intended glow `shadow-[0_0_8px_rgba(1,135,250,0.85)]` is written in `primitives.tsx` with spaces inside the arbitrary value (`rgba(1, 135, 250,0.85)`), which Tailwind's JIT cannot compile — the glow currently renders nothing. The same bug breaks ~10 other arbitrary shadows (`Assistant.tsx`, `AnalyzingOverlay.tsx`, `coverage.tsx`, `CheckBoard.tsx`, …). **Always write arbitrary values with underscores, never spaces.**

### 6.3 MetricTile / GapBadge / ProgressBar

- **MetricTile**: `card group … p-5 min-h-[136px]`; hero variant is always lit — `ring-1 ring-brand-blue/25 shadow-glow` + blue/purple wash + breathing blobs. Label `.label-mono line-clamp-2 min-h-[2rem]` with a 72×24 Sparkline (stroke gradient `#0187FA→#0101C9`, width 1.75, draw-on 0.9s). Value `.stat-num font-semibold leading-none tracking-tight` — hero `text-4xl text-brand-blue`, standard `text-[1.75rem] text-fg`. Delta: `ArrowUpRight/ArrowDownRight h-3.5 w-3.5` in `text-pos`/`text-neg`/`text-fg-muted`.
- **GapBadge**: `inline-flex items-center gap-1.5 rounded-full border border-warn/30 bg-warn/10 px-2.5 py-1 text-2xs font-medium text-warn` + `AlertCircle h-3 w-3` + "Needs review".
- **ProgressBar**: track `h-1.5 w-full overflow-hidden rounded-full bg-fg/[0.06]`; fill `h-full rounded-full bg-brand-gradient`, width animates 0→% over 0.8s ease `[0.2,0.7,0.2,1]`.

### 6.4 Buttons

| Kind | Recipe |
|---|---|
| **Primary** | `inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:opacity-95` (marquee: `rounded-xl px-6 py-3`; pill: `rounded-full … ring-1 ring-white/25 active:scale-[0.98]`). Disabled: `disabled:bg-none disabled:bg-fg/[0.08] disabled:text-fg-faint disabled:shadow-none` |
| **Gradient-ring inverted** | outer `rounded-full bg-brand-gradient p-px shadow-card hover:shadow-glow`; inner `rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0101C9] group-hover:bg-transparent group-hover:text-white` — the `p-px` frame technique also wraps panels |
| **Secondary** | `rounded-xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-fg-muted shadow-card transition hover:text-fg` (or `hover:border-brand-blue/40`) |
| **Tinted secondary (blue)** | `rounded-lg/xl border border-brand-blue/30–40 bg-brand-blue/[0.06] px-3–5 py-1.5–2.5 text-xs–sm font-semibold text-brand-blue transition hover:bg-brand-blue/10` — secondary actions that belong to Iris/AI features (LE template upload, WhyCard, GrillSession, ChapterCompletionBar…); chip-sized variants drop to `border-brand-blue/20 px-2 py-0.5 text-2xs`. Disabled grammar everywhere: `disabled:cursor-not-allowed disabled:opacity-40` (13×) |
| **Ghost** | `rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-fg-muted transition hover:border-brand-blue/40 hover:text-fg`; destructive swaps to `hover:border-neg/40 hover:text-neg`; close: `rounded-lg p-2 text-fg-faint hover:bg-fg/[0.05] hover:text-fg` |
| **Icon tiles** | square `bg-brand-gradient text-white shadow-glow` at h-6/7/9/11/12, `rounded-lg`→`rounded-2xl` by size; send button adds `hover:brightness-110 disabled:opacity-40 disabled:shadow-none` |
| **FAB (Ask Iris)** | `iris-futuristic fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-brand-gradient text-white shadow-glow hover:-translate-y-0.5` with `AiMascot h-7 w-7` + one-shot `.iris-hail` halo |

### 6.5 Badges & chips

Micro-badge `rounded-md bg-fg/5 px-1.5 py-0.5 font-mono text-2xs`; gradient micro-badge `stat-num rounded-md bg-brand-gradient px-1.5 py-0.5 text-2xs font-bold text-white`; data-figure chip `rounded-lg border border-info/30 bg-info/10 px-2.5 py-1 text-xs` with value in `stat-num font-semibold text-info`; trust chip `rounded-full bg-pos/10 px-2 py-0.5 text-2xs font-medium text-pos` + Check.

### 6.6 Modals, popovers, tooltips

- Panels: `w-[min(480px,92vw)] rounded-[1.75rem] bg-white shadow-modal ring-1 ring-fg/[0.06]` or `rounded-3xl border border-line bg-white p-6 shadow-modal`; gradient-framed sheet = `rounded-3xl p-px shadow-modal` with inline `linear-gradient(135deg, rgba(1,135,250,0.45), rgba(11,33,56,0.18) 45%, rgba(1,135,250,0.35))` + inner `rounded-[calc(1.5rem-1px)] bg-white p-6` + faint `iris-grid`.
- Enter `{opacity:0, y:16, scale:0.96}`, exit `{y:10, scale:0.97}`; `role="dialog" aria-modal="true"`, Escape + backdrop-click close.
- Popover: `fixed z-50 w-80 rounded-2xl border border-line bg-white shadow-modal` behind a `fixed inset-0 z-40` click-away.
- Tooltip: `rounded-xl border border-line bg-white/95 p-3 shadow-modal ring-1 ring-brand-blue/10 backdrop-blur-sm`; dark micro-tooltip `rounded-lg bg-fg px-2 py-1` with white `stat-num`.

### 6.7 Inputs

White fill, `rounded-xl`/`rounded-2xl`, focus = `focus:border-brand-blue/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/25`. Canonical input: `w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-fg placeholder:text-fg-faint …`; textarea adds `resize-y rounded-2xl px-4 leading-relaxed shadow-card`. In-edit fields wear a visible blue border (`border-brand-blue/35 bg-white/85`).

### 6.8 Loading & empty states

- **SectionLoader** replaces grey skeletons: `rounded-3xl border border-line bg-white/70 … shadow-card backdrop-blur-sm` frame; a rotating (1s linear) `.orbit-ring` conic comet (`rgba(1,135,250,0)→#0187FA→#0101C9`, masked to ~3px) with a glow head dot `bg-[#0187FA] shadow-[0_0_10px_2px_rgba(1,135,250,0.75)]`; `role="status" aria-live="polite"`.
- **AnalyzingOverlay**: full-screen `fixed inset-0 z-50`, iris-grid, gradient Iris identity tile, mono status kicker, 5-step checklist + progress ring.
- Indeterminate holds: `.scan-sweep`/`.board-trace` — a `transparent→#0187FA→#0101C9→transparent` bar looping the baseline ("keeps the surface visibly alive so the hold never reads as frozen").
- Empty states: dashed containers `rounded-2xl border border-dashed border-line bg-white/60 px-5 py-10 text-center`; dashed "add" affordance hovers to `hover:border-brand-blue/40 hover:text-brand-blue`.

### 6.9 Iris-futuristic treatments (`src/index.css`)

- `.iris-futuristic::before` — orbiting comet border: conic `transparent → #0187FA @50deg → #0101C9 @120deg → transparent @190deg` in a 1.5px masked ring; 7s loop at opacity 0.5, hover → 3s/opacity 1. Host must be `relative` with a border-radius. `-light` variant (white-hot tail) for gradient surfaces, 9s.
- `.iris-grid` — dot texture `radial-gradient(circle, rgba(11,33,56,0.05) 1px, transparent 1.6px)` at 22px, edge-masked; sprinkled at `opacity-30…70`.
- `.iris-bracket` — 16px HUD corners `rgba(1,135,250,0.45)`; grow to 22px, deepen to `rgba(1,1,201,0.7)` on card hover.
- Applied in full on every `SectionCard`, the Ask-Iris FAB, AnalyzingOverlay tile, review/complete surfaces; grid-only on page heroes and chat backdrops.

### 6.10 Chat surface

Canvas `bg-[linear-gradient(180deg,#EDEFFF_0%,#ECF6FF_100%)]` + iris-grid + corner blobs. Header: `linear-gradient(120deg, #0101C9 0%, #0187FA 100%)` band, avatar `h-11 w-11 rounded-full bg-white/20 ring-1 ring-white/40` + presence dot `bg-brand-sky ring-2 ring-white` with an expanding ping twin; the band drops `shadow-[0_12px_30px_-18px_rgba(1,1,201,0.55)]` onto the canvas below. User bubble `ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-brand-gradient px-4 py-3 text-[13.5px] leading-relaxed text-white`; Iris bubble `rounded-2xl rounded-tl-md border border-line bg-white px-3.5 py-3 shadow-card` beside the h-6 w-6 gradient mascot chip. Typing: three `h-1.5 w-1.5 rounded-full bg-brand-blue` dots.

Overlay chat drawers (Assistant, AskIris, BuildKnowledge) share one shell: `fixed inset-y-0 right-0 z-40/50 w-[min(400px,100vw)] border-l border-line-strong bg-[linear-gradient(180deg,#EDEFFF_0%,#ECF6FF_100%)] shadow-[-16px_0_48px_-24px_rgba(11,33,56,0.42)]` — that edge shadow is the canonical drawer edge.

Composer — identical at all four chat surfaces (RoomChat, EvolveChat, AskIris, BuildKnowledge): `rounded-2xl border-[1.5px] border-line bg-white px-2 py-2 shadow-card focus-within:border-brand-blue/45 focus-within:shadow-[0_0_0_4px_rgba(1,135,250,0.12),0_10px_28px_-16px_rgba(11,33,56,0.20)]` — a focus-within blue halo, deliberately not the canonical input focus ring (§6.7).

Message formatting — Iris bubbles render `**bold**` as `font-semibold text-brand-blue` (brand-blue emphasis, not default bold) and bullets as `mt-[0.45em] h-1.5 w-1.5 rounded-full bg-brand-blue/70` dots instead of `list-disc` (`MessageText`); the Assistant panel instead uses `font-bold text-fg` plus mono code chips `rounded bg-fg/[0.05] px-1 py-px font-mono text-[10.5px] text-fg-faint` (`AssistantText`).

### 6.11 Screen opening grammar & shared chrome (v1.2)

Every working screen opens the same way — the analyst speaking, never a dashboard:

1. **Byline row** — h-6 gradient mascot chip + `.label-mono` context ("{plan name} · {provenance/status}"); at most ONE quiet `!reduce`-gated pulse dot, and only while something is genuinely running.
2. **One serif h1** per screen (`font-display text-[1.7rem] font-semibold leading-[1.05] tracking-[-0.01em] lg:text-[2rem]`, `text-balance`).
3. **One plain Inter verdict sentence** (`text-[15px] leading-[1.7]`): figures inline as `stat-num font-semibold` in ink — no colors, no underline-links, no count-up above the fold.
4. **Workspace cards / content.** Hub-card recipe: `.card` glass + gradient icon tile (`h-9 w-9 rounded-xl`) + tinted count pill (`border-{c}/30 bg-{c}/10 text-{c}`) + 15px bold title + one-line muted preview + verb-first CTA with `ArrowRight`. Cards always OPEN; builds are explicit labeled actions with time honesty ("Run the pressure test · ~3 min"); locked cards state how to unlock.

Banned in openings: hero-metric tile bands, `CountUp`, status pills with looping pings, instruments as hero halves (instruments live below in captioned `.card` exhibits at `max-w-[760px]`).

**Shared chrome (v1.2):**
- `<AppHeader crumbs right>` (`components/foundation/AppHeader.tsx`) on every authed route — logo chip + "Brand Planning" wordmark always links `/home`; crumbs are real links (last crumb is the current page); crumbs are the back affordance (no standalone Back buttons); right slot ends with Sign out → `/`.
- `useCardTilt(maxDeg=4)` (`lib/useCardTilt.ts`) — pointer-tracked 3D tilt for interactive hub/act/decision cards; spring 320/26, `transformPerspective: 900`; disabled under reduced motion and non-mouse pointers; host must be a `motion.*` element.
- `SectionCard chrome="quiet" | "full"` — quiet (default) = `.card` + entrance + hover glow; full HUD decoration (comet border, aurora, dot grid, brackets, scan) is reserved for live-analysis cards.
- **One Iris identity**: gradient mascot chip everywhere (never Sparkles); chat headers use `linear-gradient(120deg, #0101C9 0%, #0187FA 100%)`; one launcher spec (`fixed bottom-6 right-6 h-14 w-14 rounded-2xl bg-brand-gradient shadow-glow` + iris-futuristic); every dock header carries a thread label ("Iris · this plan", "Iris · Analyst", …); `MessageText` is the single rich text renderer (`AssistantText` is a deprecated delegate).
- **One reject system**: `reviewAtoms.RejectModal` on the §6.6 modal recipe; `ReviewControls.RejectDialog` is a compat wrapper over it; one `RejectedStrip` export.
- §6.2 known-issue update: the spaced-rgba shadows are fixed in `primitives.tsx`, `Assistant.tsx`, `AnalyzingOverlay.tsx`, `Situational.tsx` — write underscores, never spaces, in arbitrary values.

### 6.12 The hybrid journey (v1.3)

The app's navigation concept is **hybrid: Iris opens the door, screens do the work.**

- **The Iris Console** (`/home`, `pages/MeetIris.tsx`) — the signed-in start is a conversation, not a menu: state-aware opening bubble from Iris (real engine — the same `assistant-widget` session as the floating panel), **action chips as primary navigation** (Continue plan / Start from scratch / Pressure-test / All plans), a §6.10 composer with local intent shortcuts for pure navigation phrases, and the resume strip + fork decision cards below. The floating Assistant launcher stands down on `/home` (the console IS that conversation).
- **`<JourneyBar planId current>`** (`foundation/JourneyBar.tsx`) — on every plan-scoped screen, directly under AppHeader: Ground → Generate → Review → Pressure-test as linked stage chips (FlowStepper anatomy: pos check chips for done, one brand-gradient current chip, ghost upcoming, animated gradient connectors). State derives ONLY from `lib/journeyStage.ts` → `deriveJourney` (plan presence + `readPlanTools` record); never invent stage state. Hidden when no plan is in context.
- **`<GuideStrip message chips>`** (`foundation/GuideStrip.tsx`) — at most one per screen, under the opening verdict: glass strip, mascot chip, one Inter sentence of "what to do next" derived from real state, 1–2 chips (primary = brand-gradient, secondary = tinted blue) that trigger existing behaviors only.
- Stage vocabulary comes from `JOURNEY_LABELS` — never hand-type stage names.

---

## 7. Motion

### 7.1 Philosophy

- **Living glyphs, no spinners/checkmarks** on analyst surfaces — the lens's own glyph animates while working; completion is a single `.analyst-ripple` (0.8s, one-shot).
- **Ambient pinging is noise** — hails run exactly twice then rest (`.iris-hail`: `1.6s cubic-bezier(0.16,1,0.3,1) 1.2s 2 both`).
- **Loops mean "alive/working" only**: comet borders, orbit-ring loader, scan sweeps, typing dots, glow-orb drift. Everything else is one-shot with `both`/`forwards` fill.
- **Discrete navigation never waits** on an outgoing exit (see AnimatePresence rule).
- Loaders are branded, never grey.

### 7.2 Signature easing & durations

- `cubic-bezier(0.2, 0.7, 0.2, 1)` — the original house curve (primitives, chat, viz).
- `cubic-bezier(0.16, 1, 0.3, 1)` — expo-out feel; dominant on newer entry/foundation screens.
- Named: `easeInOut` for infinite ambient loops; `linear` for loader rotation and dash flows.
- Durations: **0.45s is the canonical entrance**; 0.15–0.35s for swaps/hovers; 0.55–0.9s hero reveals and gauge draws; 1.1–1.7s count-ups; ambient loops 2.4–14s.

### 7.3 Framer Motion conventions

- Entrances: small rises — `initial {opacity:0, y:4–18}` → `{opacity:1, y:0}`; `Stagger` (`staggerChildren: 0.06`) + `StaggerItem` (y:10→0, 0.45s house ease); manual stagger `delay: i * 0.04–0.09`, clamped (`Math.min(i * 0.05, 0.3)`).
- Springs: 320/26 (card entrances), 400/24–28 (hover lift), 380/30 (panels), 520/30 (rail pills).
- Gestures: cards `whileHover={{ y: -4 }}`, chips `{ y: -2 }`, FABs `{ scale: 1.04–1.06 }`; `whileTap={{ scale: 0.88–0.96 }}`.
- Progress draws: bar width 0→% 0.8s; SVG `pathLength` 0→pct 0.9s delay 0.25. Counters: `useMotionValue(reduce ? to : 0)` + `animate(mv, to, {duration: 1.1, ease: house})`.
- `layoutId` shared-element pills for tab/rail indicators (`"foundation-rail-active"`, `"xl-tab-pill"`, `"swotHorizon"`).

### 7.4 AnimatePresence rules

- `mode="wait"` for discrete pane/tab swaps, usually with `initial={false}`.
- **Never nest `mode="wait"` presences** — a nested pair deadlocked the brief detail pane (documented in `src/components/evolve/BriefSections.tsx`). Card/detail swaps use a plain keyed `motion.div` with no `exit`.
- `mode="popLayout"` for grid removals — children **must** be `forwardRef` components.
- `initial={false}` on persistent lists to suppress mount animation.
- Exit-then-act: store the pending action in a ref, run it in `onExitComplete`.

### 7.5 CSS keyframe inventory (live)

| Class / keyframe | Timing | Purpose |
|---|---|---|
| `.iris-futuristic::before` (`iris-orbit`) | `7s linear infinite` (hover 3s) | orbiting comet card border |
| `.iris-futuristic-light::before` | `9s linear infinite` | white-hot comet for gradient surfaces |
| `.orbit-ring` (rotated by Framer) | `1s linear infinite` | comet-ring section loader |
| `.iris-hail` | `1.6s cubic-bezier(0.16,1,0.3,1) 1.2s 2 both` | FAB "I'm here" — exactly twice |
| `.origin-pulse` | `2.4s ease-out infinite` | soft ring breathing off a change's origin |
| `.section-focus` | `2.2s cubic-bezier(0.2,0.7,0.2,1)` one-shot | blue ring pulse on deep-link landing (JS adds/removes class) |
| `.analyst-ping` / `.analyst-link` / `.analyst-glint` | 1.25–1.5s loops | living lens glyphs (Challenge/Coherence/Evidence) |
| `.analyst-ripple::after` | `0.8s ease forwards` | completion ripple — a check just landed |
| `.board-caret` | `1.1s steps(1) infinite` | blinking readout caret |
| `.board-trace` / `.scan-sweep` | 2.2s / 1.4s infinite | gradient bar sweeps for indeterminate holds |
| `ripple-ring` | `2s ease-out infinite` (arbitrary property) | live status-dot ripple on ChapterReview section pills (`ChapterReview.tsx` — the "OrbitMap ripple" comment in `index.css` is stale; OrbitMap was deleted in the 2026-08-13 cleanup) |

(`fade-rise`, `pulse-dot`, `shimmer`, `shimmer-sweep`, `hud-scan`, `docket-*`, `risk-pulse`, `analyst-plus1/-breathe/-tile-in`, `spine-comet`, `flow`/`.impact-arc-flow`, `.analyst-idle-line`, `.scenario-hit`, `.studio-range`, `.no-scrollbar`, and the `.hairline` component class are defined but currently have no live call sites — don't assume they render anywhere.)

### 7.6 Reduced motion

Global clamp: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; } }` — one-shots use `both`/`forwards` so they settle finished. Explicit fallbacks: `.section-focus` → static `0 0 0 3px rgba(1,135,250,0.25)` ring; `.scan-sweep` → static full-width gradient at 0.55 opacity; glyph loops → `animation: none`. Framer side (~30 components use `useReducedMotion`): loops `animate={reduce ? undefined : …}`, entrances `y: reduce ? 0 : 8`, gestures off, counters start at the end value, `behavior: reduce ? "auto" : "smooth"`; remaining utility spinners gated `motion-safe:animate-spin`.

---

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
| Behind / negative | magenta `#a21caf` — **never red** |
| Captured / strong / favorable | bright blue `#0187FA` |
| Partial / stall / watch-out | deep blue `#0101C9` |
| Missing | grey `#8a99ab` (track `rgba(11,33,56,0.07)`) |
| Needs review `[confirm]` | `warn #b7791f`, mono uppercase |
| Opportunity fills | `bg-brand-gradient-light` (pale `#B9C4FF→#BFE0FF`) |

Shared mechanics: every viz declares `const EASE = [0.2, 0.7, 0.2, 1]`; staggered entrances ~`i * 0.07`; `useReducedMotion` respected; all numbers `.stat-num`; kickers `.label-mono`; value labels as HTML overlays (not SVG text) so they don't scale with the viewBox; hover dims siblings to ~0.35–0.4; dark `bg-fg` tooltips with white `stat-num`; `sr-only` tables restate charts.

---

## 9. Voice & microcopy

- **Kickers**: uppercase mono via `.label-mono` — "Blueprint coverage", "Sources", "AI Analyst", "Journey health".
- **Headings**: sentence case, often ending in a period on marquees ("Meet Iris."). Subtitles run lowercase-conversational ("tell me what to focus on").
- **Separators**: spaced em-dash ` — ` joins clauses ("Editing — status rederives on save"); middot ` · ` joins compact metadata ("internal · advantage", "captured · 62%").
- Legend/status words are lowercase ("captured", "partial", "not in deck"); bracketed mono flags like `[confirm]` in uppercase `text-warn`.
- Iris speaks first-person, conversational, in bubbles or the gradient band. CTAs are verb-first ("Shape the analysis", "Chat with Iris", "Discuss in chat").
- Numbers always render in `.stat-num`; timestamps/"as of" in mono `text-2xs text-fg-faint`.

---

## 10. Rules — do / don't

**Do**
- Use `bg-brand-gradient` (+ white text + `shadow-glow`) for every primary action and Iris identity chip — gradient, not flat, wherever the system provides one (green path included: `bg-gradient-green`).
- Keep marquee headings in the editorial serif: `font-display font-semibold text-balance tracking-tight` with the rem-bracket ladder. Body/UI stays Inter.
- Build status chips with the tint formula `border-{c}/30 bg-{c}/10 text-{c}` on `rounded-full`.
- Reach for the primitives (`Pill`, `SectionCard`, `MetricTile`, `ProgressBar`, `.card`, `.label-mono`, `.stat-num`) before writing one-off styles.
- Express elevation as *brighter* (whiter fill, glass blur) + `shadow-card` → `shadow-glow` on hover/selection.
- Put every numeral in `.stat-num`, every eyebrow in `.label-mono`; widen mono tracking as size shrinks.
- Use the two house easings (`[0.2,0.7,0.2,1]`, `[0.16,1,0.3,1]`), 0.45s entrances, small y-rises, and honor `useReducedMotion` on every loop and gesture.
- Use `SectionLoader`'s comet ring for loading, dashed `border-line` containers for empty states.
- Focus states: rounded/pill controls and segmented buttons suppress the global outline and use `focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60` (the dominant recipe, 20×); plain inputs get `focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/25`; everything else falls back to the global `:focus-visible` outline.
- Break body copy past ~3 rendered lines into titled brand-dot bullets, use the check vocabulary only on earned states, and convert a page that has outgrown its scroll into URL-backed tabs (§11).
- Treat "done" as gated: drive the §13.3 state matrix on the real screen, then get the §13 reviewer's explicit confirmation — zero known failures is the shipping bar.

**Don't**
- **Never introduce red.** Danger is magenta (`neg #a21caf` / `#b4276e`), warning is gold — stay in the family.
- Don't revert marquee serif headings to sans, and don't let the serif leak into body/UI copy.
- Don't use the old palette (`#0093d0`, `#2bb8ff`, `#7c3aed`) — dead, save one legacy literal in `VarianceWaterfall.tsx`.
- Don't use the `pink` Pill tone (deprecated alias of `blue`) or grey skeleton loaders or raw spinners on analyst surfaces.
- Don't nest `AnimatePresence mode="wait"` inside another — it deadlocks; keyed `motion.div` with no `exit` for discrete swaps. `mode="popLayout"` children need `forwardRef`.
- Don't loop attention-getting pulses — hails fire once or twice, then rest.
- Don't hard-code new hexes when a token or a listed de-facto literal (§2.7) exists; don't put chart value labels in SVG text.
- Don't give a shell more than one scrolling pane, and don't size lucide icons with the `size` prop.
- Don't ship prose walls, endless scrolls, or an unreviewed "done" — the §11 disclosure ladder and the §13 gate are not optional.

---

## 11. Content density & progressive disclosure

Text-heavy UI is treated as a defect, not a style choice. A screen earns its length; prose never ships as a wall.

### 11.1 Prose → bullets

- **The three-line rule.** Body copy in a card, panel, bubble, or empty state that renders past ~3 lines — or a single paragraph carrying more than one point — is rewritten as bullets, one point per bullet.
- **The house bullet is the brand dot, not the browser marker:** a flex row with `mt-[0.45em] h-1.5 w-1.5 rounded-full bg-brand-blue/70` (the `MessageText` dot, §6.10) beside body copy in the house secondary recipe, `text-[13px] leading-relaxed text-fg-muted` (§3.2). Never raw `list-disc` markers on designed surfaces.
- **Bold lead-ins carry the scan line.** A bullet with body copy opens with a `font-semibold text-fg` lead phrase, then muted prose — the reader should get the whole list from the lead-ins alone.

### 11.2 Checkmarked lists

When list items carry state (done / verified / required / pending), swap the dot for the check vocabulary — a checkmark wherever one is earned:

| State | Mark |
|---|---|
| Done / verified / covered | `Check` / `CheckCircle2` `h-3.5 w-3.5 text-pos` (stroke heavier as it shrinks, §8.1) |
| In progress / current | `CircleDot` `text-brand-purple` (deep blue — the partial/stall tone, §2.8) |
| Pending / missing | `CircleDashed` `text-fg-faint` |

Same vocabulary as coverage status (§8.1) and the JourneyBar's pos check chips (§6.12). **A checkmark is a claim** — only a state that has verifiably landed wears the `text-pos` check; an intended or assumed state stays on the dashed mark (the same honesty rule section sources follow).

### 11.3 Titles over bullets

A group of 3+ bullets gets a title; two groups on one surface each get one. The hierarchy inside a card: `.label-mono` kicker → `text-base font-semibold tracking-tight text-fg` title (`text-[15px]` for sub-groups) → optional one-line muted summary → the bullets in `space-y-2`/`space-y-3`. Untitled bullet groups may not sit adjacent — if the reader can't tell where one list ends and the next begins, the structure has failed.

### 11.4 Page → tabs

A page that outgrows its scroll converts to tabs — it does not keep scrolling.

- **Triggers (any one):** more than ~5–6 `SectionCard`s covering distinct concerns; stacked content past ~2.5 viewport heights at 1440×900; two audiences or modes sharing one screen; occasionally-visited sections riding above everyday ones.
- **Recipe:** segmented pills with a `layoutId` shared-element indicator (house pattern — `"xl-tab-pill"` in `ExecutiveLens.tsx`, `"swotHorizon"` in `SwotGrid.tsx`): active tab `bg-brand-gradient text-white shadow-glow`, inactive ghost or tinted; pane swap = `AnimatePresence mode="wait"` with `initial={false}`, never nested (§7.4).
- **Tab state lives in the URL** (`?view=` / `?room=`, or a param named for the choice) so a reload or a shared link lands on the same pane — the workspace's `?view=` convention; the `xl-tab-pill` tabs themselves read `params.get("room")` (`ExecutiveLens.tsx`).
- The one-scroll-pane rule (§5.3) survives tabbing: the chrome and the tab bar never scroll; each pane owns the single scroll region.
- **Don't tab away comparisons or the primary job:** content the user compares side-by-side stays on one pane, and the default tab carries the screen's primary action — never buried a click deep.

### 11.5 The disclosure ladder

`sentence → bullets → titled groups → tabs → separate screen`. Escalate exactly one rung, and only when the current rung is genuinely overloaded. Never ship a rung below what the content needs (a prose wall where bullets would do), and never skip a rung upward (a new screen where tabs would do).

---

## 12. Adoption protocol — new projects

This document is portable, and it travels as law, not inspiration. When `design.md` lands in a new project, **everything is designed from it by default and nothing is skipped — no exceptions.**

- **Default authority.** From the first commit, all UI derives from this document: tokens, type, surfaces, layout, components, motion, iconography, voice, density (§11), and the review gate (§13). A screen that ignores a section of this document is a defect, not a variation.
- **Bootstrap checklist — every item lands before the first screen ships:**
  - [ ] §2 tokens into the Tailwind config / CSS vars: ink scale, brand pair, semantic set, gradients, `--font-display`
  - [ ] §3.1 fonts loaded: Inter 400–700, IBM Plex Mono 400/500, Newsreader with the system-serif fallthrough
  - [ ] §3.4 / §4.1 component classes: `.card`, `.label-mono`, `.stat-num`
  - [ ] Primitives ported (`Pill`, `SectionCard`, `MetricTile`, `ProgressBar`) before any one-off styling exists
  - [ ] §2.9 global chrome: body wash, `::selection`, `:focus-visible`, scrollbars
  - [ ] §7 motion: both house easings, the reduced-motion clamp, the entrance grammar
  - [ ] A test framework stood up, with the §13.3 matrix rows encoded as its baseline suite (rendering states, interaction edges, accessibility assertions) — a new project does not inherit this repo's no-framework legacy
  - [ ] §10 rules and §11 density in force; the §13 review gate wired into the project's definition of done
- **Nothing is missed.** Every numbered rule in this document applies unless a deviation is written down. Deviations live in the adopting project as a "Deviations from design.md" list — each entry names the rule it bends, the reason, and who approved it. Silence means full compliance is expected; an undocumented deviation is treated as a bug.
- **Adaptable vs invariant.** A new brand may re-point the brand hexes and rename the wordmark — the token *roles* stay. The §1 principles, the §11 density rules, the §13 gate, and the accessibility floors (AA contrast, reduced motion, visible focus) are invariant everywhere.
- **Gaps feed back.** If the new project needs a pattern this document doesn't cover, design it in the document's spirit, then fold it back here (§14) so the next project inherits it.
- **Make the default automatic.** Reference this file from the project's `CLAUDE.md` / contributor docs so every session and reviewer loads it; where hooks exist (as in this repo's impeccable setup), wire them so design work cannot route around the system.

---

## 13. Design review gate & QA

Nothing is "done" because it compiles or because its author likes it. **Done = built → driven through the state matrix → reviewed → explicitly confirmed.** Every UI change passes this gate.

### 13.1 The reviewer

- Every change gets a thorough review by someone who is not its author — a human, or a dedicated review pass that did not write the code. In this repo that means `/impeccable critique` / `/impeccable audit` (committed at `.claude/skills/impeccable/`); where the machine-local compound-engineering plugin is installed, its design-implementation-reviewer agent can drive the live screen too.
- The reviewer walks §13.2 and §13.3 in full **against the running app**, not the diff alone. Confirmation is explicit ("reviewed — passes the gate"), and only the reviewer may give it.
- A finding is fixed and re-reviewed — never waived, argued down, or parked as a "known issue" at ship time. The only alternative to fixing is a documented, approved deviation (§12).

### 13.2 Reviewer checklist (all must pass)

1. **Color & tokens** — only §2 tokens / listed de-facto literals; no red anywhere; AA contrast on tinted surfaces.
2. **Type** — one serif marquee per screen, body stays Inter; every numeral in `.stat-num`, every kicker in `.label-mono`; mono tracking widens as size shrinks.
3. **Surfaces & layout** — §4 recipes, §5 shell grammar, one scrolling pane, z-ladder respected.
4. **Components** — primitives over one-offs; §6.11 opening grammar; tint-formula pills; the §6.6 modal recipe.
5. **Motion** — house easings and durations; every loop and gesture honors reduced motion; no nested `mode="wait"`; underscores, never spaces, in arbitrary values.
6. **Density** — §11: no prose walls, titled bullets, checks only where earned, an outgrown page tabbed.
7. **Voice** — §9 grammar: kickers, separators, verb-first CTAs, lowercase status words.
8. **States** — the §13.3 matrix was actually driven, with evidence (screenshots or a replayable walkthrough), not asserted.

### 13.3 The state & edge-case matrix

Every screen and every change is exercised against every applicable row **before** review. Shipping with a known failing row is prohibited; unknown rows are found here, not by users.

| Row | What must hold |
|---|---|
| Loading | `SectionLoader` comet / scan-sweep, never a blank pane or grey skeleton; driven on a slow network — a first paint can take seconds, and a settling screen must read as alive, not broken |
| Empty | dashed §6.8 container with a real next step, never a bare void |
| Error / partial failure | the failure is visible, per item, with a human reason — a failed thing must LOOK failed; partial success renders the successes AND the failures |
| Pending vs ready | branch on pending before rendering — a pending state must never draw as "searched and found nothing" |
| Overflow | longest realistic strings, 3-digit counts, 100+-item lists: `line-clamp`, truncation and wrapping behave; nothing escapes its card |
| Locked / no access | states how to unlock (§6.11) — never a dead control |
| Keyboard | full traversal on visible focus (§2.9 / §10 recipes); Escape and backdrop close modals; focus returns on close |
| Re-entry & races | rapid re-clicks start no duplicate job; a refresh mid-flow survives (state in the URL); a list that changes under the user keys on stable ids, never ordinals |
| Deep links | back button, shared links, and legacy URLs land correctly — never at the sign-in page |
| Reduced motion | driven with `prefers-reduced-motion`: one-shots settle finished, loops stop, nothing depends on an animation to be readable |
| Responsive | at the `lg` boundary and below (single column), and at 125–150% browser zoom |

### 13.4 Verification protocol

- **Measured, not assumed.** `npm run build` (tsc) green **and** the real screen driven through §13.3 — with Playwright/agent-driven browsing or by hand. **The matrix rows ARE the test cases, in every project:** written and automated wherever a framework exists (mandatory in new projects — §12's bootstrap checklist stands one up), and they must pass. Only a legacy repo without a framework (this repo today — tsc plus driving the app is the entire safety net) may substitute scripted manual drives: there, the drive IS the test, the reviewer replays every applicable row, and the evidence rides the PR.
- **The bar is zero known failures.** "Works on the happy path" is not done. Done is every applicable matrix row holding, every checklist item passing, and the reviewer's explicit confirmation on record.

---

## 14. Document maintenance

- **Source of truth is the code.** This document describes the system as implemented in `tailwind.config.ts`, `src/index.css`, and `src/**` on the date in the header. When a token, recipe, or convention changes in code, update the relevant section here in the same change.
- **Update triggers:** any edit to `tailwind.config.ts` or `src/index.css`; a new or changed primitive in `src/components/primitives.tsx`; a new shell/page pattern; a deliberate exception to a rule in §10; a density, adoption, or review rule (§11–§13) learned in practice in any adopting project.
- **Versioning:** bump the version in the header and note the date whenever a section materially changes.
- **Known stale reference elsewhere:** the "Design system (Tailwind)" section of `CLAUDE.md` still cites the retired palette (`#0093d0` / `#2bb8ff` / `#7c3aed`). This document supersedes it.
