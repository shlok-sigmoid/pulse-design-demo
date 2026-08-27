# Design System — AIa Brand Planning (Frontend)

| | |
|---|---|
| **Product** | AIa Brand Planning — React frontend (`aia-brand-planning`) |
| **Document status** | Canonical design reference — organization-wide |
| **Version** | 1.6 |
| **Last generated** | 2026-08-13 (extracted and verified from the codebase); v1.1 2026-08-14 — analyst rooms aligned to the workspace type scale (one serif h1 per screen), analyst-brief selection unified on the brand gradient; v1.2 2026-08-18 — app-wide journey redesign: shared AppHeader/breadcrumbs, opening grammar (§6.11), chat identity unified, SectionCard chrome tiers; v1.3 2026-08-19 — hybrid journey (Iris Console home, JourneyBar, GuideStrip, §6.12), all page containers full-bleed; v1.4 2026-08-26 — governance layer: content density & progressive disclosure (§11), new-project adoption protocol (§12), design review gate & QA matrix (§13); document maintenance renumbered to §14; v1.5 2026-08-27 — full-width mandate: a screen never renders as a narrow centered column, page containers are full-bleed (§5.1); v1.6 2026-08-27 — responsive by default: every screen holds from phone to ultrawide without being asked (§5.3) |
| **Source of truth** | `tailwind.config.ts` + `src/index.css` — if this document and the code disagree, the code wins |
| **Stack** | Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · lucide-react |
| **Bundle layout** | Split into one file per section (this folder) so a task reads only what it needs. Content is verbatim from the canonical single-file `design.md`; only the file boundaries were added. |

**Purpose.** This is the single reference for anyone building or reviewing UI in this application. It captures the complete design language — color, typography, surfaces, layout, components, motion, iconography, and voice — with exact values, so that new UI can be produced on-brand without reverse-engineering the codebase.

**How to use it.** Building a new screen or component: read §1 (principles), then pull exact recipes from §4–§6. Choosing colors: §2. Setting type: §3. Adding motion: §7. Structuring text-heavy content or a page that has outgrown its scroll: §11. Standing this system up in a new project: §12 — when this document is present, everything is designed from it by default. Reviewing a PR for design fidelity: check it against §10 (the do/don't checklist), then confirm it through the §13 review gate — nothing is done until that gate passes.

## Section files

| § | File | Contents |
|---|---|---|
| 1 | `01-principles.md` | Design identity & the seven principles (elevation = brighter, no red ever, AI is ambient…) |
| 2 | `02-color.md` | Ink scale, brand pair, surface/text/lines, semantic set, gradients, CSS vars, de-facto literals, global chrome color |
| 3 | `03-typography.md` | Families, the marquee-serif rule, type scale, weights/tracking/leading, `.label-mono` / `.stat-num`, text color hierarchy |
| 4 | `04-surfaces.md` | The glass `.card`, shadows, radii, borders/blur/scrims |
| 5 | `05-layout.md` | Shells, the full-width mandate (§5.1), spacing rhythm, responsive-by-default (§5.3), z-ladder |
| 6 | `06-components.md` | Pill, SectionCard, MetricTile, buttons, badges, modals, inputs, loading/empty states, iris treatments, chat, opening grammar (§6.11), hybrid journey (§6.12) |
| 7 | `07-motion.md` | Philosophy, easings & durations, Framer conventions, AnimatePresence rules, keyframe inventory, reduced motion |
| 8 | `08-icons-dataviz.md` | lucide conventions, AiMascot, data-viz color mapping |
| 9 | `09-voice.md` | Kickers, headings, separators, status words, Iris voice, CTAs |
| 10 | `10-rules.md` | The do / don't checklist |
| 11 | `11-density.md` | Prose → bullets, checkmarked lists, titles, page → tabs, the disclosure ladder |
| 12 | `12-adoption.md` | Adoption protocol for new projects — the bootstrap checklist, deviations, invariants |
| 13 | `13-review-gate.md` | The reviewer, the §13.2 checklist, the §13.3 state & edge-case matrix, verification protocol |
| 14 | `14-maintenance.md` | Source of truth, update triggers, versioning |

Cross-references inside the sections (e.g. "see §5.1") resolve by section number: §N lives in the file prefixed `N-`.

## Regenerating this split

When the canonical `design.md` revs upstream (`aia-brand-planning` repo), re-split it here and update this index's version row:

```bash
awk '
BEGIN { split("01-principles 02-color 03-typography 04-surfaces 05-layout 06-components 07-motion 08-icons-dataviz 09-voice 10-rules 11-density 12-adoption 13-review-gate 14-maintenance", names, " "); }
/^## [0-9]+\./ { n = $2; sub(/\./, "", n); if (out) close(out); out = names[n+0] ".md"; }
out { print > out }
' design.md
```

Verify the split is verbatim before deleting the single file: concatenate the section files and diff against `design.md` from the `## 1.` line down.
