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

