# pulse-after-design

This branch is the answer key: the Pulse dashboard and settings page already on the design system, built from `.claude/skills/design-plan/references/design.md` (v1.6) with nothing skipped.

Run it:

```bash
python3 -m http.server 8080
```

What to look for, compared with `pulse-before-design`:

- Full-bleed responsive layout — the page uses the whole viewport and holds from 390px to ultrawide with no horizontal scrollbar.
- Every screen opens the same way: mono kicker byline, one serif headline, one plain verdict sentence with the figures inline.
- One brand gradient (`#0101C9 → #0187FA`) on primary actions. Negative numbers are magenta, warnings gold — no red on either page.
- Glass cards with hairline borders and navy-family shadows; status rendered as tinted pills, never solid fills.
- All numerals in IBM Plex Mono tabular figures; kickers uppercase mono with wide tracking.
- The AI panel holds with a scan sweep (no spinner), then Iris reports in first person with titled bullets.
- The settings error states a human reason and clears when fixed; delete-account confirms through a modal that closes on Escape and returns focus.
- Reduced motion is honored everywhere: loops stop, entrances settle instantly.

This build passed the §13 review gate: the state matrix was driven on the running pages (responsive widths, keyboard, error, save, modal, reduced motion) and a non-author pass walked the §13.2 checklist.
