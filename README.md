# Pulse — design-plan skill demo

Pulse is a small clinical study operations dashboard — site enrollment, screen failures, and safety queries for a made-up phase 3 study called ATLAS-2. It's static HTML/CSS/JS with no build step, and it exists to show what the `design-plan` skill does. The skill ships inside this repo at `.claude/skills/design-plan/`, so it's active the moment you clone a branch and open Claude Code in the folder.

## The three branches

| Branch | What's in it | What to do with it |
|---|---|---|
| `pulse-before-design` | The study dashboard built wrong on purpose — red everywhere, Arial, a narrow centered column, a rainbow chart, a spinner on the AI panel, marketing copy. | Run `/design-plan`, pick **Fix**. The skill audits every screen, lists the violations, and repairs them to match the design system. |
| `pulse-after-design` | The same dashboard already corrected, straight from the design system. | The answer key. Compare it against what Fix produces on the before branch. |
| `pulse-from-scratch` | Only a welcome page. No dashboard exists yet. | Ask Claude to build the Pulse study dashboard. The skill generates it from the design system without a "before" to copy from. |

## Running any branch

```bash
git clone https://github.com/shlok-sigmoid/pulse-design-demo.git
cd pulse-design-demo
git checkout pulse-before-design   # or pulse-after-design / pulse-from-scratch
python3 -m http.server 8080
```

Open http://localhost:8080. No install, no build — the pages are plain HTML.

## Demo script

1. **Before.** Check out `pulse-before-design`, serve it, open the browser. Point out the red alert card, the rainbow chart, the 720px column floating in the middle of the screen.
2. **Fix.** Open Claude Code in the folder and type `/design-plan` → Fix → whole project. The skill lists every violation first, then repairs the ones you approve and re-reviews the result through its own gate.
3. **Compare.** Check out `pulse-after-design` and refresh. This is what the fix should converge on — same data, same pages, on-system.
4. **From scratch.** Check out `pulse-from-scratch`, refresh, and show the welcome page. Ask Claude: "build the Pulse clinical study operations dashboard". The skill designs it from the document alone.

## What the skill enforces (short version)

- One blue brand gradient (`#0101C9 → #0187FA`) on every primary action. No red anywhere — negative is magenta.
- Inter for body, IBM Plex Mono for every number and kicker, an editorial serif for one marquee heading per screen.
- Full-width, responsive screens: no centered strip on a wide monitor, no horizontal scrollbar at phone width.
- Glass cards, hairline borders, navy-family shadows.
- No prose walls, no spinners on AI surfaces, no marketing copy that sounds generated.
- A review gate: nothing counts as done until a non-author pass walks the checklist against the running screen.

The full document (v1.7) lives at `.claude/skills/design-plan/references/`, split into one file per section — `00-index.md` maps what lives where.
