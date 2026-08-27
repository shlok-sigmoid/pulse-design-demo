## 14. Document maintenance

- **Source of truth is the code.** This document describes the system as implemented in `tailwind.config.ts`, `src/index.css`, and `src/**` on the date in the header. When a token, recipe, or convention changes in code, update the relevant section here in the same change.
- **Update triggers:** any edit to `tailwind.config.ts` or `src/index.css`; a new or changed primitive in `src/components/primitives.tsx`; a new shell/page pattern; a deliberate exception to a rule in §10; a density, adoption, or review rule (§11–§13) learned in practice in any adopting project.
- **Versioning:** bump the version in the header and note the date whenever a section materially changes.
- **Known stale reference elsewhere:** the "Design system (Tailwind)" section of `CLAUDE.md` still cites the retired palette (`#0093d0` / `#2bb8ff` / `#7c3aed`). This document supersedes it.
