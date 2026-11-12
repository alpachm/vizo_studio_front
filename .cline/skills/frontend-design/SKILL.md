---
name: frontend-design
description: High-craft editorial UI design system for React, TypeScript, and Tailwind CSS. Automatically activate when creating or refactoring pages, sections, layouts, cards, or visual components to prevent generic AI aesthetics.
---

# Vizo Studio — Editorial & High-Craft UI Design

## 1. Anti-Generic AI Rules (Strict Prohibitions)
- **NO AI Clichés:** Never use default purple/cyan gradients, glowing neon drop-shadows, or generic floating 3D blobs.
- **NO Symmetrical Boring Grids:** Avoid repetitive 3-column symmetrical cards with a centered icon on top. Use asymmetric Bento grids, editorial split-layouts, or structured bordered lists (like Swiss/linear design systems).
- **NO Visual Clutter:** Let negative space (`py-24`, `gap-12`) do the work. Use hairline borders (`border-white/10`) instead of heavy background fills to separate sections.

## 2. Typography & Hierarchy
- **Display Headings:** Use tight letter-spacing (`tracking-tight` or `tracking-tighter`), tight line-height (`leading-[1.1]`), and bold contrast (`text-white`).
- **Body Copy:** Use generous line-height (`leading-relaxed`), constrained measure (`max-w-prose`), and muted neutral tones (`text-neutral-400`) to establish clear hierarchy against headings.
- **Micro-labels & Eyebrows:** Use uppercase, wide tracking (`tracking-widest text-xs uppercase font-medium`), and subtle accent colors for category tags or step numbers.

## 3. Surfaces, Depth & Color Discipline
- **Color Budget:** Stick strictly to 1 dark base background, 1 subtle elevated surface (`bg-neutral-900/40` with `backdrop-blur-sm`), 1 crisp border color (`border-white/10`), and 1 primary brand accent color used sparingly (max 10% of the viewport) for primary CTAs and key highlights.
- **Interactive States:** Every clickable element must have a crisp, intentional hover state (e.g., border brightening from `border-white/10` to `border-white/25`, subtle surface shift, or directional arrow translation).

## 4. Component Architecture
- Write clean, modular React + TypeScript components with semantic HTML (`<section>`, `<article>`, `<header>`).
- Ensure mobile-first responsiveness where multi-column desktop grids collapse gracefully without losing visual hierarchy.