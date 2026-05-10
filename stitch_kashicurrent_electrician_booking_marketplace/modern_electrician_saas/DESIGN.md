---
name: Modern Electrician SaaS
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#434655'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built on a "Premium Utility" narrative, merging the precision of high-end developer tools with the approachability of hospitality platforms. The goal is to instill immediate trust in the user—positioning electrical service not as a messy chore, but as a seamless, high-tech upgrade to their environment.

The style is primarily **Minimalist** with heavy influences of **Glassmorphism**. It utilizes expansive white space and a rigorous alignment to a geometric grid to evoke a sense of professional organization. To differentiate from standard corporate SaaS, the design incorporates translucent layers and soft background blurs on high-interaction components (modals and navbars), creating a sense of physical depth and modern sophistication. The emotional response should be one of "Reliable Innovation."

## Colors

The palette is anchored by "Electric Blue" (#2563EB), representing energy and professional stability. This color is used for primary actions, active states, and brand-critical iconography. "Slate Gray" (#1E293B) provides high-contrast legibility for text, ensuring the platform feels authoritative and grounded.

Accent colors are used sparingly for functional signaling: "Safety Orange/Yellow" (#F59E0B) is reserved for ratings, urgent status alerts, and highlighting electrical safety certifications. Neutral scales rely on cool grays to maintain the "SaaS" cleanliness. In Dark Mode, the primary white background shifts to a deep charcoal (#0F172A), while maintaining the vibrant primary blue to ensure the "Electric" brand identity remains luminous.

## Typography

This design system employs a dual-font strategy to balance technical precision with human warmth. **Geist** is used for headlines, labels, and UI data points; its monolinear, slightly condensed structure communicates the technical nature of electrical work. **Manrope** is used for body copy and descriptions; its wider apertures and humanist proportions provide the readability and friendliness expected from a service booking platform.

For mobile layouts, headline sizes scale down aggressively to ensure no text wraps awkwardly, preserving the clean horizontal lines of the layout. All labels use a slight letter-spacing increase to improve scanability on smaller screens.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to ensure a premium, centered viewing experience similar to Airbnb, with a 12-column structure. For mobile, the system transitions to a fluid single-column layout with generous 16px side margins.

A strict 4px baseline grid governs all spacing. Components like cards and sections use "Stack" units (16px, 32px, 64px) to maintain a rhythmic vertical flow. Large-scale whitespace (64px+) is encouraged between major sections to prevent the interface from feeling cluttered or "cheap."

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Glassmorphism** and **Ambient Shadows**. 

1.  **Level 0 (Base):** Flat white background.
2.  **Level 1 (Cards):** Soft, diffused shadows (0px 4px 20px rgba(0, 0, 0, 0.05)) distinguish service cards and booking summaries.
3.  **Level 2 (Glass Layers):** Navbars and floating action buttons use a 12px backdrop-blur with a 70% opaque white fill and a subtle 1px inner border (rgba(255, 255, 255, 0.2)).
4.  **Level 3 (Modals):** High-impact elevation with darker backdrop overlays and more pronounced shadows to focus user attention on the booking flow.

## Shapes

The shape language is consistently **Rounded**, using a base radius of 8px (0.5rem) for smaller elements like inputs and buttons. Large layout containers and data cards utilize a 16px+ (1rem or 1.5rem) radius to create a soft, approachable "app-like" feel that contrasts against the sharp, technical typography. Interactive components like search bars and status badges may use pill-shaped (full-round) geometry to signify their status as high-priority touchpoints.

## Components

**Buttons:** Primary buttons feature a solid Electric Blue fill with white Geist typography. Secondary buttons use a subtle gray ghost-style with a 1px border. All buttons have a transition effect that slightly deepens the shadow on hover to simulate physical pressing.

**Inputs:** Sleek, minimalist fields with 1px Slate Gray borders that transition to a 2px Electric Blue border on focus. Icons (e.g., search, location) are rendered in a medium-weight line style.

**Status Badges:** Used for "Verified," "Available," or "Emergency" statuses. These utilize soft backgrounds (e.g., 10% opacity of the status color) with high-saturation text to maintain a premium, non-aggressive look.

**Data Cards:** Elegant cards for electrician profiles. These feature a 16px corner radius, a soft shadow, and a clear "Glass" header area for the professional's photo and rating. Information is organized in a clean, vertical stack using Manrope for bios and Geist for technical specs (e.g., hourly rates, distance).

**Booking Timeline:** A bespoke component showing the steps of a service call, utilizing a thin vertical line and circular nodes to indicate progress, keeping the user informed at every stage of the booking.