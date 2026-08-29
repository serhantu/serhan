---
name: Corporate Precision
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9da'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e5e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45474c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f3f0f1'
  outline: '#76777d'
  outline-variant: '#c6c6cc'
  surface-tint: '#585e6f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#151b2a'
  on-primary-container: '#7d8496'
  inverse-primary: '#c0c6da'
  secondary: '#455f86'
  on-secondary: '#ffffff'
  secondary-container: '#b8d3ff'
  on-secondary-container: '#405b81'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#281809'
  on-tertiary-container: '#997f6a'
  error: '#EF4444'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f6'
  primary-fixed-dim: '#c0c6da'
  on-primary-fixed: '#151b2a'
  on-primary-fixed-variant: '#404757'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#adc8f4'
  on-secondary-fixed: '#001c3a'
  on-secondary-fixed-variant: '#2d486c'
  tertiary-fixed: '#fddcc4'
  tertiary-fixed-dim: '#e0c1a9'
  on-tertiary-fixed: '#281809'
  on-tertiary-fixed-variant: '#584231'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e5e2e3'
  accent: '#0EA5E9'
  accent-soft: '#E0F2FE'
  surface-1: '#FFFFFF'
  surface-2: '#F8FAFC'
  surface-3: '#F1F5F9'
  border: '#E2E8F0'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  success: '#16A34A'
  warning: '#F59E0B'
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-h1:
    fontFamily: Bricolage Grotesque
    fontSize: 44px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h1-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-h2:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
  label-caption:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 0.25rem
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  container-max: 1280px
---

## Brand & Style
The design system is defined by a **Corporate Modern** aesthetic that emphasizes institutional trust, precision, and high-end service. It leverages a **Minimalist** framework where whitespace is used as a functional tool to organize complex information, ensuring the interface feels breathable yet authoritative.

The visual narrative is driven by a "Deep Horizon" motif—using heavy navy tones to anchor the experience, while bright azure accents provide clear paths for interaction. The emotional response should be one of complete reliability and "effortless premium," catering to professional clients who value efficiency and clarity.

- **Style:** Minimalism with Corporate/Modern influences.
- **Visual Strategy:** Crisp borders, high-contrast typography, and a strategic use of soft blue washes to denote interactive zones.
- **Tone:** Professional, direct, and sophisticated.

## Colors
The palette shifts from deep, authoritative architectural tones to functional, airy neutrals. 

- **Core Tones:** The **Primary (#0B1220)** is reserved for global headers and primary actions. **Secondary (#1F3B5F)** is used for structural depth.
- **Accent Layer:** The **Accent (#0EA5E9)** color serves as the high-visibility driver for interactive focus, while **Accent Soft (#E0F2FE)** provides a gentle background tint for selection states.
- **Surface Strategy:** This design system uses a tiered surface model. **Surface 1** is the base canvas, while **Surface 2** and **3** provide subtle contrast for sidebars, metadata backgrounds, and nested components.
- **Typography:** Text uses **Text Primary (#0F172A)** for high-contrast legibility without a tint/shade ramp. **Text Secondary (#475569)** is used for descriptive or auxiliary information.

## Typography
The typography uses a pairing of a characterful display face and a high-performance utility face. 

**Bricolage Grotesque** is used for all headlines. Its unique geometric structures provide the brand's primary visual identity. Use tight letter-spacing for larger sizes to maintain a compact, editorial look.

**Noto Sans** handles all body copy, labels, and data. It is chosen for its neutrality and its ability to maintain legibility in dense UI environments. 

- **Hierarchy:** Use `display` for hero sections and `headline-h1` for primary page titles. 
- **Emphasis:** Bold (700) is reserved for headlines. Semi-bold (600) is used for labels to differentiate them from body text.
- **Scaling:** For mobile devices, downscale `headline-h1` to the mobile variant to prevent layout breaking.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a consistent 8px (0.5rem) base rhythm for layout and 4px (0.25rem) for micro-spacing within components.

- **Grid Model:** 12-columns for desktop (max 1280px), 8-columns for tablet, and 4-columns for mobile devices.
- **Reflow:** On mobile, complex grids reflow into a single column. Containers should use the `margin-mobile` spacing to maintain consistent safe areas.
- **Alignment:** Content is centered in a container with a max-width of 1280px, while background surfaces like `Surface 2` often extend full-bleed to create visual rhythm.

## Elevation & Depth
Depth is primarily established through **Tonal Layers** and **Low-contrast outlines**. This avoids the "heavy" look of traditional shadows, maintaining a modern and clean aesthetic.

- **Stacking:** Use `Surface 1` as the base canvas. `Surface 2` and `Surface 3` are used to "lift" content areas like sidebars or secondary content blocks.
- **Borders:** A 1px border in `Border` (#E2E8F0) is the default method for defining edges for cards and form fields.
- **Shadows:** Reserved strictly for temporary or overlay elements (Dropdowns, Modals). Use a highly diffused, low-opacity shadow tinted with the Primary color: `0 10px 25px -5px rgba(11, 18, 32, 0.08)`.

## Shapes
The shape language combines soft precision with organic action elements to guide user behavior.

- **Containers:** Cards and primary structural modules use **Rounded (0.5rem)** corners.
- **Inputs:** Form fields use a standard **Rounded (0.5rem)** radius to imply functional accuracy.
- **Interactive:** Buttons and Chips utilize **Pill-shaped (9999px)** rounding. This distinctive shape acts as a universal signifier for "clickable" items, distinguishing them from static containers.

## Components

### Buttons
- **Primary:** Pill-shaped, Primary Navy background, Surface 1 text. 
- **Secondary:** Pill-shaped, Secondary Navy background, Surface 1 text.
- **Outline:** Pill-shaped, Transparent background, 1px Primary Navy border, Primary Navy text.
- **Ghost:** Pill-shaped, Transparent background, Primary Navy text, no border. Subtle Surface 2 background on hover.

### Chips
- **Design:** Always Pill-shaped.
- **Style:** Background is `Accent Soft` (#E0F2FE) with text in `Primary Navy` (#0B1220). Primarily used for status indicators.

### Text Inputs
- **Layout:** Labels are placed directly above the input field using `label-md` in `Text Primary`.
- **Field:** `Surface 1` background, 1px `Border` (#E2E8F0).
- **Focus State:** Border transitions to `Accent` (#0EA5E9) with a 2px outer glow (ring) of the same color at 20% opacity.

### Dropdown / Select
- **Style:** Follows Text Input styling for the trigger.
- **Menu:** Appears as a `Surface 1` card with the standard elevation shadow. Options use `body-sm` and highlight with `Surface 2` on hover.

### Cards
- **Structure:** `Surface 1` background with a 1px `Border` (#E2E8F0). 
- **Interaction:** On hover, cards may transition to a subtle elevation shadow to indicate interactivity.