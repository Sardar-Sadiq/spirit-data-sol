---
name: Spirit Data Solutions
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadc'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#414752'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#727784'
  outline-variant: '#c1c6d5'
  surface-tint: '#005db8'
  primary: '#0056ac'
  on-primary: '#ffffff'
  primary-container: '#1f6fd1'
  on-primary-container: '#f3f5ff'
  inverse-primary: '#aac7ff'
  secondary: '#425f8f'
  on-secondary: '#ffffff'
  secondary-container: '#abc7fe'
  on-secondary-container: '#355382'
  tertiary: '#005c90'
  on-tertiary: '#ffffff'
  tertiary-container: '#0076b6'
  on-tertiary-container: '#f1f6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458d'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#abc7fe'
  on-secondary-fixed: '#001b3e'
  on-secondary-fixed-variant: '#294776'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#96ccff'
  on-tertiary-fixed: '#001d32'
  on-tertiary-fixed-variant: '#004a75'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-tablet: 32px
  margin-mobile: 20px
---

## Brand & Style
The design system is built upon the concept of **Precision Minimalist Luxury**. It targets enterprise-level stakeholders who value clarity, data integrity, and a frictionless user experience. The aesthetic is inspired by high-end European design houses and modern technical powerhouses like Stripe and Linear.

The UI should evoke an emotional response of absolute reliability and forward-thinking sophistication. This is achieved through a **Corporate / Modern** style blended with **Minimalism**, characterized by generous whitespace, subtle geometric gradients, and a highly refined typographic hierarchy. The visual narrative avoids clutter in favor of focus, ensuring that data is the protagonist while the interface serves as a premium stage.

## Colors
The palette is centered on a "High-Trust Blue" spectrum. The **Primary Blue** (#1F6FD1) serves as the main interactive signal, while **Deep Blue** (#0A2E5C) provides grounding for structural elements and high-contrast typography. **Accent Sky Blue** (#58B5FF) is reserved for highlighting growth or secondary technical indicators.

Surface colors are strictly curated to maintain the "expensive" feel:
- **Background:** A very light, cool-toned gray (#F7FAFC) to differentiate from card surfaces.
- **Surface:** Pure white (#FFFFFF) for primary content containers to create a "floating" effect.
- **Gradients:** Use subtle linear gradients moving from Primary Blue to Accent Sky Blue for high-impact calls to action or background accents.

## Typography
This design system utilizes **Inter** exclusively to achieve a systematic, utilitarian, and modern corporate feel. The typographic scale is designed for high-contrast storytelling:

- **Display & Headings:** Use heavy weights (600-700) with tight letter spacing for a "Swiss-style" impactful look. 
- **Body Text:** Kept minimal and airy with generous line heights to ensure readability.
- **Labels:** Monospaced-adjacent feel by using Inter's medium and semi-bold weights for data points and metadata.
- **Hierarchy:** Rely on size and weight differentiation rather than color to maintain a clean, high-end aesthetic.

## Layout & Spacing
The layout philosophy is based on a **Fixed Grid** model for content containers, nested within a fluid viewport. 

- **Grid:** A 12-column system with 24px gutters.
- **Rhythm:** An 8px base unit drives all spacing decisions. Large sections should be separated by 80px or 120px to emphasize the spacious, premium feel.
- **Margins:** Desktop views should feature wide horizontal margins (64px) to center the focus and create a "boutique" software feel.
- **Reflow:** On mobile, margins tighten to 20px, and column spans generally collapse to single-column blocks with increased vertical padding (32px - 48px).

## Elevation & Depth
Depth in this design system is conveyed through **Ambient Shadows** and **Glassmorphism**. 

- **Surface Tiers:** Background (#F7FAFC) is the lowest level. White cards (#FFFFFF) sit on top with a "Level 1" shadow.
- **Level 1 Shadow:** 0px 1px 3px rgba(0,0,0,0.05), 0px 1px 2px rgba(0,0,0,0.02). Very subtle, used for small cards.
- **Level 2 Shadow:** 0px 10px 15px -3px rgba(15, 23, 42, 0.08). Used for hover states and modal dialogs.
- **Glassmorphism:** The top navigation bar must use a 12px backdrop blur with a semi-transparent white fill (rgba(255, 255, 255, 0.7)) and a 1px bottom border (#E2E8F0).
- **Outlines:** All cards and interactive elements should have a thin 1px border (#E2E8F0) to maintain crisp edges even on white backgrounds.

## Shapes
The shape language is consistently **Rounded** (Level 2). This provides a modern, approachable feel while remaining professional enough for enterprise data.

- **Standard Elements:** 0.5rem (8px) for buttons, input fields, and small cards.
- **Large Containers:** 1rem (16px) for main dashboard sections or feature cards.
- **Pill-style:** Used exclusively for status chips (e.g., "Active," "Pending") to differentiate them from functional buttons.

## Components
- **Buttons:** Primary buttons use a subtle gradient from `#1F6FD1` to `#0A2E5C` (top to bottom) with white text. Secondary buttons are white with a 1px `#E2E8F0` border and `#0A2E5C` text.
- **Cards:** White background, 1px border, Level 1 shadow. On hover, cards should transition smoothly to a Level 2 shadow with a 2px vertical lift.
- **Input Fields:** 1px border, 8px radius. On focus, the border changes to Primary Blue with a 3px soft outer glow (Primary Blue at 10% opacity).
- **Navbar:** Sticky, glassmorphic (blur: 12px, background: white at 70%). Links use `label-md` typography.
- **Chips:** Small, pill-shaped with low-opacity background colors matching their status (e.g., Sky Blue at 10% for "Info").
- **Visuals:** Use abstract geometric gradients (Deep Blue to Primary Blue) as background textures for hero sections. Photography should feature high-end, bright office environments with a cool-toned color grade.