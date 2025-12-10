# ChisokuLab Website - Product Backlog
**For Cursor AI Development**  
**Last Updated:** December 10, 2024  
**Strategy:** Break complex tasks into small, manageable chunks to avoid Cursor getting stuck

---

## How to Use This Backlog

**Task Size Philosophy:**
- ✅ **Small tasks** (30-60 min each): Cursor can complete without getting stuck
- ✅ **Clear dependencies**: Build foundation before advanced features
- ✅ **Testable checkpoints**: Verify each task works before moving to next

**Task Format:**
```
TASK-XXX: Brief Description
Priority: P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)
Phase: 1 | 2 | 3 | 4
Estimated Time: 30min | 1hr | 2hrs
Dependencies: [List of prerequisite tasks]
Acceptance Criteria: [How to verify completion]
```

---

## PHASE 1: MVP CORE (Weeks 1-2)
**Goal:** Launch-ready homepage + course page

### 1.1 Project Setup & Configuration

**TASK-001: Initialize Next.js Project**
- Priority: P0
- Phase: 1
- Time: 30min
- Dependencies: None
- Status: ✅ **COMPLETE**
- Steps:
  1. Run `npx create-next-app@latest chisokulab --typescript --tailwind --app --src-dir`
  2. Select options: TypeScript ✓, ESLint ✓, Tailwind ✓, App Router ✓, customize import alias ✓
  3. Verify server runs: `npm run dev`
  4. Test localhost:3000 loads
- Acceptance: Clean Next.js app with TypeScript and Tailwind runs successfully
- **Acceptance Result: ✅ PASSED** - Project structure verified, TypeScript config correct, Tailwind v4 configured, App Router structure in place

---

**TASK-002: Install Core Dependencies**
- Priority: P0
- Phase: 1
- Time: 30min
- Dependencies: TASK-001
- Status: ✅ **COMPLETE**
- Install:
  ```bash
  npm install framer-motion lucide-react clsx tailwind-merge
  npm install @radix-ui/react-accordion @radix-ui/react-tabs
  npm install react-hook-form zod @hookform/resolvers/zod
  npm install gray-matter remark remark-html
  ```
- Acceptance: All packages install without errors, no version conflicts
- **Acceptance Result: ✅ PASSED** - All packages installed successfully, no errors or version conflicts detected

---

**TASK-003: Configure Tailwind with ChisokuLab Brand Colors**
- Priority: P0
- Phase: 1
- Time: 45min
- Dependencies: TASK-002
- Status: ✅ **COMPLETE**
- Steps:
  1. Open `tailwind.config.ts`
  2. Add custom colors from Brand Guidelines:
     ```typescript
     colors: {
       'chisoku-cyan': {
         DEFAULT: '#00B0D0',
         50: '#E0F7FB',
         100: '#B3EDF5',
         500: '#00B0D0',
         600: '#009BB8',
         900: '#005A6E',
       },
       'chisoku-navy': {
         DEFAULT: '#0A1929',
         500: '#0A1929',
         800: '#040A11',
       },
       // ... full color palette from Brand Guidelines
     }
     ```
  3. Add font families: Inter, Source Sans Pro, Merriweather
  4. Add custom spacing, shadows, animations
- Acceptance: Colors available as `bg-chisoku-cyan-500`, `text-chisoku-navy`, etc.
- **Acceptance Result: ✅ PASSED** - All brand colors configured in tailwind.config.ts, fonts (Inter, Source Sans Pro, Merriweather) added, custom spacing/shadows/animations included. Colors accessible via Tailwind classes.

---

**TASK-004: Create Global CSS with Zen-AI Styles**
- Priority: P0
- Phase: 1
- Time: 30min
- Dependencies: TASK-003
- Status: ✅ **COMPLETE**
- Steps:
  1. Open `app/globals.css`
  2. Add CSS custom properties for theme
  3. Add base styles for smooth scrolling
  4. Add @media (prefers-reduced-motion: reduce) rules
  5. Import fonts (self-hosted or Google Fonts)
- Acceptance: Global styles apply, fonts load correctly
- **Acceptance Result: ✅ PASSED** - globals.css updated with CSS custom properties, smooth scrolling enabled, reduced-motion media query added, fonts imported via Next.js Google Fonts in layout.tsx

---

**TASK-005: Create Utility Functions Library**
- Priority: P0
- Phase: 1
- Time: 30min
- Dependencies: TASK-002
- Status: ✅ **COMPLETE**
- Create `/lib/utils.ts`:
  - cn() function for className merging (clsx + tailwind-merge)
  - formatDate() helper
  - slugify() for URLs
- Acceptance: Utility functions work in test component
- **Acceptance Result: ✅ PASSED** - All utility functions created: cn() for className merging, formatDate() for date formatting, slugify() for URL-friendly strings. Functions are properly typed and ready to use.

---

**TASK-006: Set Up Framer Motion Animation Presets**
- Priority: P0
- Phase: 1
- Time: 45min
- Dependencies: TASK-002
- Status: ✅ **COMPLETE**
- Create `/lib/animations.ts`:
  - zenVariants.fadeInUp
  - zenVariants.breathe (for CTAs)
  - zenVariants.staggerContainer
  - zenVariants.ensoComplete (loader)
- Acceptance: Import and use variants in test component
- **Acceptance Result: ✅ PASSED** - All animation variants created: fadeInUp, breathe, staggerContainer, staggerChild, ensoComplete, slideInRight, fadeTransition. All properly typed with Variants from framer-motion, ready to import and use.

---

### 1.2 Layout Components (Foundation)

**TASK-007: Create Root Layout**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-004, TASK-006
- Status: ✅ **COMPLETE**
- Steps:
  1. Edit `app/layout.tsx`
  2. Add metadata (title, description, OG tags)
  3. Import fonts (Inter, Source Sans Pro, Merriweather)
  4. Add body classes for font families
  5. Verify metadata appears in browser tab and social previews
- Acceptance: Page title shows "ChisokuLab", fonts load
- **Acceptance Result: ✅ PASSED** - Metadata added with comprehensive OG tags, Twitter cards, and SEO metadata. All fonts (Inter, Source Sans Pro, Merriweather) imported and configured. Header and Footer components integrated into layout.

---

**TASK-008: Create Header/Navigation Component (Desktop)**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-007
- Status: ✅ **COMPLETE**
- Create `components/layout/Header.tsx`:
  - Logo (text placeholder for now: "ChisokuLab")
  - Navigation links: Course | Enterprise Solutions | Resources | About | Contact
  - Hover states (cyan underline)
  - Sticky on scroll (with shadow appearing)
