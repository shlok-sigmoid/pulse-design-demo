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
| **Ghost** | `rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-fg-muted transition hover:border-brand-blue/40 hover:text-fg`; destructive triggers keep this standard treatment — no `neg` tint (v1.7); close: `rounded-lg p-2 text-fg-faint hover:bg-fg/[0.05] hover:text-fg` |
| **Destructive confirm (v1.7)** | delete/remove/destroy confirms wear the standard primary recipe — `bg-brand-gradient` + `text-white` + `shadow-glow` — always behind a §6.6 confirm dialog, which is the guardrail. Never a burnt-orange/`neg`-tinted button: `neg` marks status (pills, deltas, failed states), it does not paint action buttons |
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

**Invalid fields (v1.8):** an invalid control wears a gold border (`border-warn/50`) and its error line renders in `warn` gold — a 14px icon plus one human sentence (`text-warn`, 12px), e.g. "Email is required — notifications can't send without it." Never `neg`: burnt orange is reserved for data status (behind/negative encodings, §2.8), not form errors or inline alerts.

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

