# Partner & Client Brand Logos Directory

Place partner and client logo images (`.png`, `.svg`, `.webp`) in this folder.

### How to Install a Logo for Any Partner:

1. Copy your logo asset into this directory:
   `public/logos/<partner_name>.png` (or `.svg`, `.webp`)

2. Open [`src/config/site.ts`](file:///c:/Users/PERGAMON/WebStorm%20Projects/easy-fuel-pro/src/config/site.ts) and locate `siteConfig.partners.networksCategory.items` or `hardwareCategory.items`.

3. Add `logoSrc` (and optional `logoBg` for dark/white contrast):

```ts
{
  name: "Rubis Energy",
  subtitle: "East Africa",
  icon: "speed",
  iconBg: "bg-primary/10",
  iconColor: "text-primary",
  logoSrc: "/logos/rubis.png", // <── Automatically replaces the fallback icon
  logoBg: "light",             // 'light' (default) or 'dark' (e.g. for white logos)
}
```

### Automatic Visual Treatments:
- **Fallback**: If `logoSrc` is omitted, the component automatically renders the Material Symbol icon seamlessly.
- **Grayscale Filter**: Logos automatically apply `grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300` matching enterprise design standards.
- **Background Contrast**: If `logoBg: "dark"` is set, a dark contrasting container (`bg-[#111827]`) is applied automatically for white/light-colored logos.
