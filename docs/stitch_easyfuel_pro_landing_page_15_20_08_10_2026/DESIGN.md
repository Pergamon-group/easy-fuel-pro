---
name: Industrial Tech Fleet Architecture
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4850'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7881'
  outline-variant: '#bdc8d1'
  surface-tint: '#00658d'
  primary: '#00658d'
  on-primary: '#ffffff'
  primary-container: '#00a3e0'
  on-primary-container: '#00354b'
  inverse-primary: '#81cfff'
  secondary: '#565d79'
  on-secondary: '#ffffff'
  secondary-container: '#d8deff'
  on-secondary-container: '#5a627e'
  tertiary: '#006591'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a2e6'
  on-tertiary-container: '#00344e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#81cfff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#bec5e5'
  on-secondary-fixed: '#131a33'
  on-secondary-fixed-variant: '#3e4660'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.005em
  stat-counter:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-ui:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system targets enterprise logistics operators, station networks, procurement heads, and fleet directors managing mission-critical fuel assets. The identity merges high-throughput industrial infrastructure with the precision, responsiveness, and clarity of modern Tier-1 SaaS engineering.

The visual style blends **Corporate Modern** with **Technical Precision**:
- High-contrast structured planes built on crisp, surgical layouts.
- Low-contrast architectural grid guides and datum lines (`border-slate-200/60` or `border-slate-800/40`) that emphasize engineering rigor and hardware-software synergy.
- Vibrant fuel-grade cerulean accents against deep carbon slate and luminous neutral fields.
- Trust cues: high-density performance stats, regulatory verification badges (eTIMS integration), hardware status indicators, and clean telemetry graphs.

## Colors

The palette establishes an immediate dichotomy between industrial strength and digital speed:

- **Primary (`#00A3E0`)**: Vibrant Cerulean / Fuel Cyan. Used for active telemetry states, primary action nodes, interactive hovers, and high-priority directional indicators.
- **Secondary (`#0B132B`)**: Deep Carbon Navy. Delivers enterprise authority across hero containers, top-tier callouts, technical banners, and data dense footer structures.
- **Tertiary (`#0EA5E9`)**: High-luminance Sky Cyan. Utilized for interactive gradients, badge glows, chart data lines, and focused states.
- **Neutral (`#0F172A`)**: Carbon Slate. Governs primary typographic hierarchies, technical mono accents, and foundational UI borders.

### Surface Tiers & Support Accents
- **Canvas Base**: Pure `#FFFFFF` in standard views, with `#F8FAFC` (Slate 50) alternating section blocks to prevent eye fatigue.
- **Border Grids**: `#E2E8F0` on light canvases; `#1E293B` on dark enterprise modules.
- **Status Accents**:
  - Compliance / Verified: `#10B981` (Emerald).
  - Telemetry Alert / Flow Rate Warning: `#F59E0B` (Amber).
  - System Critical: `#EF4444` (Crimson).

## Typography

The typographic hierarchy establishes clear informational authority across fast-scanning landing sections:

- **Headlines (`Plus Jakarta Sans`)**: Sharp, geometric, high-impact forms tailored for commanding headlines, value propositions, and numerical KPI outputs.
- **Body (`Inter`)**: Systematic, neutral, highly legible sans-serif optimized for enterprise technical specifications, feature narratives, and micro-copy.
- **Data & Telemetry (`JetBrains Mono`)**: Strict, technical monospace for sensor reads, audit logs, eTIMS transaction IDs, timestamps, and compliance status tags.

## Layout & Spacing

The layout model is anchored to a structured 12-column grid with a maximum content container width of `1280px`.

- **Technical Sub-Grid**: Section backgrounds leverage subtle vertical datum lines (`1px` width with `20%` opacity) intersecting at regular column bounds to evoke blueprint and industrial instrumentation aesthetics.
- **Breakpoints**:
  - `Mobile` (< 768px): 4 columns, single-column reflow for interactive dashboards, stacked metrics, collapsed navigation bar.
  - `Tablet` (768px - 1024px): 8 columns, 2-column card layouts, condensed telemetry graphs.
  - `Desktop` (> 1024px): 12 columns, asymmetric layouts (e.g., 5-col narrative paired with 7-col interactive mockups).
