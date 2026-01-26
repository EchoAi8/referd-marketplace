

# Fix Plan: Showcase Page GSAP Effects

## Overview
The Showcase page has multiple structural and implementation issues preventing the GSAP effects from working correctly. This plan addresses each effect systematically to create a fully functional showcase.

---

## Problem Analysis

### Root Causes
1. **InertiaPlugin** - GSAP Club plugin that fails silently on non-approved domains
2. **CSS Structure Issues** - Containers with zero dimensions, improper positioning
3. **Section Layout Breaks** - Horizontal scroll wrapper placed outside its section
4. **Z-Index Stacking** - Parallax layers not properly ordered
5. **Logo Wall Logic** - Initialization timing issues with DOM manipulation

---

## Implementation Plan

### Phase 1: Remove InertiaPlugin Dependency

**File:** `src/pages/Showcase.tsx`

**Changes:**
- Remove `InertiaPlugin` import and registration
- Replace inertia-based drag with manual momentum calculation using velocity tracking
- Use `power2.out` easing to simulate deceleration

```text
Before:
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(ScrollTrigger, Draggable, Observer, InertiaPlugin);

After:
// Remove InertiaPlugin entirely
gsap.registerPlugin(ScrollTrigger, Draggable, Observer);
```

---

### Phase 2: Fix 3D Carousel Structure

**Problem:** Container has `w-0 h-0`, panels have no reference point

**Solution:**
- Give the list container proper dimensions with `w-[420px] h-[560px]` (matching panel aspect ratio)
- Ensure `transformStyle: preserve-3d` propagates correctly
- Adjust Draggable to work without InertiaPlugin by calculating momentum manually

```text
Key Changes:
1. listRef container: w-[420px] h-[560px] instead of w-0 h-0
2. Remove inertia: true from Draggable config
3. Add manual velocity tracking in onDrag
4. Calculate throw distance based on velocity in onRelease
```

---

### Phase 3: Fix Horizontal Scroll Section

**Problem:** The wrapper `div` is outside the section, breaking flow

**Solution:**
- Move the horizontal scroll wrapper INSIDE the section
- Ensure proper height for pinning (the section should be `min-h-screen`)
- Fix the panel structure so they're direct children of the pinned wrapper

```text
Current (broken):
<section className="bg-foreground py-24">
  ... header content ...
</section>
<div ref={horizontalRef}> <!-- Outside section! -->
  ...panels...
</div>

Fixed:
<section className="bg-foreground">
  <div className="py-24 container">...header...</div>
  <div ref={horizontalRef} data-horizontal-scroll-wrap className="flex w-max">
    ...panels...
  </div>
</section>
```

---

### Phase 4: Fix Parallax Layers Z-Indexing

**Problem:** All layers use `absolute inset-0` without z-index, text may be hidden

**Solution:**
- Add explicit z-index to each layer (z-10, z-20, z-30, z-40)
- Ensure Layer 4 (text content) has highest z-index
- Keep `pointer-events-none` on text layer so underlying content remains interactive

```text
Layer 1 (blur background): z-10
Layer 2 (gradient cards):  z-20
Layer 3 (images):          z-30
Layer 4 (text):            z-40
```

---

### Phase 5: Fix Logo Wall Initialization

**Problem:** DOM manipulation happens immediately, may cause timing issues

**Solution:**
- Delay initialization using a `requestAnimationFrame` or small timeout
- Ensure pool is populated before timeline starts
- Add null checks for all DOM queries

```text
Key Fix:
requestAnimationFrame(() => {
  setup();
});
```

---

## Technical Details

### Draggable Without InertiaPlugin

Replace the inertia tracking with manual physics:

```typescript
let lastX = 0;
let velocity = 0;

Draggable.create(proxy, {
  trigger: wrap,
  type: "x",
  // Remove: inertia: true
  onPress() {
    velocity = 0;
    lastX = this.x;
  },
  onDrag() {
    velocity = this.x - lastX;
    lastX = this.x;
    spinRef.current!.progress(wrapProgress(startProg + (this.startX - this.x) / dragDistance));
  },
  onRelease() {
    // Simulate throw with calculated velocity
    const throwDistance = velocity * 15; // Adjust multiplier for feel
    gsap.to({}, {
      duration: 1.2,
      ease: "power2.out",
      onUpdate: function() {
        const progress = this.progress();
        const delta = throwDistance * (1 - progress) * 0.1;
        spinRef.current!.progress(wrapProgress(spinRef.current!.progress() - delta / dragDistance));
      }
    });
    gsap.to(spinRef.current, { timeScale: 1, duration: 0.5 });
  }
});
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Showcase.tsx` | Complete refactor of all 4 effects |

---

## Verification Steps

After implementation:
1. **3D Carousel**: Verify grab-and-spin works with momentum feel
2. **Parallax**: Scroll through section, confirm 4 layers move at different speeds
3. **Horizontal Scroll**: Confirm panels slide left as you scroll down
4. **Logo Wall**: Watch for logos swapping in/out with fade animations

---

## Summary

The page wasn't "falling apart" due to complexity - it had specific structural bugs that prevented GSAP from initializing correctly. The main culprit was the `InertiaPlugin` dependency which silently fails, and several CSS/layout issues that broke the GSAP triggers.

This fix will:
- Remove the problematic paid plugin dependency
- Fix container dimensions and positioning
- Correct section structure for ScrollTrigger
- Ensure proper z-index stacking
- Add timing safety for DOM manipulation