- Acceptance: Desktop nav works, links clickable, hover effects smooth
- **Acceptance Result: ✅ PASSED** - Header component created with logo, all navigation links, cyan underline hover effects, sticky positioning with shadow on scroll. Responsive design with mobile menu button. All links functional.

---

**TASK-009: Create Mobile Navigation (Hamburger Menu)**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-008
- Status: ✅ **COMPLETE**
- Steps:
  1. Add hamburger icon (Lucide: Menu)
  2. Create slide-in drawer (right side)
  3. Animate open/close (Framer Motion)
  4. Add close button (X icon)
  5. Disable body scroll when open
- Acceptance: Mobile menu (<768px) opens/closes smoothly
- **Acceptance Result: ✅ PASSED** - Mobile navigation integrated into Header component. Hamburger menu icon (Lucide Menu), slide-in drawer from right with Framer Motion animations (slideInRight variant), close button (X icon), body scroll disabled when open, backdrop blur effect. Stagger animations for menu items.

---

**TASK-010: Create Footer Component**
- Priority: P0
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-007
- Status: ✅ **COMPLETE**
- Create `components/layout/Footer.tsx`:
  - Navy background (#0A1929)
  - 3-column layout: Logo | Navigation | Newsletter signup
  - Social icons (placeholder links)
  - Copyright text
  - Privacy/Terms links (placeholder for now)
- Acceptance: Footer renders, matches design, responsive
- **Acceptance Result: ✅ PASSED** - Footer component created with navy background, 3-column responsive grid layout (Logo, Navigation, Newsletter), newsletter signup form, social media icons (Twitter, LinkedIn, GitHub), copyright text with dynamic year, Privacy/Terms links. Fully responsive design.

---

### 1.3 UI Components (Reusable)

**TASK-011: Create Button Component**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-006
- Create `components/ui/Button.tsx`:
  - Variants: primary (cyan bg), secondary (cyan outline), ghost
  - Sizes: sm, md, lg
  - Hover animations (lift 4px, cyan glow)
  - Loading state (spinner)
  - Disabled state
- Acceptance: All variants render correctly, hover works

---

**TASK-012: Create Card Component**
- Priority: P0
- Phase: 1
- Time: 45min
- Dependencies: TASK-003
- Create `components/ui/Card.tsx`:
  - Variants: default (white bg, subtle shadow), elevated (hover lift)
  - Rounded corners (12px)
  - Padding: 48px (desktop), 32px (mobile)
- Acceptance: Cards render with proper spacing and hover

---

**TASK-013: Create Input Component**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-003
- Create `components/ui/Input.tsx`:
  - Base input with label
  - Focus state (cyan glow)
  - Error state (red border + message)
  - Success state (cyan border)
- Acceptance: Focus glow works, error states display

---

**TASK-014: Create Accordion Component**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-002
- Create `components/ui/Accordion.tsx` using Radix UI:
  - Smooth height animation (400ms)
  - Chevron icon rotates on open
  - Cyan active state
- Acceptance: Opens/closes smoothly, multiple items work

---

### 1.4 Homepage Sections

**TASK-015: Create Homepage Hero Section**
- Priority: P0
- Phase: 1
- Time: 3hrs
- Dependencies: TASK-008, TASK-011, TASK-006
- Create `components/sections/Hero.tsx`:
  - Navy background (#0A1929) with subtle gradient
  - 50/50 split: text left, visual placeholder right
  - Headline: "AI Won't Replace You. Indecision Will."
  - Subheadline with fade-in animation
  - Dual CTAs: "Start Learning" + "Enterprise Solutions"
  - Stagger animation (word-by-word for headline)
- Acceptance: Hero renders, animations work, responsive

---

**TASK-016: Add Particle Field to Hero Background**
- Priority: P1
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-015
- Steps:
  1. Install react-tsparticles or create custom canvas
  2. Add 50 cyan particles (#00B0D0, 20% opacity)
  3. Slow upward drift (0.5 speed)
  4. No connecting lines (too techy)
  5. Ensure performance (60fps)
- Acceptance: Particles visible, smooth, doesn't lag

---

**TASK-017: Create Problem Section (3-Column Cards)**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-012, TASK-006
- Create `components/sections/ProblemSection.tsx`:
  - 3 cards: Pressure to Adopt AI | Decision Fatigue | Fear of Obsolescence
  - Icons (Lucide: Zap, Target, RefreshCw)
  - Hover: lift 4px, cyan border appears
  - Stagger animation on scroll into view
- Acceptance: 3 cards render, hover works, responsive (stack on mobile)

---

**TASK-018: Create Solution Section (Vertical Split)**
- Priority: P0
- Phase: 1
- Time: 2.5hrs
- Dependencies: TASK-012, TASK-006
- Create `components/sections/SolutionSection.tsx`:
  - 2-column grid (desktop), stack (mobile)
  - Left: AI Efficiency (cyan accent, checkmarks)
  - Right: Hindu Philosophy (amber accent, checkmarks)
  - Center divider: 1px cyan line (vertical)
  - Quote below (serif font, centered)
- Acceptance: Split renders, divider visible, responsive

---

**TASK-019: Add Animated Particles to Solution Divider**
- Priority: P2
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-018
- Steps:
  1. Create particle animation flowing up the center line
  2. Use Framer Motion or CSS animation
  3. Subtle glow pulse at center meeting point
- Acceptance: Particles flow upward smoothly

---

**TASK-020: Create Course Preview Section (Tabs)**
- Priority: P0
- Phase: 1
- Time: 3hrs
- Dependencies: TASK-014, TASK-002
- Create `components/sections/CoursePreview.tsx`:
  - Tabs: "AI Efficiency (1-8)" | "Hindu Decision Science (9-12)"
  - Tab style: Cyan underline on active, hover effect
  - Module list for each tab (placeholder data)
  - Accordion for each module (number, title, duration)
  - Smooth tab switching (fade transition)
- Acceptance: Tabs switch, accordions expand/collapse

---

**TASK-021: Create Testimonials Section (Carousel)**
- Priority: P1
- Phase: 1
- Time: 2.5hrs
- Dependencies: TASK-012, TASK-006
- Create `components/sections/TestimonialsSection.tsx`:
  - 3 testimonial cards (placeholder data)
  - Gradient background (navy to darker navy)
  - Large serif quote text
  - Oversized quotation marks (cyan, 20% opacity)
  - Auto-rotate every 5 seconds
  - Dots navigation below
- Acceptance: Carousel auto-rotates, swipeable on mobile

---

**TASK-022: Create About Preview Section**
- Priority: P1
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-012, TASK-011
- Create `components/sections/AboutPreview.tsx`:
  - 40/60 split: image left, text right
  - Placeholder image (gray box with "Photo of Agam")
  - Headline: "Who's Teaching This?"
  - Bio text (3 paragraphs, placeholder)
  - CTA: "Read My Full Story" → /about
- Acceptance: Section renders, asymmetric layout, responsive

---

**TASK-023: Create Final CTA Section**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-013, TASK-011
- Create `components/sections/FinalCTA.tsx`:
  - Gradient background (indigo to teal)
  - Headline: "Ready to Stop Reacting and Start Leading?"
  - Email capture form (React Hook Form + Zod)
  - Submit button (cyan)
  - Trust badges below (30-day guarantee, lifetime access, etc.)
- Acceptance: Form validates, submits (console.log for now)

---

**TASK-024: Assemble Homepage**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-015 through TASK-023
- Steps:
  1. Edit `app/page.tsx`
  2. Import all section components
  3. Stack in order: Hero → Problem → Solution → CoursePreview → Testimonials → AboutPreview → FinalCTA
  4. Add spacing between sections (120px desktop, 80px mobile)
  5. Test scroll smoothness
- Acceptance: Full homepage renders, all sections visible

---

### 1.5 Course Page

**TASK-025: Create Course Hero Section**
- Priority: P0
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-011
- Create `components/sections/CourseHero.tsx`:
  - Badge: "12-Module Comprehensive Course"
  - Headline: "Calm Amid AI Chaos"
  - Subheadline (placeholder)
  - Stats grid (4 items): 12 Modules | 30+ Hours | 6 Months Support | ∞ Lifetime Access
  - Dual CTAs: "Enroll Now" (scroll to pricing) + "Download Syllabus" (PDF placeholder)
- Acceptance: Hero renders, CTAs work (scroll to pricing)

---

**TASK-026: Create MDX Content Structure**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-005
- Steps:
  1. Create `/content/curriculum/` folder
  2. Create placeholder MDX files: module-01.mdx through module-12.mdx
  3. Add frontmatter: moduleNumber, title, category (efficiency|philosophy), duration
  4. Add placeholder content sections: What You'll Learn, Key Takeaways, Deliverable
- Acceptance: 12 MDX files created with proper frontmatter

---

**TASK-027: Create MDX Utilities**
- Priority: P0
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-026
- Create `/lib/mdx.ts`:
  - getAllModules() - reads all curriculum MDX files
  - getModule(slug) - gets single module
  - Parses frontmatter with gray-matter
  - Processes markdown with remark
- Acceptance: Can fetch module data in component

---

**TASK-028: Create Curriculum Section (Full Module List)**
- Priority: P0
- Phase: 1
- Time: 2.5hrs
- Dependencies: TASK-027, TASK-014
- Create `components/sections/CurriculumSection.tsx`:
  - Fetch modules via getAllModules()
  - Filter by category (efficiency vs philosophy)
  - Accordion for each module:
    - Module number (large cyan circle)
    - Title + duration
    - Expandable: description, deliverable (cyan box)
  - Smooth expand/collapse (400ms)
- Acceptance: All 12 modules render, expand/collapse works

---

**TASK-029: Create Course Format Section**
- Priority: P1
- Phase: 1
- Time: 1hr
- Dependencies: TASK-012
- Create `components/sections/CourseFormatSection.tsx`:
  - 2x2 grid (desktop), stack (mobile)
  - 4 cards: Video Lessons | Templates | Community | Live Q&A
  - Icons (Lucide), title, description
- Acceptance: 4 cards render, responsive

---

**TASK-030: Create Pricing Section**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-012, TASK-011
- Create `components/sections/PricingSection.tsx`:
  - Centered card (max-width 600px)
  - Badge: "Early Bird Pricing"
  - Price: ₹15,000 (large, gold color)
  - Crossed-out original: ₹25,000
  - Feature checklist (6-8 items with checkmarks)
  - CTA: "Enroll Now" (Gumroad link - placeholder for now)
  - Guarantee badge below (shield icon)
- Acceptance: Pricing card renders, CTA links to placeholder

---

**TASK-031: Assemble Course Page**
- Priority: P0
- Phase: 1
- Time: 45min
- Dependencies: TASK-025 through TASK-030
- Steps:
  1. Create `app/course/page.tsx`
  2. Import CourseHero, CurriculumSection, CourseFormatSection, PricingSection
  3. Add FAQ preview (link to future FAQ page)
  4. Add Final CTA section (reuse from homepage)
- Acceptance: Full course page renders

---

### 1.6 Consulting Waitlist Page (Simple)

**TASK-032: Create Consulting Waitlist Page**
- Priority: P1
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-013, TASK-011
- Create `app/consulting/waitlist/page.tsx`:
  - Hero: "Enterprise AI Deployment Advisory – Launching Q1 2025"
  - Subheadline (placeholder)
  - 3 bullet points: What's coming (Readiness Assessment, Deployment Strategy, Governance)
  - Email capture form
  - CTA: "Join Waitlist for Early Access + Free Consultation"
- Acceptance: Page renders, form validates

---

### 1.7 Email Integration (ConvertKit)

**TASK-033: Create ConvertKit API Utility**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: None
- Create `/lib/convertkit.ts`:
  - subscribeToNewsletter(email) function
  - Calls ConvertKit API
  - Handles errors gracefully
- Acceptance: Function compiles, ready for API key

---

**TASK-034: Create Email Capture API Route**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-033
- Create `app/api/subscribe/route.ts`:
  - POST endpoint
  - Accepts { email, source }
  - Calls ConvertKit API
  - Returns success/error
- Acceptance: API route responds (test with console.log)

---

**TASK-035: Connect Forms to API**
- Priority: P0
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-034, TASK-023, TASK-032
- Steps:
  1. Update FinalCTA form to call /api/subscribe
  2. Update Waitlist form to call /api/subscribe with source: "consulting-waitlist"
  3. Show success/error messages
  4. Clear form on success
- Acceptance: Forms submit, success message appears

---

### 1.8 SEO & Metadata

**TASK-036: Create SEO Metadata Utility**
- Priority: P0
- Phase: 1
- Time: 45min
- Dependencies: None
- Create `/lib/seo.ts`:
  - generateMetadata() function
  - Takes title, description, image
  - Returns Next.js Metadata object with OG tags, Twitter cards
- Acceptance: Utility function works

---

**TASK-037: Add Metadata to All Pages**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-036
- Steps:
  1. Homepage: Export metadata object
  2. Course page: Export metadata object
  3. Consulting waitlist: Export metadata object
  4. Verify in browser dev tools (OG tags present)
- Acceptance: All pages have proper meta tags

---

**TASK-038: Create sitemap.xml**
- Priority: P0
- Phase: 1
- Time: 30min
- Dependencies: None
- Create `app/sitemap.ts`:
  - Export sitemap() function
  - Returns array of URLs with priority, changeFrequency
  - Homepage (priority 1.0), Course (0.9), Consulting (0.8)
- Acceptance: /sitemap.xml loads in browser

---

**TASK-039: Create robots.txt**
- Priority: P0
- Phase: 1
- Time: 15min
- Dependencies: None
- Create `app/robots.ts`:
  - Allow all user agents
  - Disallow: /dashboard, /api
  - Point to sitemap
- Acceptance: /robots.txt loads

---

### 1.9 Testing & Polish

**TASK-040: Mobile Responsiveness Audit**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: All UI tasks
- Steps:
  1. Test on 375px (iPhone SE)
  2. Test on 768px (iPad portrait)
  3. Test on 1024px (iPad landscape)
  4. Test on 1920px (desktop)
  5. Fix any overflow, alignment, or spacing issues
- Acceptance: All pages render correctly on all sizes

---

**TASK-041: Performance Optimization**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-040
- Steps:
  1. Run Lighthouse audit
  2. Optimize images (convert to WebP, add sizes)
  3. Lazy load below-fold components
  4. Check for unnecessary re-renders
  5. Minimize bundle size
- Acceptance: Lighthouse score 90+ on all metrics

---

**TASK-042: Accessibility Audit**
- Priority: P0
- Phase: 1
- Time: 1.5hrs
- Dependencies: TASK-040
- Steps:
  1. Add alt text to all images
  2. Verify keyboard navigation works (Tab through all interactive elements)
  3. Test with screen reader (NVDA or VoiceOver)
  4. Check color contrast (all text 4.5:1 minimum)
  5. Add skip-to-content link
- Acceptance: Lighthouse Accessibility score 95+

---

**TASK-043: Cross-Browser Testing**
- Priority: P1
- Phase: 1
- Time: 1hr
- Dependencies: TASK-041
- Test in:
  - Chrome (latest)
  - Safari (latest)
  - Firefox (latest)
  - Edge (latest)
- Fix any rendering issues
- Acceptance: Works identically in all browsers

---

**TASK-044: Deploy to Vercel (Staging)**
- Priority: P0
- Phase: 1
- Time: 1hr
- Dependencies: TASK-043
- Steps:
  1. Push code to GitHub
  2. Connect repo to Vercel
  3. Add environment variables (ConvertKit keys)
  4. Deploy
  5. Test staging URL
- Acceptance: Staging site live, working

---

**TASK-045: Phase 1 Final Review**
- Priority: P0
- Phase: 1
- Time: 2hrs
- Dependencies: TASK-044
- Checklist:
  - [ ] Homepage renders completely
  - [ ] Course page renders completely
  - [ ] Consulting waitlist page works
  - [ ] Email forms submit successfully
  - [ ] Mobile responsive (all breakpoints)
  - [ ] Lighthouse score 90+
  - [ ] No console errors
  - [ ] All links work
  - [ ] Animations smooth (60fps)
  - [ ] Ready to share URL
- Acceptance: All items checked, Phase 1 complete ✓

---

## PHASE 2: CONTENT & TRUST (Week 3)
**Goal:** Establish credibility and provide free value

### 2.1 About Page

**TASK-046: Create About Page**
- Priority: P0
- Phase: 2
- Time: 2hrs
- Dependencies: TASK-045
- Create `app/about/page.tsx`:
  - Hero: Large photo of Agam (placeholder box)
  - Headline: "About ChisokuLab"
  - Story sections: Why I Built This | What We Believe | The Philosophy
  - CTA: "Explore the Course"
- Acceptance: About page renders, prose styling

---

**TASK-047: Create MDX Content for About Page**
- Priority: P0
- Phase: 2
- Time: 1hr
- Dependencies: TASK-046
- Create `/content/pages/about.mdx`:
  - Frontmatter: title, description
  - Content sections with markdown
  - Placeholder text for Agam's story
- Acceptance: MDX file created, parsable

---

### 2.2 Full Consulting Page

**TASK-048: Create Consulting Services Page**
- Priority: P0
- Phase: 2
- Time: 3hrs
- Dependencies: TASK-045
- Create `app/consulting/page.tsx`:
  - Hero: "Enterprise AI Deployment Without Trial-and-Error Tax"
  - Who It's For section
  - Services cards (4 services)
  - Why ChisokuLab section
  - CTA: "Schedule AI Readiness Call"
- Acceptance: Full consulting page renders

---

**TASK-049: Create Individual Service Sub-Pages**
- Priority: P1
- Phase: 2
- Time: 2hrs each (8hrs total)
- Dependencies: TASK-048
- Create:
  - `/consulting/readiness-assessment`
  - `/consulting/llm-deployment`
  - `/consulting/governance-architecture`
  - `/consulting/advisory-retainer`
- Each with: What it is, Who it's for, Deliverables, Timeline, Investment, CTA
- Acceptance: 4 service pages created

---

### 2.3 Blog System

**TASK-050: Create Blog Index Page**
- Priority: P0
- Phase: 2
- Time: 2hrs
- Dependencies: TASK-027
- Create `app/blog/page.tsx`:
  - Page header: "Blog"
  - Filter tabs: All | AI Tools | Decision Science | Philosophy
  - 3-column grid of blog cards
  - Featured post (first post, larger card)
  - Pagination (show 9 posts per page)
- Acceptance: Blog index renders (empty for now)

---

**TASK-051: Create Blog Utilities**
- Priority: P0
- Phase: 2
- Time: 1.5hrs
- Dependencies: TASK-027
- Add to `/lib/mdx.ts`:
  - getAllBlogPosts() - sorted by date
  - getBlogPost(slug) - single post
  - getBlogCategories() - unique categories
  - getRelatedPosts(slug) - 3 similar posts
- Acceptance: Functions return data

---

**TASK-052: Create Blog Post Template**
- Priority: P0
- Phase: 2
- Time: 3hrs
- Dependencies: TASK-051
- Create `app/blog/[slug]/page.tsx`:
  - Hero image (full width)
  - Category badge
  - Title (H1)
  - Author + date + read time
  - Body content (prose styling)
  - Table of contents (floating sidebar on desktop)
  - Share buttons (Twitter, LinkedIn, Copy link)
  - Related posts (3-card grid)
- Acceptance: Blog post renders from MDX

---

**TASK-053: Create Blog Post MDX Files (5 Posts)**
- Priority: P0
- Phase: 2
- Time: 3hrs (writing content)
- Dependencies: TASK-052
- Create in `/content/blog/`:
  1. `ai-tools-for-managers.mdx` (AI Tools category)
  2. `bhagavad-gita-leadership.mdx` (Philosophy category)
  3. `decision-fatigue-fix.mdx` (Decision Science category)
  4. `ai-deployment-enterprise.mdx` (Enterprise category)
  5. `three-gunas-framework.mdx` (Philosophy category)
- Each with: Frontmatter, intro, 3-4 sections, conclusion, CTA
- Acceptance: 5 blog posts render correctly

---

**TASK-054: Create RSS Feed**
- Priority: P1
- Phase: 2
- Time: 45min
- Dependencies: TASK-051
- Create `app/rss.xml/route.ts`:
  - Fetch all blog posts
  - Generate RSS XML
  - Return with correct content-type
- Acceptance: /rss.xml loads, valid RSS

---

### 2.4 Resources Page

**TASK-055: Create Resources Page**
- Priority: P1
- Phase: 2
- Time: 2.5hrs
- Dependencies: TASK-013, TASK-011
- Create `app/resources/page.tsx`:
  - Hero: "Start Learning Now"
  - Featured Free Guide (large card with email gate)
  - Latest Videos (3 YouTube embeds)
  - Popular Articles (pull from blog)
  - Free Templates section
- Acceptance: Resources page renders

---

**TASK-056: Create Email Gate Modal**
- Priority: P1
- Phase: 2
- Time: 1.5hrs
- Dependencies: TASK-055
- Create `components/resources/EmailGateModal.tsx`:
  - Modal overlay (dark background)
  - Form: email input + submit
  - Trigger download on successful submission
  - Close button (X)
- Acceptance: Modal opens, form submits, closes

---

### 2.5 FAQ Page

**TASK-057: Create FAQ Page**
- Priority: P1
- Phase: 2
- Time: 2hrs
- Dependencies: TASK-014, TASK-027
- Create `app/faq/page.tsx`:
  - Hero with search box (filter FAQs)
  - FAQ sections: About the Course | Logistics | Pricing | Technical
  - Each FAQ as accordion item
  - Link to contact page at bottom
- Acceptance: FAQ page renders, search filters work

---

**TASK-058: Create FAQ MDX Content**
- Priority: P1
- Phase: 2
- Time: 1.5hrs
- Dependencies: TASK-057
- Create `/content/pages/faq.mdx`:
  - 15-20 Q&A pairs
  - Frontmatter with categories
  - Markdown for answers
- Acceptance: FAQs display correctly

---

**TASK-059: Add FAQ Schema (SEO)**
- Priority: P1
- Phase: 2
- Time: 45min
- Dependencies: TASK-058
- Steps:
  1. Parse FAQ MDX content
  2. Generate JSON-LD FAQPage schema
  3. Add to page metadata
  4. Verify in Rich Results Test
- Acceptance: FAQ rich snippets show in Google preview

---

### 2.6 Contact Page

**TASK-060: Create Contact Page**
- Priority: P1
- Phase: 2
- Time: 2hrs
- Dependencies: TASK-013, TASK-011
- Create `app/contact/page.tsx`:
  - Split layout: Form (left 60%), Info (right 40%)
  - Form fields: Name, Email, Subject, Message
  - Submit button
  - Right sidebar: Email address, response time, social links
- Acceptance: Contact page renders

---

**TASK-061: Create Contact Form API Route**
- Priority: P1
- Phase: 2
- Time: 1hr
- Dependencies: TASK-060
- Create `app/api/contact/route.ts`:
  - POST endpoint
  - Validate with Zod
  - Send email via Resend API
  - Auto-reply to user
  - Honeypot spam protection
- Acceptance: Form sends email (test with real email)

---

### 2.7 Phase 2 Testing

**TASK-062: Content QA Pass**
- Priority: P0
- Phase: 2
- Time: 2hrs
- Dependencies: All Phase 2 tasks
- Checklist:
  - [ ] All pages have content (no Lorem Ipsum visible to users)
  - [ ] All links work (internal + external)
  - [ ] Images load (or placeholders present)
  - [ ] Forms submit successfully
  - [ ] Blog posts render correctly
  - [ ] FAQ search works
  - [ ] Contact form delivers email
- Acceptance: All items checked

---

**TASK-063: SEO Audit (Phase 2 Pages)**
- Priority: P0
- Phase: 2
- Time: 1.5hrs
- Dependencies: TASK-062
- Verify:
  - [ ] All new pages have meta titles/descriptions
  - [ ] Open Graph images present
  - [ ] Sitemap updated with new URLs
  - [ ] Structured data (FAQ, Blog) present
  - [ ] Internal linking (blog posts link to course/consulting)
- Acceptance: Lighthouse SEO 100 on all pages

---

---

## PHASE 3: CONVERSION OPTIMIZATION (Week 4)
**Goal:** Increase enrollment and consultation rates

### 3.1 Testimonials & Social Proof

**TASK-064: Create Testimonials CMS**
- Priority: P1
- Phase: 3
- Time: 1hr
- Dependencies: None
- Create `/data/testimonials.ts`:
  - Export array of testimonial objects
  - Fields: quote, author, role, company, avatar, rating
  - Placeholder data (3-5 testimonials)
- Acceptance: Testimonials data available

---

**TASK-065: Update Testimonials Section with Real Data**
- Priority: P1
- Phase: 3
- Time: 1hr
- Dependencies: TASK-064, TASK-021
- Update `components/sections/TestimonialsSection.tsx`:
  - Import from testimonials.ts
  - Add star rating display
  - Add photo/avatar support
  - Add "Load More" button (if >3 testimonials)
- Acceptance: Testimonials display real data

---

**TASK-066: Add Social Proof Indicators**
- Priority: P2
- Phase: 3
- Time: 1.5hrs
- Dependencies: TASK-065
- Add to course page:
  - Enrollment count (e.g., "127 managers enrolled")
  - Recent enrollment ticker (e.g., "Priya from Bangalore enrolled 2 hours ago")
  - Avg. rating display
- Acceptance: Social proof visible, feels authentic

---

### 3.2 Gumroad Integration

**TASK-067: Gumroad Overlay Embed**
- Priority: P1
- Phase: 3
- Time: 2hrs
- Dependencies: TASK-030
- Steps:
  1. Add Gumroad JavaScript SDK
  2. Replace external link with overlay trigger
  3. Configure overlay options (theme: auto, colorful: true)
  4. Test checkout flow
- Acceptance: Gumroad checkout opens in overlay

---

**TASK-068: Gumroad Webhook Endpoint**
- Priority: P2
- Phase: 3
- Time: 2hrs
- Dependencies: TASK-067
- Create `app/api/gumroad/webhook/route.ts`:
  - Verify webhook signature
  - On successful purchase: store customer data
  - Send welcome email via Resend
  - Return 200 OK
- Acceptance: Webhook receives data (test with Gumroad test mode)

---

### 3.3 Exit-Intent Popup

**TASK-069: Create Exit-Intent Popup**
- Priority: P2
- Phase: 3
- Time: 2.5hrs
- Dependencies: TASK-013, TASK-011
- Create `components/ExitIntentPopup.tsx`:
  - Detect mouse leaving viewport (y < 0)
  - Show modal with: "Wait! Get our free AI guide"
  - Email capture form
  - Only show once per session (localStorage)
  - Close button (X)
- Acceptance: Popup appears on exit intent, doesn't re-trigger

---

### 3.4 Lead Magnets

**TASK-070: Create Lead Magnet PDFs**
- Priority: P1
- Phase: 3
- Time: 4hrs (content creation)
- Dependencies: None
- Create 2 PDFs:
  1. "The Busy Manager's Guide to AI Efficiency" (20-25 pages)
  2. "Private LLM Deployment Checklist" (10-15 pages)
- Use Canva or Figma for design
- Export as PDFs
- Upload to `/public/downloads/`
- Acceptance: PDFs download successfully

---

**TASK-071: Create Download Thank You Page**
- Priority: P2
- Phase: 3
- Time: 1hr
- Dependencies: TASK-070
- Create `app/downloads/[slug]/page.tsx`:
  - Success message
  - Automatic download trigger
  - CTA: "Explore Our Course"
  - Suggested next steps
- Acceptance: Download triggers, page renders

---

### 3.5 Analytics & Tracking

**TASK-072: Set Up Vercel Analytics**
- Priority: P0
- Phase: 3
- Time: 30min
- Dependencies: TASK-044
- Steps:
  1. Enable Vercel Analytics in dashboard
  2. Add Analytics component to root layout
  3. Verify events tracking
- Acceptance: Analytics dashboard shows data

---

**TASK-073: Set Up Conversion Tracking**
- Priority: P0
- Phase: 3
- Time: 1.5hrs
- Dependencies: TASK-072
- Track events:
  - Email signup (course)
  - Email signup (consulting waitlist)
  - Gumroad checkout initiated
  - Download initiated
  - Contact form submitted
- Use Vercel Analytics or custom event logging
- Acceptance: Events appear in dashboard

---

**TASK-074: Create Internal Analytics Dashboard**
- Priority: P2
- Phase: 3
- Time: 3hrs
- Dependencies: TASK-073
- Create `app/admin/analytics/page.tsx` (password protected):
  - Visitors count
  - Email signups by source
  - Conversion funnel visualization
  - Top pages
- Acceptance: Dashboard shows data (basic version)

---

### 3.6 A/B Testing Setup (Optional)

**TASK-075: Set Up A/B Testing Framework**
- Priority: P3
- Phase: 3
- Time: 2hrs
- Dependencies: TASK-072
- Options:
  - Vercel Edge Config for feature flags
  - Simple cookie-based A/B test utility
- Test: Hero headline variations
- Acceptance: Can run simple A/B test

---

### 3.7 Phase 3 Testing

**TASK-076: Conversion Funnel Test**
- Priority: P0
- Phase: 3
- Time: 2hrs
- Dependencies: All Phase 3 tasks
- Test complete user journeys:
  1. Homepage → Email signup → Thank you
  2. Homepage → Course page → Gumroad checkout
  3. Homepage → Consulting waitlist → Confirmation
  4. Exit intent → Lead magnet download
- Acceptance: All funnels work end-to-end

---

**TASK-077: Performance Re-Check**
- Priority: P0
- Phase: 3
- Time: 1hr
- Dependencies: TASK-076
- Run Lighthouse audit
- Ensure new features didn't degrade performance
- Optimize if needed
- Acceptance: Still 90+ on all metrics

---

---

## PHASE 4: USER AUTHENTICATION & COURSE PLATFORM (Weeks 5-6)
**Goal:** Own course delivery platform with user authentication

### 4.1 Clerk Authentication Setup

**TASK-078: Install and Configure Clerk**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: None
- Steps:
  1. `npm install @clerk/nextjs`
  2. Create Clerk account, get API keys
  3. Add to .env.local
  4. Wrap app in ClerkProvider
- Acceptance: Clerk SDK installed, configured

---

**TASK-079: Create Sign-In Page**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: TASK-078
- Create `app/sign-in/[[...sign-in]]/page.tsx`:
  - Import Clerk's SignIn component
  - Custom appearance (cyan theme)
  - Center on page
- Acceptance: /sign-in loads, can create test account

---

**TASK-080: Create Sign-Up Page**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: TASK-078
- Create `app/sign-up/[[...sign-up]]/page.tsx`:
  - Import Clerk's SignUp component
  - Custom appearance (cyan theme)
  - Center on page
- Acceptance: /sign-up loads, can register test account

---

**TASK-081: Set Up Middleware for Protected Routes**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: TASK-079
- Create `middleware.ts`:
  - Use authMiddleware from Clerk
  - Public routes: /, /about, /course, /blog/*, /consulting/*
  - Protected: /dashboard, /dashboard/*
  - Redirect to /sign-in if not authenticated
- Acceptance: /dashboard redirects to /sign-in when not logged in

---

### 4.2 Course Dashboard

**TASK-082: Create Dashboard Layout**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-081
- Create `app/dashboard/layout.tsx`:
  - Sidebar: Module list with progress
  - Header: User menu (Clerk UserButton), logo
  - Main content area
  - Sticky sidebar on desktop, collapsible on mobile
- Acceptance: Dashboard layout renders when logged in

---

**TASK-083: Create Dashboard Home Page**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-082
- Create `app/dashboard/page.tsx`:
  - Welcome message: "Welcome back, {firstName}!"
  - Progress overview (% complete, stats)
  - "Continue Learning" card (next lesson)
  - Module grid with progress indicators
- Acceptance: Dashboard home shows user data

---

**TASK-084: Create Module Page Template**
- Priority: P0
- Phase: 4
- Time: 2.5hrs
- Dependencies: TASK-083
- Create `app/dashboard/module/[slug]/page.tsx`:
  - Fetch module content from MDX
  - Video player area (16:9 aspect ratio)
  - Lesson title + description below video
  - "Mark Complete" checkbox
  - Download resources section
  - Next/Previous lesson navigation
- Acceptance: Module page renders, video placeholder visible

---

### 4.3 Video Player Integration

**TASK-085: Integrate Video Player (Vimeo or YouTube)**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-084
- Steps:
  1. Choose Vimeo or YouTube
  2. Add video IDs to module MDX frontmatter
  3. Create VideoPlayer component
  4. Embed via iframe or SDK
  5. Domain restrict embeds (security)
- Acceptance: Videos play in dashboard

---

**TASK-086: Add Video Event Tracking**
- Priority: P2
- Phase: 4
- Time: 1.5hrs
- Dependencies: TASK-085
- Track:
  - Video started
  - Video 25% complete
  - Video 50% complete
  - Video 75% complete
  - Video completed
- Use Vimeo/YouTube player API
- Acceptance: Events log to console

---

### 4.4 Progress Tracking

**TASK-087: Set Up Database (Vercel Postgres or Supabase)**
- Priority: P0
- Phase: 4
- Time: 1.5hrs
- Dependencies: TASK-081
- Steps:
  1. Choose Vercel Postgres or Supabase
  2. Create tables:
     - user_progress (user_id, percent_complete, last_accessed)
     - lesson_completions (user_id, lesson_id, completed_at)
  3. Add connection string to .env.local
  4. Test connection
- Acceptance: Can query database

---

**TASK-088: Create Progress Tracking Functions**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-087
- Create `/lib/progress.ts`:
  - getUserProgress(userId) - fetch current progress
  - markLessonComplete(userId, lessonId) - mark lesson done
  - updateOverallProgress(userId) - recalculate %
- Acceptance: Functions work with test data

---

**TASK-089: Connect Progress to UI**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-088, TASK-084
- Steps:
  1. Show progress % in dashboard
  2. Show checkmarks on completed lessons
  3. "Mark Complete" button updates database
  4. Progress bar animates on update
- Acceptance: Progress persists across sessions

---

### 4.5 Download Center

**TASK-090: Create Download Center Page**
- Priority: P1
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-082
- Create `app/dashboard/downloads/page.tsx`:
  - List of all course resources
  - Grouped by module
  - Download buttons for each file
  - File type icons (PDF, Excel, Notion, etc.)
- Acceptance: All downloads accessible

---

**TASK-091: Upload Course Resources**
- Priority: P1
- Phase: 4
- Time: 3hrs (content creation)
- Dependencies: TASK-090
- Create for each module:
  - Slides PDF
  - Cheat sheet PDF
  - Template files (Excel, Notion)
- Upload to `/public/course-resources/`
- Acceptance: All files download correctly

---

### 4.6 Gumroad Purchase Integration

**TASK-092: Update Gumroad Webhook to Create User**
- Priority: P0
- Phase: 4
- Time: 2.5hrs
- Dependencies: TASK-068, TASK-078
- Update `app/api/gumroad/webhook/route.ts`:
  1. On successful purchase, use Clerk API to create user
  2. Set publicMetadata: { courseAccess: true, purchaseDate }
  3. Send welcome email with sign-in instructions
  4. Return success
- Acceptance: Purchase creates Clerk user automatically

---

**TASK-093: Check Course Access on Dashboard Load**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: TASK-092, TASK-083
- Steps:
  1. On dashboard load, check user.publicMetadata.courseAccess
  2. If false, redirect to course purchase page
  3. If true, show dashboard
- Acceptance: Only paid users can access dashboard

---

### 4.7 Email Automation

**TASK-094: Create Welcome Email Sequence**
- Priority: P1
- Phase: 4
- Time: 2hrs
- Dependencies: TASK-092
- Create email templates (Resend):
  1. Welcome + login instructions (immediate)
  2. Getting started tips (Day 1)
  3. Module 1 reminder (Day 3)
  4. Check-in + support offer (Day 7)
- Schedule via ConvertKit or custom cron
- Acceptance: Emails send on trigger

---

**TASK-095: Create Course Completion Email**
- Priority: P2
- Phase: 4
- Time: 1hr
- Dependencies: TASK-089
- Trigger when user hits 100% progress
- Email content:
  - Congratulations message
  - Certificate of completion (PDF)
  - Request testimonial
  - Referral link
- Acceptance: Email sends at 100% completion

---

### 4.8 Phase 4 Testing

**TASK-096: End-to-End User Journey Test**
- Priority: P0
- Phase: 4
- Time: 2hrs
- Dependencies: All Phase 4 tasks
- Test complete flow:
  1. Purchase course on Gumroad (test mode)
  2. Verify webhook creates Clerk user
  3. Verify welcome email received
  4. Sign in to dashboard
  5. Watch video, mark lesson complete
  6. Check progress updates
  7. Download resources
  8. Complete course, receive completion email
- Acceptance: Entire flow works without errors

---

**TASK-097: Security Audit**
- Priority: P0
- Phase: 4
- Time: 1.5hrs
- Dependencies: TASK-096
- Verify:
  - [ ] Protected routes actually redirect
  - [ ] Video embeds are domain-restricted
  - [ ] Database queries use parameterized statements
  - [ ] API routes validate authentication
  - [ ] No sensitive data in client-side code
- Acceptance: No security vulnerabilities found

---

**TASK-098: Performance Test with Auth**
- Priority: P0
- Phase: 4
- Time: 1hr
- Dependencies: TASK-097
- Run Lighthouse on:
  - /dashboard (while authenticated)
  - /dashboard/module/[slug]
  - Check for slowdowns from Clerk or database queries
- Acceptance: Dashboard pages still 90+ performance

---

---

## PHASE 5: POLISH & OPTIMIZATION (Week 7+)
**Goal:** Final touches and optimization

### 5.1 Comments & Community

**TASK-099: Integrate Giscus Comments (GitHub Discussions)**
- Priority: P2
- Phase: 5
- Time: 2hrs
- Steps:
  1. Create GitHub repo: chisokulab-comments
  2. Enable Discussions
  3. Install Giscus app
  4. Get configuration from giscus.app
  5. Add Comments component to blog posts
- Acceptance: Comments load on blog posts

---

### 5.2 Additional Features

**TASK-100: Add Search Functionality**
- Priority: P2
- Phase: 5
- Time: 3hrs
- Options:
  - Algolia DocSearch (free for docs)
  - Pagefind (static search)
  - Custom search with flexsearch
- Index: All pages, blog posts, FAQs
- Acceptance: Search works, finds relevant content

---

**TASK-101: Add Newsletter Archive Page**
- Priority: P3
- Phase: 5
- Time: 1.5hrs
- Create `app/newsletter/page.tsx`:
  - List of past newsletters
  - Read online links
  - Subscribe form
- Acceptance: Archive page renders

---

**TASK-102: Create 404 Page**
- Priority: P1
- Phase: 5
- Time: 1hr
- Create `app/not-found.tsx`:
  - Friendly message
  - Suggested links (Home, Course, Blog)
  - Search box
- Acceptance: 404 page shows for invalid URLs

---

### 5.3 Final Optimizations

**TASK-103: Image Optimization Pass**
- Priority: P1
- Phase: 5
- Time: 2hrs
- Steps:
  1. Convert all images to WebP
  2. Generate blur placeholders
  3. Add proper alt text
  4. Verify lazy loading
- Acceptance: All images optimized

---

**TASK-104: Bundle Size Optimization**
- Priority: P1
- Phase: 5
- Time: 2hrs
- Steps:
  1. Analyze bundle with webpack-bundle-analyzer
  2. Remove unused dependencies
  3. Dynamic import heavy components
  4. Tree-shake Lucide icons
- Acceptance: Bundle size reduced by 20%+

---

**TASK-105: Lighthouse Audit (All Pages)**
- Priority: P0
- Phase: 5
- Time: 2hrs
- Test every page type:
  - Homepage, Course, About, Blog, Consulting, Dashboard
- Aim for 95+ on all metrics
- Fix any issues found
- Acceptance: All pages 95+ on all metrics

---

### 5.4 Launch Preparation

**TASK-106: Final Content Review**
- Priority: P0
- Phase: 5
- Time: 3hrs
- Replace all placeholders:
  - [PLACEHOLDER] text
  - Placeholder images
  - Lorem ipsum
  - Test data
- Acceptance: No placeholder content visible

---

**TASK-107: SEO Final Check**
- Priority: P0
- Phase: 5
- Time: 1.5hrs
- Verify:
  - All pages indexed
  - Sitemap submitted to Google Search Console
  - Internal linking optimized
  - Schema markup present
  - OG images generated
- Acceptance: SEO checklist complete

---

**TASK-108: Create Launch Checklist**
- Priority: P0
- Phase: 5
- Time: 1hr
- Document checklist:
  - [ ] Custom domain connected
  - [ ] SSL certificate active
  - [ ] All environment variables set
  - [ ] Analytics tracking
  - [ ] Email forms tested
  - [ ] Payment integration tested
  - [ ] 404 page works
  - [ ] Favicon present
  - [ ] robots.txt correct
  - [ ] Sitemap submitted
- Acceptance: Checklist complete, ready to launch

---

**TASK-109: Deploy to Production**
- Priority: P0
- Phase: 5
- Time: 1hr
- Dependencies: TASK-108
- Steps:
  1. Merge to main branch
  2. Vercel auto-deploys to chisokulab.com
  3. Verify all environment variables in production
  4. Test key user flows on production
  5. Monitor for errors (first 24 hours)
- Acceptance: Site live on chisokulab.com

---

**TASK-110: Post-Launch Monitoring**
- Priority: P0
- Phase: 5
- Time: Ongoing
- Monitor for 1 week:
  - Error logs (Vercel dashboard)
  - Analytics (traffic, conversions)
  - User feedback
  - Performance metrics
  - Uptime
- Acceptance: No critical issues

---

## Priority Legend

- **P0 (Critical):** Must have for launch, blocks other work
- **P1 (High):** Important for launch, should complete
- **P2 (Medium):** Nice to have, can defer to Phase 2+
- **P3 (Low):** Optional, future enhancement

---

## Estimated Timeline Summary

| Phase | Duration | Tasks | Key Deliverable |
|-------|----------|-------|-----------------|
| Phase 1 | 2 weeks | TASK-001 to TASK-045 | MVP: Homepage + Course page live |
| Phase 2 | 1 week | TASK-046 to TASK-063 | Full content: About, Blog, Consulting, Resources, FAQ, Contact |
| Phase 3 | 1 week | TASK-064 to TASK-077 | Conversion optimization: Testimonials, Gumroad embed, exit-intent, analytics |
| Phase 4 | 2 weeks | TASK-078 to TASK-098 | Course platform: Auth, dashboard, video player, progress tracking |
| Phase 5 | 1+ week | TASK-099 to TASK-110 | Polish & launch: Comments, search, final optimizations, production deploy |

**Total:** 7-8 weeks to fully functional platform

---

## Tips for Working with Cursor AI

1. **Start Each Session with Context:**
   - "We're building ChisokuLab website, currently on Phase X"
   - "Refer to PRD for design specs"
   - "Follow Zen-AI design language"

2. **Break Tasks Further If Stuck:**
   - If Cursor struggles with a 2hr task, split into 2x 1hr tasks
   - Example: "Create Course Preview Section" → "Create tabs" + "Create module accordions"

3. **Test Frequently:**
   - After every 3-5 tasks, run `npm run dev` and verify
   - Catch issues early before they compound

4. **Use Checkpoints:**
   - Commit to Git after each major task
   - Easy to rollback if something breaks

5. **Refer to Companion Docs:**
   - Brand Guidelines for colors/typography
   - Visual Design Language for animations/interactions
   - PRD for high-level specs

6. **When Cursor Gets Confused:**
   - Ask: "Read the Brand Guidelines document and tell me the primary color hex code"
   - Forces it to re-ground in project context

---

## Success Criteria (Overall)

✅ **Phase 1 Success:** Can share URL, collect emails, looks premium  
✅ **Phase 2 Success:** SEO traffic starting, credibility established  
✅ **Phase 3 Success:** 5%+ email conversion, analytics tracking  
✅ **Phase 4 Success:** Users can purchase, login, access course  
✅ **Phase 5 Success:** Polished, performant, ready for scale  

---

**End of Product Backlog**

*This backlog is designed to be followed sequentially by Cursor AI. Each task is sized for completion without getting stuck. Good luck with the build!* 🚀
