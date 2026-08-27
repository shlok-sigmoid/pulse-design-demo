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

