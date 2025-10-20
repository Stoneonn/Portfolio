# Motion Primitives UI Kit Guide for AI Agents

## Overview

This project uses **Motion Primitives** - a comprehensive UI animation library built on `motion/react` (Framer Motion) and Tailwind CSS. The library is available locally at `motion-primitives-main/` and provides 30+ pre-built animated components.

**Important**: Motion Primitives components are stored in `motion-primitives-main/components/core/` and should be **copied** to your project's `components/ui/` directory when needed, NOT imported directly from the motion-primitives-main folder.

## Installation & Setup

### Using the CLI (Recommended)

```bash
# List all available components
npx motion-primitives list

# Add a specific component to your project
npx motion-primitives add <component-name>

# Examples:
npx motion-primitives add text-morph
npx motion-primitives add spotlight
npx motion-primitives add magnetic
```

The CLI automatically:

- Creates `components/ui/` directory structure
- Copies component files with proper imports
- Installs required dependencies (motion, etc.)

### Manual Installation

If adding components manually from `motion-primitives-main/components/core/`:

1. Copy the component file to `components/ui/`
2. Update import paths: `@/lib/utils` should point to your `lib/utils.ts`
3. Ensure dependencies are installed: `motion`, `tailwindcss`
4. All components require `'use client'` directive (already included)

## Available Components Library

### Core Animation Components

#### **AnimatedBackground** (`animated-background.tsx`)

Animated background that follows active elements with morphing transitions.

**Use Cases**: Tab navigation, segmented controls, option selectors

**Key Props**:

- `defaultValue?: string` - Initial active element ID
- `enableHover?: boolean` - Trigger on hover vs click
- `transition?: Transition` - Custom motion transition
- `className?: string` - Background styling

**Usage Pattern**:

```tsx
<AnimatedBackground enableHover className="bg-zinc-100">
  {items.map((item) => (
    <div key={item.id} data-id={item.id}>
      {item.content}
    </div>
  ))}
</AnimatedBackground>
```

**Example from codebase**: See `app/page.tsx` Blog section

---

#### **Magnetic** (`magnetic.tsx`)

Elements that magnetically follow cursor movement with spring physics.

**Use Cases**: Buttons, social links, interactive CTAs

**Key Props**:

- `intensity?: number` - Attraction strength (default: 0.6)
- `range?: number` - Activation distance in pixels (default: 100)
- `actionArea?: 'self' | 'parent' | 'global'` - Tracking scope
- `springOptions?: SpringOptions` - Custom spring physics

**Usage Pattern**:

```tsx
<Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
  <button>Hover me</button>
</Magnetic>
```

**Example from codebase**: See `MagneticSocialLink` in `app/page.tsx`

---

#### **MorphingDialog** (`morphing-dialog.tsx`)

Modal dialog with smooth morphing animation from trigger element.

**Use Cases**: Image galleries, video players, detail views

**Key Components**:

- `MorphingDialog` - Container with transition config
- `MorphingDialogTrigger` - Element that opens dialog
- `MorphingDialogContent` - Dialog content area
- `MorphingDialogClose` - Close button
- `MorphingDialogContainer` - Portal container

**Usage Pattern**:

```tsx
<MorphingDialog transition={{ type: 'spring', bounce: 0, duration: 0.3 }}>
  <MorphingDialogTrigger>
    <img src={thumbnail} />
  </MorphingDialogTrigger>
  <MorphingDialogContainer>
    <MorphingDialogContent>
      <img src={fullSize} />
    </MorphingDialogContent>
    <MorphingDialogClose>
      <XIcon />
    </MorphingDialogClose>
  </MorphingDialogContainer>
</MorphingDialog>
```

**Examples from codebase**: `ProjectVideo` and `ProjectEmbed` in `app/page.tsx`

---

#### **Spotlight** (`spotlight.tsx`)

Gradient spotlight effect that follows cursor over elements.

**Use Cases**: Cards, feature highlights, hover effects

**Key Props**:

- `size?: number` - Spotlight diameter (default: 124)
- `className?: string` - Gradient styling (from/via/to colors)
- `springOptions?: SpringOptions` - Movement physics

**Usage Pattern**:

```tsx
<div className="relative">
  <Spotlight
    className="from-blue-900 via-blue-800 to-blue-700 blur-2xl"
    size={64}
  />
  <div className="relative">Content here</div>
</div>
```

**Example from codebase**: Education section in `app/page.tsx`

---

#### **TextEffect** (`text-effect.tsx`)

Animated text reveals with multiple presets and granular control.

**Use Cases**: Hero titles, headings, introductory text

**Key Props**:

- `preset?: 'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'`
- `per?: 'char' | 'word' | 'line'` - Animation granularity
- `delay?: number` - Initial delay in seconds
- `speedReveal?: number` - Overall animation speed
- `speedSegment?: number` - Per-segment delay
- `trigger?: boolean` - Control animation programmatically