- **Rhythm**: Macro section padding uses `space-3xl` for high-impact visual separation, while card internals maintain strict `space-lg` to preserve data density without visual clutter.

## Elevation & Depth

Visual hierarchy rejects exaggerated, cloudy drop shadows in favor of precise, architectural layers:

- **Crisp Structural Borders**: Surfaces primarily rely on `1px` borders using `#E2E8F0` (light context) or `#1E293B` (deep slate context).
- **Surface Layering**:
  - `Surface 0`: Canvas background (`#FFFFFF` or `#0B132B`).
  - `Surface 1`: Elevated card containers (`#FFFFFF` on light, `#131F42` on dark navy).
  - `Surface 2`: Inset telemetry tables and nested inputs (`#F8FAFC` on light, `#080D1D` on dark).
- **Engineering Shadows**:
  - Resting Card: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`
  - Elevated / Hover: `0 10px 25px -5px rgba(11, 19, 43, 0.08), 0 8px 10px -6px rgba(11, 19, 43, 0.04)`
  - Cyan Glow (Focus/Active Hardware Nodes): `0 0 0 1px #00A3E0, 0 4px 16px -2px rgba(0, 163, 224, 0.25)`

## Shapes

The design system employs a **Soft (Level 1)** geometric standard. Industrial hardware and enterprise terminal aesthetics require precise, controlled contours rather than playful or overly rounded forms.

- Standard interactive components (buttons, input bars, cards, alert strips) use `rounded` (0.25rem / 4px) to `rounded-md` (0.375rem / 6px).
- Large dashboard containers and hero cards use `rounded-lg` (0.5rem / 8px).
- Circular or pill profiles (`rounded-full`) are strictly restricted to system-status indicator dots and compact regulatory compliance micro-badges.

## Components

### Buttons
- **Primary Action**: Solid `#00A3E0` background with pure white text, font weight 600, `rounded-md`, 12px vertical by 24px horizontal padding. Hover shifts to `#0284C7` with a subtle technical cyan outer glow.
- **Enterprise Secondary**: Solid `#0B132B` navy background with white text for dark actions, or crisp `#FFFFFF` with `#E2E8F0` border and `#0F172A` text on light canvases.
- **Ghost/Tertiary**: No background, `#0F172A` text, hover reveals `#F1F5F9` backdrop with an inline chevron indicator transition.

### Regulatory & eTIMS Badges
- **Compliance Tag**: Inline component utilizing `JetBrains Mono`. Features a green pulse indicator (`#10B981`), `0.25rem` radius, 4px vertical / 8px horizontal padding, `#ECFDF5` background with `#A7F3D0` border. Text reads: `[ETIMS VERIFIED: ACTIVE]`.
- **System Spec Badge**: Monospace text in slate navy, `#F1F5F9` background, `#CBD5E1` border for tracking telemetry versions and pump controller API protocols.

### Stat Counters & Metric Displays
- Built for fast numerical absorption. Large `stat-counter` metric stacked above a `label-ui` uppercase caption in `#64748B`.
- Integrated delta tags (e.g., `+99.98% Accuracy`) placed inline using micro-pill indicators with contextual green/cyan background fills.

### Cards & Container Panels
- **Telemetry Card**: Pure white fill, `1px solid #E2E8F0`, `rounded-md`, `space-lg` internal padding. Features a subtle top-border accent option (`2px solid #00A3E0`) on featured offerings.
- **Dark Industrial Module**: Canvas in `#0B132B`, interior card in `#111C3D`, bordered by `#1E293B`, housing high-contrast charts, sensor inputs, and integration terminal snippets.

### Input Fields & Controls
- **Inputs**: 40px height, `1px solid #CBD5E1`, `rounded-md`, background `#FFFFFF`. Focus triggers `border-[#00A3E0]` accompanied by `ring-2 ring-[#00A3E0]/20`.
- **Checkboxes & Radios**: Angular `4px` or circular bounds with `#CBD5E1` border. Active state fills with `#00A3E0` housing a high-contrast white check glyph.

### Hardware & Fleet Status Indicators
- Live ping dot: A `8px` circle with a surrounding animated ring ping (`animate-ping`) displaying real-time dispenser uptime, tank level thresholds, and automated sync telemetry.