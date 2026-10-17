# EasyFuel Pro — Site Survey & Forecourt Assessment Feature

This module provides an end-to-end, dual-mode site technical survey system allowing fuel station owners, retail operators, and oil marketing companies across East Africa to submit their technical forecourt specifications for PTS-2 automation and KRA eTIMS fiscalization.

---

## 1. Architecture Overview

### Dual-Mode Approach
1. **Interactive Online Wizard (`/site-survey`)**:
   - **Step 1: Business & Contact Info**: Customer entity name, station name, physical street address, county, valid KRA PIN format (`P...` corporate or `A...` individual), and direct contact details.
   - **Step 2: Preferred Scheduling**: 1 to 3 preferred audit dates, station operating hours (24h, shifts, or custom), and logistical access notes.
   - **Step 3: Station Setup & Infrastructure**: Current automation status, operating mode (Fully/Semi/Manual), vendor, and **Dynamic Multi-Pump & Multi-Nozzle Matrix** allowing stations with 1 to 24 pumps (and 1 to 8 nozzles per dispenser) to accurately map make/model, fuel grades (PMS, AGO, IK, LPG), meter types (electronic pulser vs mechanical), and pulse output availability.
   - **Step 4: Compliance & Connectivity**: eTIMS solution model (VSCU vs OSCU), integration method, POS software, receipt compliance checks, internet connection type (Fiber, 4G/5G, DSL), network redundancy, LAN infrastructure, and power backup.
   - **Step 5: Readiness & Review**: Civil works readiness (trenching, conduits, grounding), technician notes, private station photo uploads, summary review, and legal consent confirmation.
   - **On-Device Autosave / Autoresume**: Securely persists form drafts to browser `localStorage` with debouncing, prompting returning users if they wish to resume where they left off or start fresh.
   - **Contextual Educational Cards**: Expandable plain-language guidance cards explaining technical concepts (e.g., VSCU vs OSCU, pulse output, electronic pulsers) *before* technical questions.

2. **Offline Fillable PDF Download & Upload (`/site-survey/download`)**:
   - A professionally designed printable PDF checklist generated with `@react-pdf/renderer`.
   - Station owners can print the document, walk the forecourt with their technicians to fill it out by hand, and upload the completed scan or photos.
   - Files are validated, stored securely as private assets in ImageKit, and dispatched to engineering channels without fragile automated OCR.

---

## 2. Environment Variables & Credentials Setup

Create or update `.env.local` (or configure in your deployment dashboard e.g. Netlify/Vercel) with the following environment variables:

```bash
# ── cPanel Email / Nodemailer 10 SMTP Configuration ──────────────────────────
# Outgoing Mail Server (port 465 SSL or 587 STARTTLS)
SMTP_HOST=mail.pergamongroup.com
SMTP_PORT=465
SMTP_SECURE=true

# Authorized cPanel email account credentials
SMTP_USER=notifications@easyfuelpro.com
SMTP_PASS=your_cpanel_email_password_here

# Sender header
MAIL_FROM="EasyFuel Pro Notifications" <notifications@easyfuelpro.com>

# Destination email(s) for operations/sales leads (supports comma-separated list)
MAIL_TO=info@easyfuelpro.com, sales@pergamongroup.com, ops@pergamongroup.com

# Optional: set to false to disable automatic customer acknowledgment receipt
SEND_CUSTOMER_CONFIRMATION=true

# ── ImageKit Private File Storage ───────────────────────────────────────────
# Obtain from your ImageKit Developer Console
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# ── Supabase Persistence (Optional / Recommended) ───────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

---

## 3. Graceful Fallback Strategy

The backend services are engineered so that missing or pending environment variables **will never crash the user experience**:
- **Mail Service (`src/lib/mail.ts`)**: If SMTP credentials are not yet set, the submission payload and lead details are logged safely to the server console, and the client receives a success response.
- **ImageKit (`src/lib/imagekit.ts`)**: If ImageKit keys are not yet configured in local development, a safe mock asset ID and signed token URL are generated so the workflow executes seamlessly.
- **Supabase (`src/lib/supabase.ts`)**: If database credentials are not present, submissions are logged in memory with a generated reference tracking ID.

---

## 4. Database Schema (Supabase)

If using Supabase, create the `site_surveys` table using the following SQL migration:

```sql
create table if not exists public.site_surveys (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique,
  customer_name text not null,
  site_name text not null,
  contact_email text not null,
  contact_phone text not null,
  county text not null,
  status text not null default 'pending', -- 'pending', 'reviewed', 'scheduled', 'completed'
  submission_type text not null,         -- 'online_wizard', 'pdf_upload'
  form_data jsonb not null,
  imagekit_file_ids text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_site_surveys_reference on public.site_surveys(reference_code);
create index if not exists idx_site_surveys_created_at on public.site_surveys(created_at desc);
```

---

## 5. TDD Verification & Testing

Every layer of this feature is verified with strict unit and integration tests using Vitest:

| Test File | Covered Functionality |
|-----------|------------------------|
| `src/data/survey-schema.test.ts` | Schema defaults, KRA PIN regex, multi-pump validation, scheduling rules |
| `src/lib/mail.test.ts` | Nodemailer 10 SMTP config parsing, multi-recipient list, attachments |
| `src/lib/imagekit.test.ts` | Private upload helper, signed URLs, fallback handling |
| `src/lib/supabase.test.ts` | Survey and offline record transformations, repository fallback |
| `src/lib/pdf/pdf-generator.test.ts` | `@react-pdf/renderer` buffer generation and `%PDF` headers |
| `src/app/actions/booking.test.ts` | CTA booking action with real email dispatch |
| `src/app/actions/survey.test.ts` | 5-step survey submission, offline document upload |
| `src/components/survey/useAutoSave.test.ts` | `localStorage` debounced autosave and restore detection |
| `src/components/survey/InfoCard.test.tsx` | Educational guidance card expansion and accessibility |
| `src/components/survey/WizardStepper.test.tsx` | Visual stepper bar, percentage progress, step navigation |
| `src/components/survey/SiteSurveyWizard.test.tsx` | End-to-end wizard step gating, validation, and submission |

Run the test suite:
```bash
npm test
```
