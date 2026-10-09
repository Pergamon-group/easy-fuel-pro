# Agent Handoff: EasyFuel Pro Modularization

**ATTENTION NEW AGENT INSTANCE:** 
If you are reading this, you are picking up a session that was paused to allow workspace boundary realignment. You MUST read this file and `docs/memory-resume.md` carefully. Do not start coding until you understand this context fully.

## 1. Project Goal
Convert the static prototype (`docs/stitch_easyfuel_pro_landing_page_15_20_08_10_2026/code.html`) into a production-grade, modular Next.js 15 App Router landing page for **EasyFuel Pro**.

## 2. Core Engineering Directives (CRITICAL)
- **Single-Point-of-Config (Top Priority):** The user demands that *everything* (theme tokens, socials, values, clients, images) be configurable from a single source of truth, modeled EXACTLY after their `pergamon-energy` repository. **Your first task is to read the config structure in `C:\Users\PERGAMON\WebStorm Projects\pergamon-energy` and replicate its architecture into `easy-fuel-pro/src/config/`.**
- **Test-Driven Development (TDD):** You MUST write tests for every component extracted. We are using Vitest + React Testing Library. `globals: true` is configured in `vitest.config.ts` to ensure automatic DOM teardown.
- **Tailwind CSS v4:** We are using native CSS variables via the `@theme` directive in `src/app/globals.css`. Do NOT use a legacy `tailwind.config.ts`.
- **Assets:** Use `next/image`. Assets have already been moved to `public/res`.
- **Communication Protocol:** If you encounter multiple valid architectural options, you MUST pause and ask the user using the structured Senior Engineer format. This is enforced by `.agents/rules/asking-questions.md`.

## 3. What Has Been Completed
- Next.js 15, TypeScript, Tailwind v4, and Vitest are installed and configured.
- `src/app/globals.css` is populated with the design system tokens.
- `src/app/layout.tsx` is wired with `Inter`, `Plus Jakarta Sans`, and `JetBrains Mono`.
- Extracted and tested components (wired in `page.tsx`):
  - `Header` (`src/components/layout/Header.tsx`)
  - `Hero` (`src/components/sections/Hero.tsx`)
  - `CtaBooking` (`src/components/sections/CtaBooking.tsx`) - Uses a Next.js Server Action (`src/app/actions/booking.ts`).
- An initial draft of `src/config/site.ts` was created, but it is waiting to be aligned with the `pergamon-energy` standard. All tests are currently passing.

## 4. Immediate Next Steps for the New Agent
1. **Analyze `pergamon-energy`:** Read the configuration files inside `C:\Users\PERGAMON\WebStorm Projects\pergamon-energy` to understand their single-point-of-config architecture.
2. **Refactor Config:** Update `easy-fuel-pro/src/config/site.ts` (or the folder structure) to perfectly mirror the energy project. Wire the existing `Header` and `Hero` components to use this config.
3. **Continue Extraction:** Extract the remaining sections from `docs/.../code.html` using TDD:
   - `FeatureGrid` (Integrated Forecourt Stack)
   - `WhyEasyFuel` (Problem vs Solution)
   - `Scalability` (Architectural Mode Switcher)
   - `ComplianceSpotlight` (eTIMS)
   - `ValueProps` (What Makes EasyFuel Pro Different)
   - `Footer`
   *(Note: It was agreed that telemetry data like '8,420 L' should remain as static marketing data for performance and SEO, not live APIs).*
