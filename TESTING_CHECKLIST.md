# ChisokuLab Website - Testing Checklist

## Phase 1 Testing & Polish

### TASK-040: Mobile Responsiveness Audit

#### Test Breakpoints:
- [ ] **375px (iPhone SE)** - Test all pages
  - [ ] Homepage renders correctly
  - [ ] Course page renders correctly
  - [ ] Consulting waitlist renders correctly
  - [ ] Navigation menu works
  - [ ] Forms are usable
  - [ ] No horizontal scrolling

- [ ] **768px (iPad Portrait)** - Test all pages
  - [ ] Layout adapts correctly
  - [ ] Cards stack properly
  - [ ] Text is readable

- [ ] **1024px (iPad Landscape)** - Test all pages
  - [ ] Grid layouts work
  - [ ] Navigation visible

- [ ] **1920px (Desktop)** - Test all pages
  - [ ] Full layout displays
  - [ ] Proper spacing maintained

#### Common Issues to Check:
- [ ] No overflow (horizontal scrolling)
- [ ] Text doesn't overflow containers
- [ ] Buttons are tappable (min 44x44px)
- [ ] Forms are accessible on mobile
- [ ] Images scale properly
- [ ] Navigation menu works on mobile

---

### TASK-041: Performance Optimization

#### Lighthouse Audit:
Run Lighthouse in Chrome DevTools for each page:
- [ ] Homepage: Score 90+ on all metrics
- [ ] Course page: Score 90+ on all metrics
- [ ] Consulting waitlist: Score 90+ on all metrics

#### Performance Checklist:
- [ ] Images optimized (WebP format where possible)
- [ ] Images have proper sizes attribute
- [ ] Below-fold components lazy loaded
- [ ] No unnecessary re-renders (check React DevTools)
- [ ] Bundle size optimized
- [ ] Fonts load efficiently (font-display: swap)
- [ ] CSS is minified
- [ ] JavaScript is code-split

#### Current Optimizations:
- ✅ Fonts use `display: swap`
- ✅ Reduced motion support
- ✅ Static page generation where possible
- ⚠️ Images need optimization (placeholder images currently)

---

### TASK-042: Accessibility Audit

#### Completed:
- ✅ Skip-to-content link added
- ✅ ARIA labels on decorative images
- ✅ Semantic HTML (header, main, footer, nav)
- ✅ Keyboard navigation support (all interactive elements focusable)
- ✅ Reduced motion support
- ✅ Form labels and error messages

#### To Test:
- [ ] **Keyboard Navigation**: Tab through all pages
  - [ ] All links focusable
  - [ ] All buttons focusable
  - [ ] Forms navigable with keyboard
  - [ ] Focus indicators visible
  - [ ] Skip link works

- [ ] **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
  - [ ] Page structure announced correctly
  - [ ] Images have alt text or aria-labels
  - [ ] Forms are announced properly
  - [ ] Navigation landmarks work

- [ ] **Color Contrast**: Check all text
  - [ ] White text on navy: Check contrast ratio
  - [ ] Gray text on white: Check contrast ratio
  - [ ] Cyan text: Check contrast ratio
  - [ ] All text meets WCAG AA (4.5:1) minimum

- [ ] **Lighthouse Accessibility Score**: Target 95+
  - [ ] Homepage accessibility score
  - [ ] Course page accessibility score
  - [ ] Consulting waitlist accessibility score

---

### TASK-043: Cross-Browser Testing

#### Browsers to Test:
- [ ] **Chrome (latest)**
- [ ] **Safari (latest)**
- [ ] **Firefox (latest)**
- [ ] **Edge (latest)**

#### What to Check:
- [ ] Layout renders identically
- [ ] Animations work smoothly
- [ ] Forms submit correctly
- [ ] Navigation works
- [ ] No console errors
- [ ] CSS features supported (grid, flexbox, etc.)

---

### TASK-044: Deploy to Vercel (Staging)

#### Steps:
1. [ ] Push all code to GitHub (main branch)
2. [ ] Go to https://vercel.com/new
3. [ ] Import GitHub repository: `agamag2424-creator/ChisokuLab-Website`
4. [ ] Configure project:
   - Framework Preset: Next.js
   - Root Directory: `chisokulab` (if needed)
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. [ ] Add Environment Variables:
   - `CONVERTKIT_API_KEY` (if available)
   - `CONVERTKIT_FORM_ID` (if available)
   - `NEXT_PUBLIC_SITE_URL` (staging URL)
6. [ ] Deploy
7. [ ] Test staging URL:
   - [ ] Homepage loads
   - [ ] Course page loads
   - [ ] Consulting waitlist loads
   - [ ] Forms work
   - [ ] All links work

---

### TASK-045: Phase 1 Final Review

#### Checklist:
- [ ] Homepage renders completely
- [ ] Course page renders completely
- [ ] Consulting waitlist page works
- [ ] Email forms submit successfully
- [ ] Mobile responsive (all breakpoints tested)
- [ ] Lighthouse score 90+ on all metrics
- [ ] No console errors
- [ ] All links work (internal and external)
- [ ] Animations smooth (60fps)
- [ ] Ready to share URL

#### Manual Testing:
- [ ] Test email form submission (homepage)
- [ ] Test waitlist form submission
- [ ] Test navigation links
- [ ] Test mobile menu
- [ ] Test accordion expand/collapse
- [ ] Test tab switching (course preview)
- [ ] Test scroll-to-pricing functionality

---

## Notes

- All code is committed and pushed to GitHub
- Build is successful
- Basic accessibility improvements implemented
- Performance optimizations can be enhanced with real images
- Cross-browser testing requires manual verification
- Vercel deployment requires account setup

