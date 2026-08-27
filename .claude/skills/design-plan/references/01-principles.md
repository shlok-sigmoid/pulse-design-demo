## 1. Design identity & principles

A **light pharma canvas** (`color-scheme: light`): soft blue-tinted whites, deep navy ink, and one brand gradient — deep blue `#0101C9` → bright blue `#0187FA` — that marks every primary action and everything Iris (the AI analyst) touches.

Core principles, all enforced in code:

1. **Elevation = brighter.** The `ink` scale runs deepest (`ink-950`, pale blue) → most elevated (`ink-700`, pure white). Raised surfaces are whiter, not shadow-heavier.
2. **No red, ever.** Negative/danger is magenta-purple (`neg #a21caf`, deeper `#b4276e`) — it stays in the blue/purple family by design.
3. **No fill is ever flat** where the system provides a gradient. Primary fills use `bg-brand-gradient`; even the green "success path" ships as `bg-gradient-green` "so no fill is ever flat" (config comment).
4. **The AI is ambient, not loud.** Iris presence is signalled by quiet looping texture (orbiting comet borders, dot grids, HUD brackets, scan sweeps) — never spinners or checkmarks on analyst surfaces. "Ambient pinging is noise": one-shot hails, not loops.
5. **Two voices of type.** Editorial serif (`font-display`) for marquee headlines only; Inter for all body/UI; IBM Plex Mono for every number, kicker, and metadata readout.
6. **Prefer primitives.** `Pill`, `SectionCard`, `MetricTile`, `ProgressBar`, `.card`, `.label-mono`, `.stat-num` — compose these instead of one-off styling.
7. **AA contrast on white.** Semantic colors are pre-darkened; small text on tinted surfaces uses the deeper inks (`#8a5a12` gold, `#0b7a52` green, `#0101C9` blue).

---

