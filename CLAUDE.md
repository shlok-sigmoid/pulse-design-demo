# Pulse — pulse-from-scratch branch

Static HTML/CSS demo of the design-plan skill. No build step, no dependencies. Serve with `python3 -m http.server 8080`. This branch now carries the generated app: the ATLAS-2 dashboard (`index.html`) and settings (`settings.html`), built from the design system alone.

## Design authority

All UI in this repo derives from the bundled design system (v1.7) at `.claude/skills/design-plan/references/`, split one file per section (`00-index.md` maps what lives where). Read the relevant section file before touching any screen — tokens (`02-color.md`), type (`03-typography.md`), surfaces (`04-surfaces.md`), layout (`05-layout.md`), components (`06-components.md`), motion (`07-motion.md`), density (`11-density.md`) — and only the files the task needs. Nothing ships without the §13 review gate (`13-review-gate.md`): drive the state matrix on the running page, then have a non-author pass walk the checklist.

`styles.css` carries the full token base and the ported primitives — `.card`, `.label-mono`, `.stat-num`, `.pill` + tone variants, `.btn-primary` / `.btn-secondary` / `.btn-ghost` / `.btn-danger`, `.progress`, `.metric-tile`, `.input`, `.empty-state`, the §6.6 modal, and the analyst treatments (comet border, iris grid, scan sweep). Compose these before writing any one-off style.

## Deviations from design.md

| Rule | Deviation | Reason | Approved |
|---|---|---|---|
| §12 test framework | No npm test framework; the §13.3 matrix rows are driven in a real browser (Playwright or by hand) per the §13.4 scripted-drive clause | The repo is deliberately build-free — its whole point is pages that run from a plain HTTP server | pending — flagged in the apply-mode summary, 2026-08-27 |
| §6.11 shared chrome | The app header has no Sign out control | The demo has no auth — there is no session to sign out of | recorded here, 2026-08-27 |
