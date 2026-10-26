export interface PartnerItem {
  name: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  logoSrc?: string;
  logoBg?: 'light' | 'dark';
}

export const siteConfig = {
  // ── Brand ─────────────────────────────────────────────────────────────────
  name: "EasyFuel Pro",
  tagline: "The Future of Smart Forecourt Management",
  description: "EasyFuel Pro is Pergamon Group’s smart fuel-station management solution, designed to streamline forecourt operations while providing real-time visibility of fuel sales, pump activity, and business performance.",
  url: "https://easyfuelpro.com",
  website: "easyfuelpro.com",
  ogImage: "/res/EasyFuel Pro logo.jpg",
  ogImageSquare: "/res/Logo 1.png",
  etimsIntegrator: {
    src: "/images/etims-integrator-logo.png",
    alt: "ETIMS Ready Logo",
    width: 325,
    height: 225,
  },
  logo: {
    src: "/res/EasyFuel_Pro logo_transparent_475.png",
    alt: "EasyFuel Pro Logo",
    width: 1680,
    height: 460,
  },
  logos: {
    landscape: "/res/EasyFuel Pro logo.jpg",
    landscapeTransparent: "/res/EasyFuel Pro logo_transparent.png",
    square: "/res/Logo 1.png",
    squareTransparent: "/res/Logo 1_transparent.png",
    parentCompany: "/res/pergamon-group-logo.png",
  },
  keywords: [
    "EasyFuel Pro",
    "Pergamon Group",
    "smart forecourt management",
    "eTIMS fuel station Kenya",
    "fuel station automation",
    "forecourt controller",
    "pump telemetry",
    "petrol station POS Kenya",
    "automated fiscal receipting",
    "KRA eTIMS compliant fuel POS",
    "fuel inventory and tank monitoring",
    "retail petroleum management East Africa",
  ],

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: "+254 111 050 950",
  phoneHref: "tel:+254111050950",
  whatsapp: "+254 112 817 917", // Display format
  whatsappHref: "https://wa.me/254112817917",
  email: "info@pergamongroup.com", // Main business dispatch
  websiteDomain: "easyfuelpro.com",

  // ── Navigation ────────────────────────────────────────────────────────────
  navLinks: [
    // { label: "Partners", href: "/#about" },
    { label: "Architecture", href: "/#architecture" },
    { label: "Solutions", href: "/#solutions" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Site Survey", href: "/site-survey" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
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
    logo: "/res/pergamon-group-logo.png",
    established: 2004,
  },

  // ── Hero Section (EasyFuel Specific) ──────────────────────────────────────
  hero: {
    badge: "EASYFUEL PRO • BY PERGAMON GROUP",
    subheadline: "Run your fuel station smarter, faster, and with greater control.",
    etimsNote: "With eTIMS-ready technology, EasyFuel Pro helps fuel stations manage their operations efficiently while staying compliant with Kenya’s digital tax requirements as enforced by the Kenya Revenue Authority (KRA).",
    primaryCta: { label: "Request a Demo", href: "#demo-form" },
    secondaryCta: { label: "Talk to Us", href: "https://wa.me/254111050950" },
    image: {
      // src: "/res/filling-station-upperhill.jpg",
      src: "/res/easy-fuel-pro-station.png",
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

  // ── Proven Forecourt Adoption (Partners & Fuel Networks) ───────────────────
  partners: {
    badge: "TRUSTED ACROSS AFRICA",
    headline: "TRUSTED BY THE CONTINENT'S FUEL NETWORKS",
    description: "Pergamon Group's Easy Fuel Pro solution powers forecourts across the continent with mission-critical intelligence and automation.",
    networksCategory: {
      title: "Retail Petroleum Networks & Oil Marketing Companies",
      items: [
        {
          name: "National Oil",
          subtitle: "Corporation of Kenya",
          icon: "local_gas_station",
          iconBg: "bg-[#006591]/10",
          iconColor: "text-[#006591]",
          logoSrc: "/logos/national-oil.jpg",
          logoBg: "light",
        },
        {
          name: "Lake Oil",
          subtitle: "Lake Group Retail",
          icon: "water_drop",
          iconBg: "bg-error/10",
          iconColor: "text-error",
          logoSrc: "/logos/lake-group.jpg",
          logoBg: "light",
        },
        {
          name: "Rubis Energy",
          subtitle: "East Africa",
          icon: "speed",
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          logoSrc: "/logos/rubis-energie.jpg",
          logoBg: "light",
        },
        {
          name: "TotalEnergies",
          subtitle: "Network Stations",
          icon: "energy_savings_leaf",
          iconBg: "bg-surface-container",
          iconColor: "text-on-surface",
          logoSrc: "/logos/total-energies.png",
          logoBg: "light",
        },
        {
          name: "Hass Petroleum",
          subtitle: "Regional Corridor",
          icon: "local_shipping",
          iconBg: "bg-primary-container/15",
          iconColor: "text-primary",
          logoSrc: "/logos/hass-petroleum.webp",
          logoBg: "light",
        },
        {
          name: "Ola Energy",
          subtitle: "Forecourt Fleet",
          icon: "oil_barrel",
          iconBg: "bg-surface-container",
          iconColor: "text-on-surface-variant",
          logoSrc: "/logos/ola-energy.avif",
          logoBg: "light",
        },
        {
          name: "Shell Dealers",
          subtitle: "Authorized Franchise",
          icon: "store",
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          logoSrc: "/logos/shell-energy.avif",
          logoBg: "light",
        },
        {
          name: "Vivo Energy",
          subtitle: "Commercial Retail",
          icon: "hub",
          iconBg: "bg-surface-container",
          iconColor: "text-on-surface",
          logoSrc: "/logos/vivo-energy.png",
          logoBg: "light",
        },
      ],
    },
    hardwareCategory: {
      title: "Forecourt Controllers, Dispensers & ATG Certified Partners",
      items: [
        {
          name: "PTS-2 Controller",
          subtitle: "50 Pumps & 50 ATGs",
          icon: "developer_board",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "EasyFuel Pro Fiscal Device",
          subtitle: "KRA-Approved Fiscal Device e.g. Incotex",
          icon: "fingerprint",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Gilbarco Veeder-Root",
          subtitle: "Dispensers & ATG Probes",
          icon: "precision_manufacturing",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Wayne Fueling",
          subtitle: "Dover Fueling Solutions",
          icon: "settings_input_component",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Tokheim",
          subtitle: "Dispenser Protocols",
          icon: "ev_station",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Tatsuno",
          subtitle: "Japan & Europe Dispensers",
          icon: "local_gas_station",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Franklin Fueling",
          subtitle: "ATG & Submersible Probes",
          icon: "sensors",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "OPW",
          subtitle: "SiteSentinel ATG Systems",
          icon: "water_drop",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
        {
          name: "Bennett",
          subtitle: "Hydraulic Dispensers",
          icon: "build",
          iconBg: "bg-surface-container",
          iconColor: "text-primary",
        },
      ],
    },
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
    // subheadline: "Stop Managing Your Station in the Dark.",
    subheadline: "No more guesswork.\nYou make better decisions.",
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
        title: "Traditional Fuel Stations",
        description: "Traditional fuel-station operations rely on fragmented manual logs, which often leave room for discrepancies and compliance audits.",
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
    // badge: "Scalable Architecture",
    badge: "Ready to scale with you",
    headline: "WE ARE BUILT FOR MODERN FUEL STATIONS",
    description: "Whether you operate one station or multiple locations, EasyFuel Pro gives you the technology to manage your forecourt with greater visibility and control.",
    quote: "“Smart technology for a more efficient and profitable future.”",
    modes: [
      {
        icon: "store",
        title: "Single Independent Station Mode",
        subtitle: "Autonomous forecourt intelligence",
        badge: { label: "EDGE CONTROLLER", type: "primary" },
        description: "Connect your dispensers and automatic tank gauges directly through a dedicated Forecourt Controller. Your attendants benefit from simplified POS operations, clean shift handovers, automatic nozzle totalizer matching, and local offline transaction buffering.",
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
        description: "Gain a unified, real-time overview of your fuel stock, sales, and pump status across Nairobi, Mombasa, Eldoret, Kisii, and regional transit corridors. Update fuel prices across every site with one click, monitor supplier deliveries, and manage fleet customer cards from a single screen.",
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
      { name: "Nairobi HQ & Showroom", desc: "Springette Office Park, Spring Valley , Lower Kabete Road, Block B1\nShowroom: Lonrho House, Standard St, Email: info@pergamongroup.com\nPhone: +254 111 050 950, Whatsapp: +254 112 817 917" },
      { name: "Kenya Branches", desc: "Eldoret: Laneen Centre, Utalii St, Opposite Sirikwa Hotel\nKisii: Magsons Plaza: Off Hospital Rd\nMombasa: Digo Rd, 3rd Floor\nEmail: info@pergamongroup.com" },
      { name: "Tanzania (Dar es Salaam)", desc: "Misasani, Mikocheni A, Old Bagamoyo Rd, PLOT 101\nTel: +255 22 277 5626, Mobile: +255 782 572 670, +255 716 684 002,\n\Email: info@pergamontz.com" },
      { name: "Rwanda (Kigali)", desc: "Nobiscum House, 1st Floor, Remera Kisimenti\nTel: +250 786 381 374, +250 786 654 154, Email: info.rwanda@pergamongroup.com" }
    ],
    contactLabel: "Direct Dispatch & Channels",
    quickNavLabel: "Quick Navigation",
    quickNav: [
      { label: "Platform", href: "/#solutions" },
      { label: "Architecture", href: "/#architecture" },
      { label: "Compliance", href: "/#etims-compliance" },
      { label: "Forecourt Hardware", href: "/#about" },
      { label: "Site Survey", href: "/site-survey" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" }
    ],
    copyright: "© 2025 EasyFuel Pro by Pergamon Group. All rights reserved. Industrial automation and forecourt telemetry systems.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "eTIMS Architecture SLA", href: "/#architecture" }
    ]
  }
} as const;

export type SiteConfig = typeof siteConfig;