**Usage Pattern**:

```tsx
<TextEffect preset="fade" per="char" delay={0.5} className="text-lg">
  Your animated text here
</TextEffect>
```

**Example from codebase**: Header subtitle in `app/header.tsx`

---

#### **TextMorph** (`text-morph.tsx`)

Smooth character-by-character text morphing animations.

**Use Cases**: Dynamic labels, state changes, counters

**Key Props**:

- `children: string` - Text content (changes trigger morph)
- `className?: string` - Text styling
- `as?: keyof JSX.IntrinsicElements` - HTML tag (default: 'p')

**Usage Pattern**:

```tsx
const [text, setText] = useState('Initial')
<TextMorph className="text-sm">{text}</TextMorph>
// Changing text triggers smooth morph animation
```

**Example from codebase**: Copy button in `app/blog/layout.tsx`

---

#### **TextLoop** (`text-loop.tsx`)

Continuously loops through array of text strings with transitions.

**Use Cases**: Rotating taglines, feature highlights, testimonials

**Key Props**:

- `children: string[]` - Array of strings to loop
- `interval?: number` - Milliseconds between changes (default: 2000)
- `transition?: Transition` - Motion transition config
- `className?: string` - Container styling
- `variants?: Variants` - Custom animation variants

**Usage Pattern**:

```tsx
<TextLoop interval={3000} className="text-2xl">
  {['Design', 'Develop', 'Deploy', 'Delight']}
</TextLoop>
```

---

#### **ScrollProgress** (`scroll-progress.tsx`)

Progress bar that fills based on page scroll position.

**Use Cases**: Blog posts, long-form content, reading indicators

**Key Props**:

- `className?: string` - Progress bar styling
- `springOptions?: SpringOptions` - Smooth scroll physics

**Usage Pattern**:

```tsx
<ScrollProgress
  className="fixed top-0 h-1 bg-blue-500"
  springOptions={{ bounce: 0 }}
/>
```

**Example from codebase**: Blog layout in `app/blog/layout.tsx`

---

### Advanced Components

#### **AnimatedGroup** (`animated-group.tsx`)

Staggered animations for groups of child elements.

**Presets**: 'fade', 'slide', 'scale', 'fade-blur', 'zoom', 'flip'

**Key Props**:

- `preset?: PresetType` - Animation style
- `variants?: { container, item }` - Custom variants
- `stagger?: number` - Delay between children
- `className?: string`

---

#### **Carousel** (`carousel.tsx`)

Full-featured carousel with navigation, indicators, and drag support.

**Components**:

- `Carousel` - Main container
- `CarouselContent` - Slides wrapper
- `CarouselItem` - Individual slide
- `CarouselNavigation` - Prev/next buttons
- `CarouselIndicator` - Dot indicators

---

#### **InView** (`in-view.tsx`)

Trigger animations when elements enter viewport.

**Use Cases**: Scroll-triggered reveals, lazy animations

---

#### **Dock** (`dock.tsx`)

macOS-style dock with magnification effect on hover.

**Use Cases**: Navigation bars, tool palettes

---

#### **BorderTrail** (`border-trail.tsx`)

Animated border that travels around element perimeter.

**Use Cases**: Attention-grabbing CTAs, premium features

---

#### **ProgressiveBlur** (`progressive-blur.tsx`)

Gradient blur effect that progressively blurs content.

**Use Cases**: Image overlays, content fades, focus effects

---

#### **GlowEffect** (`glow-effect.tsx`)

Animated glow/gradient effect following cursor.

**Use Cases**: Hero sections, interactive cards

---

### Text Animation Components

- **TextScramble** (`text-scramble.tsx`) - Matrix-style character scrambling
- **TextShimmer** (`text-shimmer.tsx`) - Shimmer wave effect across text
- **TextRoll** (`text-roll.tsx`) - Rolling counter animation
- **SpinningText** (`spinning-text.tsx`) - Circular rotating text
- **SlidingNumber** (`sliding-number.tsx`) - Smooth number transitions
- **AnimatedNumber** (`animated-number.tsx`) - Count-up animations

---

## Current Usage in Portfolio

### Active Components (in `components/ui/`)

1. **animated-background.tsx** - Blog post list hover
2. **magnetic.tsx** - Social link buttons
3. **morphing-dialog.tsx** - Project video/embed modals
4. **scroll-progress.tsx** - Blog reading progress
5. **spotlight.tsx** - Education card hover effect
6. **text-effect.tsx** - Header subtitle animation
7. **text-morph.tsx** - Copy button text change
8. **text-loop.tsx** - Available for use
9. **gallery-section.tsx** - Custom component (not from Motion Primitives)

### Common Patterns in Codebase

