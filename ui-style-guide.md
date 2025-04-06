# UI Style Guide for Jewelry Resale Platform

## Brand Identity

**Name:** [To be determined or suggested based on style]

**Mission:** Make one-of-a-kind vintage and costume jewelry accessible through a beautifully curated and intelligent online experience.

**Audience:** Style-savvy buyers looking for rare, affordable, or vintage jewelry online — aged 22–60, primarily women, interested in sustainability, uniqueness, and fashion.

## Design Goals

- Modern, minimalist, editorial-style design
- Feels luxurious, clean, and refined
- Balances the charm of vintage with the ease of modern e-commerce
- Looks credible enough to host high-end finds, yet accessible for everyday costume pieces
- Feels like browsing a curated boutique

## Color Palette

- **Background:** Cream / Soft Ivory → #F8F5F0
- **Accent Gold:** Elegant muted gold for highlights → #D4AF37
- **Primary Text:** Deep neutral gray → #2E2E2E
- **Accent/Bold Color:** Rich burgundy or wine → #800020
- **Secondary Backgrounds:** Whisper gray → #EDEDED
- **Error/Alert:** Rose or faded coral

## Typography

- **Headlines:** Playfair Display – gives an editorial, high-fashion vibe
- **Body Text:** Lato or Inter – modern, clean, readable on mobile
- **Font weights:** Use contrast between light and bold for drama
- **Line spacing:** Generous white space to create a breathable experience

## UI Components

### Product Cards

- **Hover effects:** Soft shadow + zoom-in image

### Image Upload Drag-and-Drop

- **Design:** Large, border dashed gold + thumbnail preview

### Product Detail View

- **Features:** Carousel gallery, price, description, AI-suggested tags

### Filtering System

- **Options:** Category, era, material, price range

### Minimalist Header/Footer

- **Design:** Clean and simple, reflecting the brand's luxury and minimalism

### Auth Modal

- **Integration:** Sign in / Sign up with Supabase

## Animations

- **Page Load:** Smooth fade-in and scroll reveal
- **Hover Interactions:** Soft lift and glow on buttons
- **Transitions:** Glide between pages with micro-interactions
- **Upload Flow:** Progress animations (e.g., subtle shimmer on image analysis)

## Layout System

- **Grid:** 12-column responsive grid for desktop, collapses cleanly to 2-column on mobile
- **Spacing:** Ample padding between sections (min p-6, section gaps mt-12)
- **Cards:** Rounded 2xl, drop shadow md, border #E6E6E6 with gold hover border
- **Forms:** Clean form inputs with focus rings in gold

## Inspiration References

- **1stDibs:** For luxury design tone
- **The RealReal:** For minimalism and credibility
- **Vestiaire Collective:** For filter usability
- **Pinterest boards:** "Minimalist Jewelry UI", "Luxury Resale Design", "Soft Editorial UX"

## Implementation

The UI components and layout system are implemented using the following files:

- **tailwind.config.js:** Custom theme settings for colors, fonts, border radius, shadows, and animations.
- **branding-tokens.json:** Branding tokens for consistent design across the platform.
- **components.js:** Reusable UI components.
- **landing-page.js:** Sample landing page layout with hero section, how-it-works, testimonials, and featured listings.

This style guide ensures a cohesive and high-end user experience that aligns with the platform's mission and audience preferences.
