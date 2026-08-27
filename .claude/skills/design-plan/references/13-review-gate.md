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

