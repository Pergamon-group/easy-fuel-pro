# Workspace Memory & Next Steps

## Current State
- **Framework:** Next.js 15 App Router + TypeScript + Tailwind CSS v4.
- **TDD:** Vitest and React Testing Library configured (globals enabled). Tests are passing.
- **Completed Components:** `Header` and `Hero` are extracted and wired in `page.tsx`.
- **CTA & Action:** `CtaBooking` component extracted, wired with `actions/booking.ts` (Next.js Server Action).
- **Design Tokens:** `globals.css` populated with Tailwind v4 theme tokens from the design system. Fonts injected in `layout.tsx`.
- **Assets:** Downloaded from `docs/res` to `public/res`, components updated to use `next/image`.
- **Config:** Initiated `src/config/site.ts` to implement the "single-point-of-config" concept, mapping the Header and Hero static text.

## Shelved Actions
- Do not extract the remaining components (`FeatureGrid`, `WhyEasyFuel`, `Scalability`, `ComplianceSpotlight`, `ValueProps`, `Footer`) yet.
- Do not wire `site.ts` into the components yet.

## Next Step Trigger
- Wait for the user to provide access to the `pergamon-energy` repository's configuration files so we can align `src/config/site.ts` precisely with the established single-point-of-config architecture.
