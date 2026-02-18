// Use CSS custom properties in styles and animations for all design tokens.
// Keeping a small TS mirror for motion-only inline values.
export const cssVars = {
  colorBg: 'var(--color-bg)',
  colorInk: 'var(--color-ink)',
  colorRust: 'var(--color-rust)',
} as const

export const ease = [0.16, 1, 0.3, 1] as const;