#### Consistent Animation Variants

```tsx
const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = { duration: 0.3 }
```

#### Page-Level Animation Orchestration

```tsx
<motion.main variants={VARIANTS_CONTAINER} initial="hidden" animate="visible">
  <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
    {/* Content */}
  </motion.section>
</motion.main>
```

## Best Practices for AI Agents

### 1. Component Selection

- **Choose based on use case**: Match component to specific interaction needs
- **Check dependencies**: Most require `motion/react` (already installed)
- **Verify compatibility**: All components work with React 19 + Next.js 15 App Router

### 2. Installation Steps

```bash
# Recommended: Use CLI
npx motion-primitives add <component-name>

# Manual: Copy from motion-primitives-main/components/core/
# to components/ui/ and update imports
```

### 3. Integration Checklist

- [ ] Component copied to `components/ui/`
- [ ] Import paths updated (`@/lib/utils` exists)
- [ ] Dependencies installed (`motion`, `tailwindcss`)
- [ ] Component added to imports in page/component
- [ ] Props configured correctly
- [ ] Dark mode classes added if applicable (`dark:*`)

### 4. Styling Conventions

- Use `cn()` utility for className merging (from `lib/utils.ts`)
- Follow dark mode pattern: `bg-zinc-100 dark:bg-zinc-900`
- Maintain consistent spacing: `gap-4`, `space-y-2`, etc.
- Keep rounded corners: `rounded-xl`, `rounded-2xl`, `rounded-full`

### 5. Animation Guidelines

- **Performance**: Prefer `transform` and `opacity` for smooth 60fps animations
- **Duration**: Keep under 0.5s for micro-interactions, 0.3s standard
- **Easing**: Use spring physics for natural feel: `{ type: 'spring', bounce: 0 }`
- **Stagger**: 0.05-0.15s delay between child elements
- **Accessibility**: Respect `prefers-reduced-motion` (handled by motion/react)

### 6. Common Pitfalls

- ❌ Don't import from `motion-primitives-main/` directly
- ❌ Don't forget `'use client'` directive for client components
- ❌ Don't mix animation libraries (stick with motion/react)
- ❌ Don't animate height/width directly (use scale/transform)
- ✅ Do copy components to `components/ui/`
- ✅ Do use springOptions for customization
- ✅ Do test animations on slower devices
- ✅ Do maintain consistent variant patterns

## Component Decision Tree

**Need text animation?**

- Fade/blur in → `TextEffect` with presets
- Change text smoothly → `TextMorph`
- Rotate multiple strings → `TextLoop`
- Scramble/reveal → `TextScramble`
- Number counting → `AnimatedNumber` or `SlidingNumber`

**Need interactive hover?**

- Element follows cursor → `Magnetic`
- Glow follows cursor → `Spotlight` or `GlowEffect`
- Tilt on hover → `Tilt`

**Need modal/dialog?**

- Smooth morphing transition → `MorphingDialog`
- Standard dialog → `Dialog` (simpler)
- Popover variant → `MorphingPopover`

**Need background effect?**

- Active tab indicator → `AnimatedBackground`
- Border animation → `BorderTrail`
- Blur overlay → `ProgressiveBlur`

**Need scroll-based?**

- Progress bar → `ScrollProgress`
- Trigger on enter viewport → `InView`

**Need group animation?**

- Stagger children → `AnimatedGroup`
- Image carousel → `Carousel`

## Example: Adding a New Component

```bash
# 1. Add component via CLI
npx motion-primitives add text-scramble

# 2. Import in your file
import { TextScramble } from '@/components/ui/text-scramble'

# 3. Use with proper props
<TextScramble
  text="Your text here"
  className="text-2xl font-bold"
  speed={0.5}
/>

# 4. Test and adjust springOptions/transition as needed
```

## Reference Links

- **Documentation**: https://motion-primitives.com/docs
- **Component Gallery**: https://motion-primitives.com/
- **Motion Library**: https://motion.dev/ (Framer Motion docs)
- **Local Source**: `motion-primitives-main/components/core/`

## Support & Troubleshooting

**Component not animating?**

- Check `'use client'` directive is present
- Verify motion/react is installed: `npm ls motion`
- Check browser console for errors

**Import errors?**

- Ensure component is in `components/ui/` not `motion-primitives-main/`
- Verify `@/lib/utils` path exists with `cn()` function
- Check tsconfig.json has `@/*` path alias

**Performance issues?**

- Reduce `stagger` values
- Limit number of simultaneously animating elements
- Use `will-change: transform` CSS for heavy animations
- Consider `AnimatedGroup` with lower stagger for large lists

---

**Last Updated**: October 2025  
**Motion Primitives Version**: Beta (actively updated)  
**Compatibility**: React 19, Next.js 15, Tailwind CSS v4
