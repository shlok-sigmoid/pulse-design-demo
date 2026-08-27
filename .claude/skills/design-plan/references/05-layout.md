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

