---
name: motion-choreography
description: Professional physics-based animations, scroll reveals, and micro-interactions for React and Tailwind CSS. Automatically activate when adding animations, transitions, hover effects, or interactive states.
---

# Vizo Studio — Motion & Micro-Interaction Choreography

## 1. Core Animation Principles
- **Purposeful Motion:** Never animate just for decoration. Motion must guide attention, confirm user action, or establish spatial hierarchy.
- **Performance First:** Animate ONLY GPU-composited properties (`transform`, `opacity`, `clip-path`). Never animate layout properties like `width`, `height`, `top`, `left`, or `margin`.
- **Accessibility:** Always respect `prefers-reduced-motion`.

## 2. Timing, Easing & Physics
- **Ban Linear Easing:** Never use `linear` or default `ease` for UI transitions.
- **Editorial Entrance Curve:** For smooth reveals and modals, use an exponential ease-out cubic-bezier: `[0.22, 1, 0.36, 1]` (or Tailwind `ease-[cubic-bezier(0.22,1,0.36,1)]`) with durations between `0.5s` and `0.7s`.
- **Tactile Micro-interactions:** For buttons, toggles, and hover feedback, use snappy transitions (`duration-200` or spring physics: `stiffness: 400, damping: 30`).

## 3. Choreography & Sequencing
- **Staggered Reveals:** When rendering lists, grids, or process steps, never fade them all in simultaneously. Stagger their entrance by `60ms` to `80ms` (`0.06s - 0.08s`) per item so the eye naturally scans the sequence.
- **Scroll Viewport Triggers:** Trigger scroll animations once (`once: true`) when the element enters `15% - 20%` of the viewport (`amount: 0.2`) so content never feels delayed or invisible while scrolling fast.
- **Subtle Spatial Travel:** Keep entrance translations subtle (`y: 16px` to `24px` max). Large distances (`y: 100px`) feel amateurish and sluggish.

## 4. Implementation Flexibility
- If `motion` (or `framer-motion`) is installed in `package.json`, use `motion/react` (`<motion.div>`, `whileInView`, `AnimatePresence`).
- If no animation library is installed, achieve identical high-craft results using pure Tailwind CSS transitions, custom `@keyframes`, and lightweight `IntersectionObserver` hooks without adding unnecessary dependencies.