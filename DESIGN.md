---
name: Developer Console MD3
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#36393e'
  surface-container-lowest: '#0b0e12'
  surface-container-low: '#191c20'
  surface-container: '#1d2024'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323539'
  on-surface: '#e1e2e8'
  on-surface-variant: '#c3c6d0'
  inverse-surface: '#e1e2e8'
  inverse-on-surface: '#2e3135'
  outline: '#8d9199'
  outline-variant: '#43474f'
  surface-tint: '#a9c8fb'
  primary: '#d3e2ff'
  on-primary: '#0a315b'
  primary-container: '#a8c7fa'
  on-primary-container: '#33537f'
  inverse-primary: '#405f8c'
  secondary: '#b6c7e9'
  on-secondary: '#1f314c'
  secondary-container: '#394a66'
  on-secondary-container: '#a8b9da'
  tertiary: '#98f2de'
  on-tertiary: '#00382f'
  tertiary-container: '#7cd5c2'
  on-tertiary-container: '#005c50'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a9c8fb'
  on-primary-fixed: '#001c3b'
  on-primary-fixed-variant: '#274773'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b6c7e9'
  on-secondary-fixed: '#081c36'
  on-secondary-fixed-variant: '#364763'
  tertiary-fixed: '#9af3df'
  tertiary-fixed-dim: '#7dd6c3'
  on-tertiary-fixed: '#00201b'
  on-tertiary-fixed-variant: '#005045'
  background: '#111417'
  on-background: '#e1e2e8'
  surface-variant: '#323539'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: 0em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.01em
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-dense: 0.5rem
  margin: 1.5rem
  margin-compact: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system delivers a high-density, engineering-centric workspace modeled strictly on Material Design 3 (Material You) dark mode architecture. It serves software engineers, DevOps leads, and technical product managers managing complex continuous delivery pipelines and high-velocity Kanban boards.

The aesthetic fuses utilitarian enterprise rigor with the fluid, ergonomic warmth of MD3. It avoids harsh pitch-black contrast in favor of calculated surface chromaticity and meticulous tonal tiering, reducing cognitive fatigue during extended debugging and sprint planning. Interactive states rely on native MD3 state layers (semi-transparent overlays applied directly to surfaces) rather than abrupt color swaps. The overall impression is technical, systematic, hyper-legible, and ergonomically balanced.

## Colors

The system implements the MD3 dark tonal palette, prioritizing high legibility, accessible contrast ratios (WCAG AAA for core text, AA for supporting UI), and strict semantic role attribution.

### Core Roles
- **Primary (`#a8c7fa`):** Electric soft indigo. Applied to primary CTAs, active radio/checkbox states, focused border treatments, and hero indicators.
- **On Primary (`#062e6f`):** High-contrast deep navy ensuring razor-sharp legibility over primary fills.
- **Primary Container (`#0842a0`):** Deep indigo base for prominent cards, primary buttons with tonal priority, and active navigation indicators.
- **On Primary Container (`#d3e3fd`):** Tinted highlight text and iconography resting on primary containers.
- **Secondary Container (`#334460`):** Muted slate-indigo for secondary filters, column headers, and active state chips.
- **On Secondary Container (`#d7e3ff`):** Crisp, readable cool text on secondary surfaces.
- **Outline (`#8e9099`):** Explicit boundary lines for input borders, inactive checkboxes, and structural dividers.
- **Outline Variant (`#44474f`):** Subtle boundaries separating high-density ticket metadata, column tracks, and table rows.

### Tonal Accents (Status & Badges)
- **Success / Healthy:** Base `#7cd5c2` (Teal-Emerald), Container `#005144`, On-Container `#9ef2de`. Used for passed CI/CD pipelines, merged pull requests, and closed milestones.
- **Warning / Stalled:** Base `#fbc02d` (Amber), Container `#4c3b00`, On-Container `#ffe082`. Applied to flaky builds, blocked dependencies, and staging drift.
- **Critical / Blocker:** Base `#ffb4ab` (Coral-Rose), Container `#93000a`, On-Container `#ffdad6`. Reserved for P0 incident trackers, failing pipeline runs, and review vetoes.

### State Layers (Overlays)
Interactions do not replace colors; they composite an `on-surface` or `primary` state layer:
- **Hover:** 8% opacity overlay.
- **Focus:** 12% opacity overlay.
- **Pressed:** 12% opacity overlay.
- **Dragged:** 16% opacity overlay with dynamic elevation shift.

## Typography

Typography balances ergonomic UI scannability with the data density requirements of enterprise developer consoles.

- **Primary UI & Headings (Inter):** Leveraged for all navigation, titles, card descriptions, dialog bodies, and board headers. Inter delivers structural neutrality and high aperture clarity across dense grids.
- **Technical Readouts & Metadata (JetBrains Mono):** Reserved for MD3 labels, commit hashes, branch paths, runtime metrics, ticket ID badges (`SYS-4028`), and table column keys. Its fixed-width metric alignment ensures columnar numbers and status flags do not jitter during dynamic updates.

### Scaling & Readability Rules
- Numerical performance metrics (e.g., latency, code coverage percentages) must always render using `label-md` or `label-lg` with tabular lining figures.
- Ticket headers on Kanban boards strictly utilize `title-sm` with a truncated 2-line maximum clamping rule, while descriptions scale down to `body-sm` to maintain compact vertically stacked lanes.

## Layout & Spacing

The layout is built on a responsive, dense continuous layout model designed to maximize spatial usage across ultrawide monitors and developer workstations.

