## 10. Rules — do / don't

**Do**
- Use `bg-brand-gradient` (+ white text + `shadow-glow`) for every primary action and Iris identity chip — gradient, not flat, wherever the system provides one (green path included: `bg-gradient-green`).
- Keep marquee headings in the editorial serif: `font-display font-semibold text-balance tracking-tight` with the rem-bracket ladder. Body/UI stays Inter.
- Build status chips with the tint formula `border-{c}/30 bg-{c}/10 text-{c}` on `rounded-full`.
- Reach for the primitives (`Pill`, `SectionCard`, `MetricTile`, `ProgressBar`, `.card`, `.label-mono`, `.stat-num`) before writing one-off styles.
- Express elevation as *brighter* (whiter fill, glass blur) + `shadow-card` → `shadow-glow` on hover/selection.
- Put every numeral in `.stat-num`, every eyebrow in `.label-mono`; widen mono tracking as size shrinks.
- Use the two house easings (`[0.2,0.7,0.2,1]`, `[0.16,1,0.3,1]`), 0.45s entrances, small y-rises, and honor `useReducedMotion` on every loop and gesture.
- Use `SectionLoader`'s comet ring for loading, dashed `border-line` containers for empty states.
- Focus states: rounded/pill controls and segmented buttons suppress the global outline and use `focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60` (the dominant recipe, 20×); plain inputs get `focus:border-brand-blue/50 focus:ring-2 focus:ring-brand-blue/25`; everything else falls back to the global `:focus-visible` outline.
- Break body copy past ~3 rendered lines into titled brand-dot bullets, use the check vocabulary only on earned states, and convert a page that has outgrown its scroll into URL-backed tabs (§11).
- Treat "done" as gated: drive the §13.3 state matrix on the real screen, then get the §13 reviewer's explicit confirmation — zero known failures is the shipping bar.

**Don't**
- **Never introduce red.** Danger is magenta (`neg #a21caf` / `#b4276e`), warning is gold — stay in the family.
- **Don't paint action buttons with `neg`** (v1.7). Destructive confirms wear the primary `bg-brand-gradient` recipe behind a §6.6 confirm dialog; `neg` marks status — pills, deltas, failed states — never a button.
- Don't revert marquee serif headings to sans, and don't let the serif leak into body/UI copy.
- Don't use the old palette (`#0093d0`, `#2bb8ff`, `#7c3aed`) — dead, save one legacy literal in `VarianceWaterfall.tsx`.
- Don't use the `pink` Pill tone (deprecated alias of `blue`) or grey skeleton loaders or raw spinners on analyst surfaces.
- Don't nest `AnimatePresence mode="wait"` inside another — it deadlocks; keyed `motion.div` with no `exit` for discrete swaps. `mode="popLayout"` children need `forwardRef`.
- Don't loop attention-getting pulses — hails fire once or twice, then rest.
- Don't hard-code new hexes when a token or a listed de-facto literal (§2.7) exists; don't put chart value labels in SVG text.
- Don't give a shell more than one scrolling pane, and don't size lucide icons with the `size` prop.
- Don't ship prose walls, endless scrolls, or an unreviewed "done" — the §11 disclosure ladder and the §13 gate are not optional.

---

