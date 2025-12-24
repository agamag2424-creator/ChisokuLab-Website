# Prompt Amplifier - Manual Testing Guide

## Quick Test Checklist

### 1. Basic Functionality (5 minutes)

**Test 1: Tool Loading**
1. Navigate to `/resources` page
2. Scroll to "Prompt Amplifier" section
3. ✅ Verify tool loads without errors
4. ✅ Verify initial state (empty input, placeholder text visible)

**Test 2: Simple Amplification**
1. Enter text: "create a mobile app"
2. Click "Amplify Prompt" button
3. ✅ Verify loading state appears
4. ✅ Verify output appears after processing
5. ✅ Verify source indicator shows (Groq/Template)
6. ✅ Verify output is readable and formatted

**Test 3: Copy Functionality**
1. After amplification, locate copy button (top-right of output)
2. Click copy button
3. ✅ Verify button shows "Copied!" state
4. ✅ Verify text is copied to clipboard (paste somewhere to verify)

**Test 4: Clear Functionality**
1. Click "Clear All" button
2. ✅ Verify input is cleared
3. ✅ Verify output is cleared
4. ✅ Verify source indicator disappears

### 2. Clarifying Questions (5 minutes)

**Test 5: Vague Input Detection**
1. Enter vague text: "help me"
2. Click "Amplify Prompt"
3. ✅ Verify clarifying questions modal appears
4. ✅ Verify modal has proper styling
5. ✅ Verify first input is focused

**Test 6: Answer Questions**
1. Fill in at least one question
2. Click "Continue with Answers"
3. ✅ Verify modal closes
4. ✅ Verify amplification proceeds
5. ✅ Verify context box appears with answers

**Test 7: Skip Questions**
1. Enter vague text again
2. When modal appears, click "Skip Questions"
3. ✅ Verify modal closes
4. ✅ Verify amplification proceeds without answers

**Test 8: Esc Key**
1. Enter vague text
2. When modal appears, press Esc key
3. ✅ Verify modal closes
4. ✅ Verify amplification proceeds

### 3. Keyboard Shortcuts (2 minutes)

**Test 9: Cmd/Ctrl+Enter**
1. Enter some text in input field
2. Press Cmd+Enter (Mac) or Ctrl+Enter (Windows)
3. ✅ Verify amplification starts
4. ✅ Verify works when input has focus

### 4. Error Handling (3 minutes)

**Test 10: Empty Input**
1. Try to click "Amplify" with empty input
2. ✅ Verify button is disabled
3. ✅ Verify no API call is made

**Test 11: Long Input**
1. Enter text longer than 2000 characters
2. ✅ Verify character counter shows 2000/2000
3. ✅ Verify input is truncated at 2000 characters

### 5. Responsive Design (5 minutes)

**Test 12: Mobile View (< 768px)**
1. Open browser DevTools
2. Set viewport to mobile (e.g., iPhone 12 Pro - 390x844)
3. Navigate to `/resources`
4. ✅ Verify grid stacks vertically (single column)
5. ✅ Verify text is readable
6. ✅ Verify buttons are appropriately sized
7. ✅ Verify modal is responsive and scrollable
8. ✅ Verify no horizontal scrolling

**Test 13: Tablet View (768px - 1024px)**
1. Set viewport to tablet (e.g., iPad - 768x1024)
2. ✅ Verify layout adapts appropriately
3. ✅ Verify components are properly sized
4. ✅ Verify modal displays correctly

**Test 14: Desktop View (> 1024px)**
1. Set viewport to desktop (e.g., 1920x1080)
2. ✅ Verify two-column layout displays
3. ✅ Verify components are properly spaced
4. ✅ Verify modal is centered

### 6. Accessibility (5 minutes)

**Test 15: Keyboard Navigation**
1. Tab through all interactive elements
2. ✅ Verify focus is visible on all elements
3. ✅ Verify tab order is logical
4. ✅ Verify Enter key activates buttons
5. ✅ Verify Esc key closes modal

**Test 16: Screen Reader (if available)**
1. Enable screen reader (VoiceOver on Mac, NVDA/JAWS on Windows)
2. Navigate through the tool
3. ✅ Verify labels are announced
4. ✅ Verify descriptions are announced
5. ✅ Verify status updates are announced (copy, loading)

**Test 17: ARIA Attributes**
1. Inspect elements in DevTools
2. ✅ Verify role="region" on input section
3. ✅ Verify aria-label on input section
4. ✅ Verify aria-describedby on textarea
5. ✅ Verify aria-live on character counter
6. ✅ Verify role="dialog" on modal
7. ✅ Verify aria-modal="true" on modal

### 7. Console Check (1 minute)

**Test 18: No Errors**
1. Open browser DevTools Console
2. Perform a few amplifications
3. ✅ Verify no JavaScript errors
4. ✅ Verify no React warnings
5. ✅ Verify only expected API warnings (Gemini quota)

---

## Expected Results Summary

### ✅ Should Work
- All basic functionality
- Copy and clear buttons
- Clarifying questions modal
- Keyboard shortcuts
- Responsive layout
- Accessibility features
- Error handling

### ⚠️ Expected Behavior
- Gemini API may show quota exceeded (falls back to Groq)
- Groq API should work as primary when Gemini unavailable
- Template fallback works when both APIs unavailable

### ❌ Should Not Happen
- JavaScript errors
- Layout breaking on mobile
- Overlapping elements
- Missing accessibility labels
- Broken keyboard navigation

---

## Quick Test Script (Copy to Console)

```javascript
// Quick automated checks
const tests = {
  toolExists: () => document.querySelector('[aria-label="Prompt input section"]') !== null,
  inputExists: () => document.getElementById('prompt-input') !== null,
  buttonExists: () => document.querySelector('button:contains("Amplify")') !== null,
  copyButtonExists: () => document.querySelector('[aria-label*="Copy"]') !== null,
};

Object.entries(tests).forEach(([name, test]) => {
  console.log(`${name}: ${test() ? '✅' : '❌'}`);
});
```

---

## Reporting Issues

If you find issues, note:
1. **Browser and version**
2. **Viewport size**
3. **Steps to reproduce**
4. **Expected vs actual behavior**
5. **Console errors (if any)**
6. **Screenshots (if helpful)**

