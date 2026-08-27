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

