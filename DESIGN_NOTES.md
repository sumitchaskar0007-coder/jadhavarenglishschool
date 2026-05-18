# Design Notes - Jadhavar English Medium School & Jr. College Website

## Color Palette

### Primary Colors
- **Primary Blue**: `#003366` (RGB: 0, 51, 102)
  - Used for: Headers, primary buttons, links, section backgrounds
  - Dark variant: `#002244` (for hover states)
  - Light variant: `#004488` (for subtle backgrounds)

### Secondary Colors
- **Gold/Secondary**: `#FFD700` (RGB: 255, 215, 0)
  - Used for: Accents, highlights, call-to-action elements
  - Dark variant: `#CCAA00` (for hover states)
  - Light variant: `#FFE44D` (for subtle highlights)

### Accent Colors
- **Accent Blue**: `#1E3A5F` (RGB: 30, 58, 95)
  - Used for: Secondary backgrounds, card borders
  - Light variant: `#2E4A6F` (for hover states)

### Neutral Colors
- **White**: `#FFFFFF` - Background, text on dark
- **Gray-50**: `#F9FAFB` - Light backgrounds
- **Gray-200**: `#E5E7EB` - Borders, dividers
- **Gray-600**: `#4B5563` - Secondary text
- **Gray-800**: `#1F2937` - Primary text

## Typography

### Font Families
- **Headings**: Merriweather (Serif)
  - Weights: 300 (Light), 400 (Regular), 700 (Bold), 900 (Black)
  - Usage: All h1-h6 elements, section titles, card titles

- **Body Text**: Open Sans (Sans-serif)
  - Weights: 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold)
  - Usage: Paragraphs, buttons, navigation, body content

### Font Sizes
- **Hero Title**: 4xl (2.25rem) on mobile, 6xl (3.75rem) on desktop
- **Section Titles**: 3xl (1.875rem) on mobile, 5xl (3rem) on desktop
- **Card Titles**: xl (1.25rem)
- **Body Text**: base (1rem), lg (1.125rem) for emphasis
- **Small Text**: sm (0.875rem) for captions, dates

### Line Heights
- **Headings**: 1.2 (tight)
- **Body**: 1.5 (relaxed)
- **Paragraphs**: 1.75 (very relaxed for readability)

## Spacing System

### Section Padding
- **Vertical**: `py-16` (4rem / 64px)
- **Horizontal**: 
  - Mobile: `px-4` (1rem / 16px)
  - Tablet: `px-8` (2rem / 32px)
  - Desktop: `px-16` (4rem / 64px)

### Component Spacing
- **Card Gap**: `gap-6` (1.5rem / 24px)
- **Grid Gap**: `gap-6` to `gap-8` (1.5rem to 2rem)
- **Element Spacing**: `space-y-4` to `space-y-8` (1rem to 2rem)

### Container Max Width
- **Content Container**: `max-w-7xl` (80rem / 1280px)
- **Text Container**: `max-w-4xl` (56rem / 896px) for readable paragraphs

## Component Styles

### Buttons
- **Primary Button**:
  - Background: Primary blue (`#003366`)
  - Text: White
  - Padding: `px-6 py-3`
  - Border Radius: `rounded-lg`
  - Hover: Darker blue background, shadow increase
  - Transition: `duration-300`

- **Secondary Button**:
  - Background: Gold (`#FFD700`)
  - Text: Primary blue
  - Same padding and styling as primary
  - Hover: Darker gold background

### Cards
- **Background**: White
- **Shadow**: `shadow-md` (default), `shadow-xl` (hover)
- **Border Radius**: `rounded-lg`
- **Padding**: `p-6` to `p-8`
- **Hover Effect**: Lift up (`y: -5px`), shadow increase

### Navigation
- **Header Height**: `h-20` (5rem / 80px)
- **Link Spacing**: `space-x-4` (1rem)
- **Active State**: Secondary color (gold)
- **Hover State**: Secondary color transition

## Animation Guidelines

### Framer Motion Settings
- **Duration**: 0.5s to 0.8s for most animations
- **Easing**: Default (ease-in-out)
- **Stagger Delay**: 0.1s between items in lists/grids

### Animation Types
1. **Fade In**: `opacity: 0 → 1`, `y: 20 → 0`
2. **Slide In**: `x: -20 → 0` or `x: 20 → 0`
3. **Scale**: `scale: 0.9 → 1`
4. **Hover**: `scale: 1 → 1.05`, `y: 0 → -5`

### Scroll Animations
- **Trigger**: `whileInView` with `viewport={{ once: true }}`
- **Initial State**: Hidden (opacity 0, slight offset)
- **Animate State**: Visible (opacity 1, original position)

## Responsive Breakpoints

### Tailwind Defaults
- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (extra large desktops)

### Usage Strategy
- **Mobile First**: Base styles for mobile, then add `md:`, `lg:` prefixes
- **Grid Columns**: 
  - Mobile: 1 column
  - Tablet: 2 columns (`md:grid-cols-2`)
  - Desktop: 3-4 columns (`lg:grid-cols-3` or `lg:grid-cols-4`)

## Image Guidelines

### Aspect Ratios
- **Hero Banner**: 16:9 or 21:9
- **Gallery Images**: 4:3 or 16:9
- **Card Images**: 16:9
- **Profile Images**: 1:1 (square)

### Image Optimization
- **Format**: WebP preferred, fallback to JPG/PNG
- **Lazy Loading**: Use `loading="lazy"` attribute
- **Alt Text**: Always provide descriptive alt text

## Accessibility

### Color Contrast
- **Text on Primary**: White on `#003366` - WCAG AAA compliant
- **Text on White**: Primary blue or gray-800 - WCAG AA compliant
- **Links**: Primary blue with gold hover - sufficient contrast

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic tags (`<nav>`, `<main>`, `<section>`, `<article>`)
- Include ARIA labels where needed

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus states visible (ring-2 ring-primary)

## Design Principles

1. **Clarity**: Clean, uncluttered layouts
2. **Consistency**: Uniform spacing, typography, and colors
3. **Hierarchy**: Clear visual hierarchy with size, color, and spacing
4. **Professionalism**: Academic, trustworthy appearance
5. **Accessibility**: Usable by all users, including those with disabilities
6. **Performance**: Fast loading, optimized assets

## Inspiration

Design inspired by SPM Public School website:
- Professional academic color scheme
- Clean, modern layout
- Easy navigation
- Clear information hierarchy
- Trustworthy and institutional feel

