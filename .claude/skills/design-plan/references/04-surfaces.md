## 4. Surfaces & elevation

### 4.1 The glass card

```css
.card { @apply rounded-2xl border border-line bg-ink-800/70 shadow-card backdrop-blur-sm; }
```
= radius `1.25rem`, hairline `rgba(11,33,56,0.10)`, white at 70% opacity, `blur-sm` glass over the blue-tinted canvas. This is the base of `SectionCard`, `MetricTile`, and most panels.

### 4.2 Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 2px 0 rgba(11,33,56,0.04), 0 10px 28px -16px rgba(11,33,56,0.20)` | resting elevation (119×) |
| `shadow-glow` | `0 0 0 1px rgba(1,135,250,0.35), 0 12px 38px -10px rgba(1,135,250,0.32)` | brand halo — hover on cards, always-on for gradient elements (113×) |
| `shadow-modal` | `0 30px 70px -24px rgba(11,33,56,0.45)` | floating dialogs + rich tooltips |

Arbitrary shadows stay in the navy/brand families, e.g. user-bubble drop `shadow-[0_10px_26px_-14px_rgba(1,1,201,0.55)]`. Drawer edges: the standard chat-drawer edge is `shadow-[-16px_0_48px_-24px_rgba(11,33,56,0.42)]` (3×); the SourceInspector uses `-12px_0_40px_-12px`; the rarer `-12px_0_32px_-22px_rgba(11,33,56,0.35)` variant appears twice.

### 4.3 Radii (config overrides `xl: 0.875rem`, `2xl: 1.25rem`)

| Radius | Use |
|---|---|
| `rounded-full` | pills, badges, progress bars, dots, avatars, blur orbs |
| `rounded-lg` (0.5rem) | small icon chips, ghost icon buttons, micro-badges |
| `rounded-xl` (0.875rem) | buttons, inputs, icon squares, rich tooltips |
| `rounded-2xl` (1.25rem) | cards, chat bubbles, FAB squares, popovers |
| `rounded-3xl` (1.5rem) | modals and hero panels |
| `rounded-[calc(1.5rem-1px)]` | inner panel inset 1px inside a gradient `p-px` frame |

### 4.4 Borders, blur, scrims

- `border-line` is the universal hairline (258×); `border-line-strong` only on chat-dock/drawer left edges (17×). Dashed `border-dashed border-line` marks empty states and "add" affordances.
- `backdrop-blur-sm` on cards, translucent headers (`bg-white/50–/80`), tooltips (`bg-white/95`), nav rail (`bg-white/55`); `backdrop-blur-md` on the workspace/marketing sticky headers.
- Scrims: dark navy — `bg-[#0b2138]/45 backdrop-blur-[3px]` or `bg-[#0A1150]/55 backdrop-blur-sm`; popovers use an invisible `fixed inset-0` click-away layer instead.

---

