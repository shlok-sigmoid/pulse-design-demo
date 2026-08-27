# pulse-from-scratch

This branch has no dashboard — just a welcome page on the design system's token base. It exists to show the skill generating a whole app with no "before" to copy from.

Run it:

```bash
python3 -m http.server 8080
```

Then open Claude Code in this folder and ask for the app in plain words — "build the Pulse clinical study operations dashboard" — or type `/design-plan` and pick **Generate**. The skill designs every screen from `.claude/skills/design-plan/references/design.md`: full-bleed responsive layout, the opening grammar, glass cards, tint pills, mono numerals, the review gate before anything counts as done.

Compare what it builds with the `pulse-after-design` branch — same system, independent construction.
