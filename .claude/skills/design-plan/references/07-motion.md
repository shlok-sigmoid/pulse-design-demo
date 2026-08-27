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

