# EasyFuel Pro: Web Application

Official landing page and digital lead generation platform for **EasyFuel Pro** (a division of **Pergamon Group Ltd**), the ultimate smart fuel-station management and eTIMS compliance solution. Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Vitest**.

---

## Quick Start

### 1. Install Dependencies

```bash
# Using pnpm (default for Netlify / CI deployments):
pnpm install

# Or using npm:
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Copy `.env.example` to `.env.local` and fill in any required credentials:

```bash
cp .env.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Lead Generation & CRM Integration

The website captures demo requests and enquiries through the `CtaBooking` form, processing the submission via Next.js Server Actions.

### Architecture Overview

```text
Customer Submits Form
         │
         ▼
[components/sections/CtaBooking.tsx]
         │  Server Action POST
         ▼
[app/actions/booking.ts]
         │  Validates input (name, business, pumps, phone, location)
         ▼
    CRM Integration / Email Dispatch
```

*(Note: Currently configured for simulated latency. Pending configuration and connection to CRM or SMTP provider once launched).*

---

## Single-Point-of-Config Architecture

To ensure consistency and ease of maintenance, the entire application's data, copy, and structural logic are controlled centrally.

Edit `src/config/site.ts` to seamlessly update:

- **Brand Information** (Logo, Tagline, Description)
- **Live Metrics & Stats**
- **Feature Pillars & Value Propositions**
- **Hardware Integrations** (Scalability Matrix)
- **Contact Channels & Footer Navigation**

---

## Testing & Quality Assurance

This project strictly follows TDD methodologies. Every modular component is covered by comprehensive unit tests.

Run the test suite:

```bash
# Run unit tests (Vitest)
npm test

# Run tests in UI mode
npm run test:ui

# TypeScript type check
npx tsc --noEmit
```