### Structural Architecture
- **Persistent Navigation Rail:** A fixed 80px (collapsible to 64px) left rail anchoring primary developer tools (Kanban, Pipelines, Repos, Settings).
- **Kanban Board Canvas:** Operates as an independent horizontal scroll container with auto-expanding vertical columns. Columns maintain a strict min-width of 280px and max-width of 340px, spaced by `gutter` (1rem).
- **Split-Pane Detail View:** Clicking an issue card triggers an MD3 side sheet overlay spanning 420px to 540px anchored to the right edge, without reflowing the underlying Kanban column offsets.

### Responsive Breakpoints
- **Compact (< 600px):** Single-column stacked view; bottom navigation replaces the left rail; issue cards span 100% viewport width with `margin-compact`.
- **Medium (600px - 1024px):** 2-to-3 column swipeable Kanban track; rail collapses to compact icon-only format (56px).
- **Expanded (> 1024px):** Full multi-lane board view; side inspection drawer mounts concurrently with zero viewport displacement.

## Elevation & Depth

Consistent with Material Design 3 guidelines for dark themes, physical cast shadows are minimized. Depth is achieved via **Surface Container Elevation Tiers**, mapping tonal luminosity directly to structural importance and interaction layers.

- **Level 0 (Canvas Base / App Background):** `Surface Dim` (`#111318`) and `Surface` (`#141218`). The root workspace foundation behind the board tracks.
- **Level 1 (Column Tracks / Canvas Containers):** `Surface Container Low` (`#191c20`). Demarcates Kanban column bodies and utility bars.
- **Level 2 (Resting Cards & Filter Chips):** `Surface Container` (`#1d2024`) with an `Outline Variant` (`#44474f`) 1px crisp stroke. Cards rest visibly above column tracks.
- **Level 3 (Hovered Cards / Sub-menus):** `Surface Container High` (`#282a2f`). Elevated through an applied 8% Primary State Layer combined with a crisp, low-spread ambient glow: `box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.45)`.
- **Level 4 (Dragging Cards / Active Dialogs):** `Surface Container Highest` (`#33353a`) with `box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.60)` and an outline transition to `Primary` (`#a8c7fa`) at 40% opacity.
- **Level 5 (Modals / Alert Drawers):** `Surface Bright` (`#37393e`) overlaid on a 60% alpha backdrop scrim (`#00000099`).

## Shapes

The design system adheres to MD3's expressive roundedness schema, calibrated to preserve maximum data density within an engineering tool.

- **Pill (Full Radius / `9999px`):** Used exclusively for MD3 Filter Chips, Assist Chips, Action Buttons (Filled & Tonal), Avatar groupings, and the active background pill indicator in the Navigation Rail.
- **Extra Large (`rounded-2xl` / 1.5rem):** Modal containers, persistent bottom sheets, and the main Kanban slide-over issue detail drawer.
- **Large (`rounded-xl` / 1rem):** Master column lanes and high-level analytical widget containers.
- **Medium (`rounded-lg` / 0.5rem):** Standard issue cards, commit summary tiles, dropdown menus, and code snippet blocks.
- **Small (`rounded-md` / 0.25rem):** Inline badges, pull request status chips, input boxes, and contextual tooltips.

## Components

### Buttons
- **Filled Button:** Reserved for primary actions (e.g., "Create Sprint", "Deploy"). Background `#a8c7fa`, text `#062e6f`, fully pill-shaped (`rounded-full`), height 36px, `label-lg`.
- **Tonal Button:** For secondary board actions (e.g., "Add Issue"). Background `Secondary Container` (`#334460`), text `On Secondary Container` (`#d7e3ff`).
- **Outlined Button:** Transparent background, 1px border `Outline` (`#8e9099`), text `On Surface` (`#e2e2e9`).

### Chips (MD3 Filter & Input Chips)
- Height: 32px. Border radius: full pill.
- **Inactive:** `Surface Container Low` fill with 1px `Outline Variant` border. Text: `On Surface Variant`.
- **Selected Filter Chip:** `Secondary Container` fill with no border. Leading icon includes a 16px checkmark in `On Secondary Container`.
- **Badge Chips (Code/Git):** Font: `JetBrains Mono` (`label-sm`), vertical padding 2px, horizontal 6px, radius 4px (`rounded-sm`).

### Kanban Cards
- Base surface: `Surface Container` (`#1d2024`).
- Border: 1px continuous border using `Outline Variant` (`#44474f`).
- Padding: `space-md` (0.75rem / 12px) for optimal vertical density.
- Header: Ticket key (e.g., `CORE-129`) in `JetBrains Mono` (`label-md`) colored with `Primary`, next to assignee avatar (24px circle).
- Title: 2 lines max clamped in `Inter` (`title-sm`), color `On Surface`.
- Footer: Labels container with priority icon (Critical rose dot, High amber dot, Low slate dot) and comment/attachment count indicators in `On Surface Variant`.

### Checkboxes & Radio Buttons
- Selected state fills with `Primary` (`#a8c7fa`), rendering inner glyph/dot in `On Primary` (`#062e6f`).
- Unselected state renders a 2px outline in `Outline` (`#8e9099`).
- Targets maintain a 40x40px touch/click target with centered 18x18px glyph visuals.

### Input Fields
- MD3 Outlined TextField pattern.
- Resting: 1px border in `Outline`, label floating on container edge in `On Surface Variant`.
- Focus: 2px border in `Primary`, floating label in `Primary`.
- Dense sizing: 44px total box height for search filters and board query bars.

### Navigation Rail
- Positioned vertically on the left, 80px width, surface `Surface Dim` (`#111318`).
- Active item uses an MD3 horizontal indicator pill (56px width, 32px height) filled with `Primary Container` (`#0842a0`), housing an `On Primary Container` (`#d3e3fd`) icon, with a `label-sm` title centered below.