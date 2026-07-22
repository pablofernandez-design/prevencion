# Accessibility — High-Contrast (AAA) Mode

Handoff documentation for the high-contrast accessibility variant of the Qida Customer Portal prototype. Scope: **only the `body.high-contrast` overlay**, not the default theme.

## Contract

When `body.high-contrast` is present, every status surface (red / amber / green) and every text/background pair must hit **WCAG 2.1 AAA (≥7:1 normal text, ≥4.5:1 large/UI)**. Default-theme tokens are not AAA — toggling the class swaps in a parallel token set and a small number of per-component overrides where component-level hardcoded colors couldn't be reached via tokens alone.

## Files in this folder

| File | What it contains |
|---|---|
| [tokens-diff.md](./tokens-diff.md) | Token-level spec: every `--plan-*`, text, and border token's default → high-contrast value with measured contrast ratios. |
| [component-overrides.md](./component-overrides.md) | Per-component AAA override map for the 22 components/surfaces that needed manual tightening beyond tokens. |
| [wiring.md](./wiring.md) | How to wire up the toggle (HTML markup, CSS scoping rule, JS handler). Includes the synced-state pattern for multi-instance triggers. |
| [checklist.md](./checklist.md) | Pre-merge contrast verification checklist. Run before shipping any new component. |

## Source of truth

`styles.css`, lines ≈ 3297 onward (`body.high-contrast` block + per-component overrides). All documented values match the source verbatim — if anything diverges, the CSS wins, raise a doc PR.

## TL;DR for devs

1. Add `body.high-contrast` toggle wired to `aria-checked` on a `<button role="switch">` (see [wiring.md](./wiring.md)).
2. Use the AAA tokens — never hardcode `--plan-red`/`--plan-amber`/`--plan-green` values; the cascade handles it.
3. For any new component with status colors, run the [checklist](./checklist.md) before merge.
