# pulse-before-design

This branch is the broken starting point: the ATLAS-2 study dashboard built against the design system on purpose. Serve it, look at it, then let the skill repair it.

Run it:

```bash
python3 -m http.server 8080
```

Then open Claude Code in this folder and type `/design-plan` → **Fix** → whole project. The skill lists every violation before touching anything, fixes what you approve, and re-reviews the result through its own gate. Compare the outcome with the `pulse-after-design` branch.

What's deliberately wrong here:

- Red everywhere — the CRITICAL alert box, error text, LOGOUT and FIX NOW buttons, the spinner. The system bans red; negative is magenta.
- A fixed 720px column floating in the middle of any wide screen, and no responsiveness at all.
- Arial body text and a Times New Roman logo instead of Inter, IBM Plex Mono, and the editorial serif.
- A rainbow bar chart; the system maps data colors to meaning, all in the blue family.
- A wall of marketing copy stuffed with banned phrases ("seamless", "empower", "unlock", "harness"…).
- A loud spinner and a ✅ on the AI panel — the system's AI presence is ambient, never a spinner.
- ALL-CAPS SHOUTING microcopy, harsh dark shadows, sharp corners, "Fast. Simple. Powerful."
- A fake live counter that churns random numbers, and a checkmark that claims an analysis nobody ran.
