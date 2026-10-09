export const siteConfig = {
  // ── Brand ─────────────────────────────────────────────────────────────────
  name: "EasyFuel Pro",
  tagline: "The Future of Smart Forecourt Management",
  description: "EasyFuel Pro is Pergamon Group’s smart fuel-station management solution, designed to streamline forecourt operations while providing real-time visibility of fuel sales, pump activity, and business performance.",
  url: "https://pergamongroup.com", // TODO: Update with real address before launch
  ogImage: "/res/filling-station-upperhill.jpg",
  logo: {
    src: "/res/EasyFuel_Pro logo_transparent_475.png",
    alt: "EasyFuel Pro Logo",
    width: 1680,
    height: 460,
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: "+254 111 050 950",
  phoneHref: "tel:+254111050950",
  whatsapp: "0112 817 917", // Display format
  whatsappHref: "https://wa.me/254112817917",
  email: "info@pergamongroup.com", // Placeholder
  website: "pergamongroup.com",

  // ── Navigation ────────────────────────────────────────────────────────────
  navLinks: [
    { label: "Solutions", href: "#solutions" },
    { label: "About & Partners", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  // ── Social Media Handles & Profiles ───────────────────────────────────────
  socials: {
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  },

  parentCompany: {
    name: "Pergamon Group",
    url: "https://pergamongroup.com",
    established: 2004,
  },

  // ── Hero Section (EasyFuel Specific) ──────────────────────────────────────
  hero: {
    badge: "EASYFUEL PRO • BY PERGAMON GROUP",
    subheadline: "Run your fuel station smarter, faster, and with greater control.",
    etimsNote: "With eTIMS-ready technology, EasyFuel Pro helps fuel stations manage their operations efficiently while staying compliant with Kenya’s digital tax requirements as enforced by the Kenya Revenue Authority (KRA).",
    primaryCta: { label: "Request a Demo", href: "#demo-section" },
    secondaryCta: { label: "Talk to Us", href: "https://wa.me/254112817917" },
    image: {
      src: "/res/filling-station-upperhill.jpg",
      alt: "Kenyan Fuel Forecourt",
      badge: "Nairobi Live Site",
    },
    liveMetrics: {
      stationName: "Station #002 Nairobi Hub",
      controllerId: "Pump Controller ID: EP-NRB-04",
      status: "Online & Active",
      metrics: [
        { label: "Daily Flow", value: "8,420 L" },
        { label: "eTIMS Status", value: "Connected", icon: "check_circle", highlight: true },
        { label: "Active Nozzles", value: "8/8" },
      ]
    }
  },

  // ── Features Grid (Integrated Forecourt Stack) ────────────────────────────
  featuresGrid: {
    badge: "Integrated Forecourt Stack",
    headline: "ONE PLATFORM. COMPLETE FORECOURT CONTROL.",
    description: "EasyFuel Pro brings your key forecourt operations together in one intelligent platform.",
    features: [
      {
        icon: "local_gas_station",
        title: "Pump Management",
        description: "Monitor fuel dispensing and pump activity from a centralized system.",
        visual: { type: "flow" }
      },
      {
        icon: "monitoring",
        title: "Real-Time Dashboard",
        description: "Get instant visibility into sales, transactions, and station performance.",
        visual: { type: "sparkline", value: "1,840 Litres" }
      },
      {
        icon: "receipt_long",
        title: "eTIMS Ready",
        description: "Support your station’s digital invoicing and tax compliance requirements.",
        visual: { type: "badge", label: "KRA CU QR SIGNED" }
      },
      {
        icon: "payments",
        title: "Sales Management",
        description: "Track fuel sales accurately and improve control over daily transactions.",
        visual: { type: "splits" }
      },
      {
        icon: "insights",
        title: "Business Insights",
        description: "Access meaningful reports and data to understand your station’s performance.",
        visual: { type: "audit", label: "Automated Shift End Audit" }
      },
      {
        icon: "security",
        title: "Better Operational Control",
        description: "Improve accountability and visibility across your forecourt operations.",
        visual: { type: "lock", label: "Supervisor Dip Reconciled" }
      }
    ]
  },

  // ── Why EasyFuel Pro (Problem vs Solution) ────────────────────────────────
  whyEasyFuel: {
    badge: "The Forecourt Challenge",
    headline: "WHY EASYFUEL PRO?",
    subheadline: "Stop Managing Your Station in the Dark.",
    description: "Traditional fuel-station operations can make it difficult to keep track of sales, pump activity, inventory, and overall performance. EasyFuel Pro gives you the visibility you need, when you need it.",
    benefitsLabel: "With EasyFuel Pro, you can:",
    benefits: [
      "Monitor your forecourt in real time",
      "Centralize station operations",
      "Track fuel sales and transactions",
      "Access operational reports",
      "Improve accountability",
      "Support eTIMS requirements",
      "Make data-driven business decisions"
    ],
    comparison: {
      legacy: {
        title: "Legacy Fuel Stations",
        description: "Legacy fuel stations rely on fragmented manual logs, which leaves room for discrepancies and compliance audits.",
        points: [
          { title: "Manual Dips", desc: "High margin for human measurement error and tank fraud." },
          { title: "Paper Receipts", desc: "Slow checkout, missing records, manual book entry." },
          { title: "Unverified Invoices", desc: "Risk of severe KRA penalties due to delayed fiscalization." },
          { title: "Leakage & Variance Risks", desc: "Unmonitored fuel losses during shift transitions." }
        ]
      },
      modern: {
        title: "EasyFuel Pro Forecourt",
        description: "EasyFuel Pro delivers an automated digital architecture built for absolute operational transparency.",
        points: [
          { title: "Automated KRA eTIMS", desc: "Direct pump-to-tax server handshake with live QR transmission." },
          { title: "Live Pump Telemetry", desc: "Immediate nozzle flow rates and instant digital transaction capture." },
          { title: "0% Variance Reconciliations", desc: "Automated shift end reports matching totalizer meters with sales." },
          { title: "Instant Mobile Dashboards", desc: "View your forecourt from anywhere on your smartphone or desktop." }
        ]
      }
    }
  },

  // ── Scalability (Architectural Mode Switcher) ─────────────────────────────
  scalability: {
    badge: "Scalable Architecture",
    headline: "BUILT FOR MODERN FUEL STATIONS",
    description: "Whether you operate one station or multiple locations, EasyFuel Pro gives you the technology to manage your forecourt with greater visibility and control.",
    quote: "“Smart technology for a more efficient and profitable future.”",
    modes: [
      {
        icon: "store",
        title: "Single Independent Station Mode",
        subtitle: "Autonomous forecourt execution",
        badge: { label: "EDGE CONTROLLER", type: "primary" },
        description: "EasyFuel Pro provides direct dispenser connectivity via a local Forecourt Controller. It features complete POS integration, instant shift cash drops, nozzle-by-nozzle totalizer reconciliation, and local offline transaction buffering.",
        metrics: [
          { label: "Local Pump Latency", value: "< 150 ms" },
          { label: "Offline Buffer Capacity", value: "50,000+ Txns" }
        ]
      },
      {
        icon: "hub",
        title: "Multi-Station Central HQ Fleet View",
        subtitle: "Enterprise network synchronization",
        badge: { label: "ENTERPRISE CLOUD", type: "secondary" },
        description: "You get aggregated real-time metrics across Nairobi, Mombasa, Eldoret, Kisii, and cross-border transit corridors. Enjoy unified price-change propagation, centralized fuel supplier deliveries, and regional fleet card authorization.",
        metrics: [
          { label: "Network Fuel Stock", value: "1.2M Litres" },
          { label: "Price Sync Speed", value: "Instant 1-Click" }
        ]
      }
    ]
  },

  // ── Compliance Spotlight (eTIMS) ──────────────────────────────────────────
  compliance: {
    badge: "KRA COMPLIANCE READY",
    headline: "Stay Ready. Stay Compliant.",
    description: "EasyFuel Pro is eTIMS-ready, helping fuel stations integrate digital tax invoicing into their operations. Don’t wait until compliance becomes a problem. Equip your station with a smarter way to manage fuel sales and digital invoicing.",
    features: [
      {
        icon: "fingerprint",
        title: "Automated Fiscal Signature",
        description: "Generates direct digital signatures automatically, without any manual attendant intervention."
      },
      {
        icon: "receipt",
        title: "Instant KRA Receipts",
        description: "Prints KRA-validated QR codes directly onto pump-side thermal till receipts."
      },
      {
        icon: "cloud_sync",
        title: "Seamless Offline Buffering",
        description: "Auto-syncs stored records as soon as internet connectivity returns."
      },
      {
        icon: "gavel",
        title: "Zero Penalty Assurance",
        description: "Eliminates tax audits and compliance fines with automated background filing."
      }
    ],
    receipt: {
      header: "KENYA REVENUE AUTHORITY",
      subheader: "eTIMS Electronic Fiscal Receipt",
      cuSerial: "KRAPE091104820",
      invoiceNo: "INV-2025-09841",
      product: "PMS - SUPER",
      volume: "35.40 LITRES",
      total: "7,327.80",
      status: "STATUS: FISCALIZED & VALIDATED"
    }
  },

  // ── Value Propositions (What Makes EasyFuel Pro Different?) ───────────────
  valueProps: {
    badge: "The Strategic Advantage",
    headline: "WHAT MAKES EASYFUEL PRO DIFFERENT?",
    description: "EasyFuel Pro is engineered specifically for the East African commercial fuel landscape by industry pioneers.",
    pillars: [
      {
        icon: "visibility",
        title: "Real-Time Visibility",
        description: "Know what is happening at your station as it happens."
      },
      {
        icon: "account_tree",
        title: "Centralized Management",
        description: "Bring essential forecourt operations together in one platform."
      },
      {
        icon: "query_stats",
        title: "Smarter Reporting",
        description: "Turn station data into useful business insights."
      },
      {
        icon: "verified_user",
        title: "eTIMS Ready",
        description: "Support your digital invoicing and tax compliance requirements."
      },
      {
        icon: "trending_up",
        title: "Scalable Solution",
        description: "Designed to support growing fuel-station businesses and multiple locations."
      },
      {
        icon: "devices",
        title: "Integrated Technology",
        description: "Connect your forecourt operations with the technology your business needs."
      }
    ]
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    description: "Pergamon Group provides modern technology for a more profitable future. EasyFuel Pro delivers fuel retail automation, real-time tank telemetry, and seamless fiscal compliance across East Africa.",
    certifications: [
      "Certified KRA eTIMS Integrated Protocol"
    ],
    hubsLabel: "Regional Network Operations",
    hubs: [
      { name: "Nairobi Headquarters", desc: "Lonrho House, 6th Floor\nStandard Street, CBD" },
      { name: "Coast Regional Hub", desc: "Mombasa Office\nMaritime & Transit Corridor" },
      { name: "North Rift Hub", desc: "Eldoret Operations\nDepot Integration Center" },
      { name: "Western & South Nyanza", desc: "Kisii Center\nRetail Forecourt Services" }
    ],
    contactLabel: "Direct Dispatch & Channels",
    quickNavLabel: "Quick Navigation",
    quickNav: [
      { label: "Platform", href: "#solutions" },
      { label: "Compliance", href: "#etims-compliance" },
      { label: "Forecourt Hardware", href: "#about" },
      { label: "Support", href: "#contact" }
    ],
    copyright: "© 2025 EasyFuel Pro by Pergamon Group. All rights reserved. Industrial automation and forecourt telemetry systems.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "eTIMS Architecture SLA", href: "#" }
    ]
  }
} as const;

export type SiteConfig = typeof siteConfig;
