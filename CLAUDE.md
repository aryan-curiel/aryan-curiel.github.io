# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a single-file static portfolio site (`index.html`) deployed to GitHub Pages. There is no build step, no package manager, and no framework — plain HTML, CSS, and JavaScript all in one file.

## Architecture

Everything lives in `index.html`:

- **CSS** (lines ~10–980): CSS custom properties (`--bg`, `--surface`, `--primary`, etc.) drive the entire design system. A `[data-theme="light"]` block overrides the dark defaults. All colours, spacing, and typography reference these variables.
- **HTML** (~980–1465): Sidebar navigation, mobile header, terminal easter egg dialog, hero section, experience timeline, skills bento grid, education card, footer.
- **JavaScript** (~1466–1627): Theme toggle (persists to `localStorage`), scroll-progress bar, custom cursor (`#cursor`), email copy-to-clipboard with toast, scroll reveal via `IntersectionObserver`, sidebar active-state tracking, mobile nav, and the interactive terminal easter egg.

## Design system

Fonts loaded from Google Fonts:
- **Space Grotesk** — headings, logo, footer name
- **JetBrains Mono** — nav items, tags, badges, terminal, monospace labels
- **Inter** — body text

Accent colours: `--primary` (indigo), `--cyan`, `--amber`, `--green`, `--red`.

## Key interactive features

- **Terminal easter egg**: toggled by the `>_` button (bottom-right) or pressing `t`. Commands: `skills`, `stack`, `contact`, `languages`, `location`, `clear`, `help`. Add new commands to the `CMDS` object in the script.
- **Theme toggle**: sidebar button + mobile button both call `toggleTheme()`. State stored in `localStorage` key `'theme'`.
- **Scroll reveal**: elements with class `reveal` animate in via `IntersectionObserver`; add `reveal` to any new section block.
- **Sidebar active state**: driven by a second `IntersectionObserver` watching `section[id]` elements; nav items match via `data-section` attribute.

## Responsive layout

- Desktop (>768px): fixed sidebar (`--sidebar-w: 256px`), main content offset by `margin-left`.
- Mobile (≤768px): sidebar hidden, `mobile-header` shown, single-column timeline and bento grid.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` collapses all animations.

## Deployment

Pushed to `main` branch → GitHub Pages serves it automatically. No CI, no build artifacts.
