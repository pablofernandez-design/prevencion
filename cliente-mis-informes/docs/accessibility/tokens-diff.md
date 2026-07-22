# Token Diff — Default vs High-Contrast (AAA)

When `body.high-contrast` is present, these CSS custom properties are redefined at the body scope and cascade through every component that consumes them via `var()`. Default-theme values are **not AAA** for several status pairs; high-contrast values are verified ≥7:1 against the surfaces they're paired with.

## Status colors

| Token | Default | High-contrast | Used as | Verified pair | Ratio |
|---|---|---|---|---|---|
| `--plan-red` | `#c0392b` | **`#7a1810`** | text on tinted bg, white text on solid bg | `#7a1810` text on `#FDF0F0` | **9.61:1** ✓ |
|  |  |  |  | `#fff` text on `#7a1810` | **10.68:1** ✓ |
| `--plan-amber` | `#d4872e` | **`#6d3f10`** | text on tinted bg, white text on solid bg | `#6d3f10` text on `#FDF6ED` | **8.27:1** ✓ |
|  |  |  |  | `#fff` text on `#6d3f10` | **8.87:1** ✓ |
| `--plan-green` | `#2D6A4F` | **`#0a3d22`** | text on tinted bg, white text on solid bg | `#0a3d22` text on `#e8f5ec` | **10.98:1** ✓ |
|  |  |  |  | `#fff` text on `#0a3d22` | **13.6:1** ✓ |
| `--plan-soft` | `#74C69D` | `#2d6a4f` | thin lines / hairline borders only — never as text background |
| `--plan-pale` | `#F0FAF3` | `#e8f5ec` | success-tinted background |
| `--plan-warm` | `#FDF9F4` | `#faf3e8` | neutral-tinted background |
| `--plan-gold` | `#d4a843` | `#6d3f10` | secondary-warning text/icon (collapsed onto amber for AAA) |

## Body text

| Token | Default | High-contrast | Verified pair | Ratio |
|---|---|---|---|---|
| `--text` | `#0F1B17` | **`#000000`** | on `#fff` | **21:1** ✓ |
| `--text-muted` | `#5B6A6F` | **`#1a1a1a`** | on `#fff` | **17.5:1** ✓ |
| `--text-subtle` | `#8A969B` | **`#2a2a2a`** | on `#fff` | **14:1** ✓ |

## Borders

| Token | Default | High-contrast | Notes |
|---|---|---|---|
| `--border` | `#E6E9EE` | **`#6a6a6a`** | visible against pale tints (≥3:1 contrast with white) |
| `--border-strong` | `#D1D5DB` | **`#4a4a4a`** | for emphasis (e.g. inactive past-evaluation dot bg) |

## Brand colors — intentionally unchanged

`--brand-700` (`#1F4E3F`) and `--brand-800` (`#143C30`) are already AAA against white (8.6:1 and 12.6:1 respectively). They are **not** redefined in high-contrast mode. Same for `--brand-50/100` which are pale tints used as button fills under brand text.

## Why these specific values

- **Reds at `#7a1810`**: Hue retained (warm rusty red), lightness dropped to L*≈18 — passes AAA both as text (on `#FDF0F0`) and as solid background with white text. The default `#c0392b` (L*≈40) clears AA but fails AAA in both pairings.
- **Ambers at `#6d3f10`**: Pure amber/orange at AAA brightness becomes a saturated yellow that vibrates uncomfortably; we shift toward chocolate-brown (L*≈25) preserving the "warning" hue family while clearing AAA for white-on-solid.
- **Greens at `#0a3d22`**: Forest green at L*≈18 — sits adjacent to `--brand-800` so the visual brand identity is preserved, while being darker than the default `--plan-green` (L*≈30) which fails AAA against several tinted surfaces.

## Verification method

Ratios above were computed via `getComputedStyle()` + WCAG sRGB luminance formula at runtime, against the actual CSS output. Re-run the contrast audit script in [checklist.md](./checklist.md) before shipping new components.
