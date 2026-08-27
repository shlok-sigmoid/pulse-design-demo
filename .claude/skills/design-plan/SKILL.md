---
name: design-plan
description: The organization's canonical frontend design system (bundled design.md v1.6) — colors, typography, surfaces, component recipes, motion, voice, content-density rules, and a mandatory review gate. Use this skill whenever building, styling, restyling, reviewing, or fixing ANY frontend UI — a screen, page, component, modal, dashboard, form, landing page, chart, or empty state — in any project, even if the user never says "design system" or "design.md". Also use it when starting a new frontend project (it bootstraps the whole system) and when deciding whether UI work is "done" (it defines the review gate that gates done).
---

# Design Plan — the canonical design system

Every visual decision derives from the bundled document, `references/design.md` (v1.6). It travels as law, not inspiration: when this skill is active, **all UI designs from that document by default and nothing is skipped — no exceptions.** A screen that ignores a section of the document is a defect, not a variation. The bundled copy is the authority this skill enforces, everywhere it runs.

## On direct invocation (`/design-plan` with no task)

When the user types `/design-plan` without naming a task, do NOT start any work — present a menu of the four modes and wait for their choice. Use the AskUserQuestion tool when it is available (one option per mode, with the impact text in each option's description); otherwise print the menu as a numbered list. Either way, **every option must state what it will do AND what it will touch in the user's project** — the user decides based on impact, not labels:

1. **Apply to project — make this design the default.** Installs the whole system as your project's design language and sweeps the ENTIRE project in one run — every screen, every component, automatically, with no per-screen prompts. *Impact: in a fresh project with no design system, everything installs cleanly — tokens, fonts, primitives, global chrome (the §12 bootstrap) — with nothing to overwrite and zero prompts at all. In a project that already has a design language, this OVERWRITES it: you get a preview of exactly what will be replaced and an explicit "yes, overwrite" is required (git commit/branch first recommended) — and that single confirmation is the last question; the rest of the migration runs unattended.*
2. **Generate — build something new.** Creates a new screen, page, component, or modal designed entirely from the design system. *Impact: adds new files/components to your project; nothing that already exists is modified.*
3. **Fix — repair existing UI.** Reviews your existing screens against the system and lists every violation found (wrong colors, prose walls, missing focus/motion rules…) BEFORE changing anything; fixes only what you approve. *Impact: modifies the styling of existing components you approve; functional logic is untouched.*
4. **Browse — look, don't touch.** Shows the design at a glance (palette, type, components, rules) or answers any specific question with exact values quoted from the bundled document. *Impact: read-only; changes nothing in your project.*

### Mode workflows

- **Generate:** ask what to build and where it lives → build from the exact recipes (§2 color, §3 type, §4–§6 surfaces/components, §7 motion), structure content by §11 → finish only through the §13 gate. **Every screen is full width (§5.1):** full-bleed containers (`w-full px-6 lg:px-10`), layout organized across the viewport — a narrow centered column on a wide screen is a defect, and the Fix mode flags it like any other violation. The only surviving `max-w` is the prose line-length measure on a paragraph. **And every screen is responsive by default (§5.3):** it holds from 390px phone width to ultrawide without being asked — grids collapse, panes stack below `lg`, no horizontal scrollbar at any width, touch targets stay tappable — and the §13.3 Responsive row is driven, not assumed.
- **Fix:** ask the scope (one screen, some files, or scan the whole project) → audit against §10 and the §13.2 checklist → present the violations as a findings list first, never fix-as-you-scan → apply the approved fixes → re-review through the gate.
- **Apply to project:** first detect whether a design system already exists (theme/tokens in the Tailwind config, CSS custom properties, a styled-components theme, imported font packages…).
  - *Nothing found:* say so, then run the §12 bootstrap directly — no overwrite warning, no prompts at all.
  - *One found:* show a preview — what will be replaced, what stays — and proceed only on an explicit confirmation, recommending a git commit/branch first.
  - **After that, the sweep runs unattended — one decision, whole project.** Enumerate every screen and component from the router and pages/components directories, then migrate ALL of them to the design plan in one pass: tokens, type, surfaces, full-width containers (§5.1), responsive behavior (§5.3), density (§11). Never stop to ask "now the login screen?" or "shall I do the dashboard next?" — the user already decided when they chose Apply. Work through the whole list, then finish with a §13 review pass across every affected screen and report ONE summary at the end: what was migrated, what the review found and fixed, and anything that genuinely needs a human decision (listed for later, not asked one by one).
- **Browse:** present a compact brief obeying §11's own density rules — identity & the seven §1 principles, the palette at a glance (§2), the two-voices type system (§3), the workhorse components (`.card`, `.label-mono`, `.stat-num`, `Pill`, `SectionCard`, `MetricTile`, the primary button — §4–§6), and the governance layer (§11 density ladder, §12 nothing-skipped adoption, §13 review gate). Specific questions ("what's the exact card shadow?") answer from the relevant § of the bundled document, quoted exactly.

## How to work

**1. Read before you build.** Pull the relevant sections of `references/design.md` before writing UI code — it carries exact values and class recipes, so nothing needs reverse-engineering:

| Need | Section |
|---|---|
| Principles & identity (elevation = brighter, no red ever, AI is ambient) | §1 |
| Color tokens, gradients, semantic meanings | §2 |
| Typography: families, scale, the marquee-serif rule | §3 |
| Surfaces, shadows, radii (the glass `.card`) | §4 |
| Shells, spacing rhythm, z-ladder | §5 |
| Component recipes (Pill, SectionCard, buttons, modals, inputs, chat, opening grammar) | §6 |
| Motion: easings, durations, AnimatePresence rules, reduced motion | §7 |
| Icons & data-viz color mapping | §8 |
| Voice & microcopy | §9 |
| The do/don't checklist | §10 |

**2. Structure content by §11 (density & progressive disclosure).** Body copy past ~3 lines becomes titled brand-dot bullets; state-bearing lists use the earned-checkmark vocabulary (a checkmark is a claim — only verified states wear it); a page that outgrows its scroll converts to URL-backed tabs, never a longer scroll. The ladder is `sentence → bullets → titled groups → tabs → separate screen`, one rung at a time.

**3. In a new or partially-adopted project, run the §12 bootstrap before the first screen ships:** tokens into the Tailwind config, fonts loaded, `.card`/`.label-mono`/`.stat-num`, the primitives ported, global chrome, the motion clamp, a test framework, and the review gate wired into the definition of done. Any deviation from the document must be written down (rule, reason, approver) — an undocumented deviation is a bug. Brand hexes may be re-pointed for a different brand; the principles, density rules, review gate, and accessibility floors are invariant.

**4. "Done" is gated by §13.** No UI change is done because it compiles or looks right to its author. Before confirming done: drive the §13.3 state & edge-case matrix on the running screen (loading, empty, error, overflow, keyboard, races, deep links, reduced motion, responsive), then have a **non-author review pass** walk the §13.2 checklist — spawn a fresh reviewer subagent where available, since the author of the code must not be its only judge. Findings get fixed and re-reviewed, never waived. The shipping bar is zero known failures.

## Writing voice — no AI fingerprints, ever

Every word this skill produces — UI microcopy, headings, empty states, error messages, review findings, docs — must read like a human expert wrote it. This holds in every mode, no matter what the task is. Copy that smells generated erodes trust in the whole product the same way a broken citation does.

- Write direct, natural, conversational prose. Vary sentence length — short ones are fine, and often better. Say the thing plainly instead of dressing it up.
- Banned: AI clichés and buzzwords ("seamless", "elevate", "unlock", "empower", "delve", "robust", "leverage", "streamline", "harness", "in today's fast-paced world", "it's important to note", "whether you're a beginner or an expert"), chained polished transitions ("Moreover… Furthermore… Additionally…"), triple-parallel marketing rhythm ("Fast. Simple. Powerful."), and flourish endings ("…and so much more!").
- No robotic formality, no fake enthusiasm. If a sentence could open a press release, rewrite it.
- For UI copy, §9 of the bundled document sets the format (sentence case, verb-first CTAs, lowercase status words, first-person Iris); this rule rides on top and governs the tone.
- The §13 reviewer treats AI-sounding copy as a violation like any other: it gets flagged, fixed, and re-reviewed — never waived.

## Working alongside other design tooling

If the project mandates a craft skill (e.g. `impeccable` in aia-brand-planning), use both: that skill drives the design *process*; this document remains the authority on the visual *language* and the governance (density, adoption, review gate). When the two disagree on a value or recipe, `references/design.md` wins.

## Maintenance

The canonical source of this document lives in the `aia-brand-planning` repo (`design.md`, versioned in its header). When that file revs, refresh `references/design.md` here and re-share the packaged skill so every consumer inherits the update.
