import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline} | ${siteConfig.parentCompany.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
    },
    {
      name: "MURAGEH",
      url: "https://murageh.co.ke",
    },
  ],
  creator: siteConfig.parentCompany.name,
  publisher: siteConfig.parentCompany.name,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logos.landscape,
        width: 1920,
        height: 1080,
        alt: `${siteConfig.name} by ${siteConfig.parentCompany.name}`,
        type: "image/jpeg",
      },
      {
        url: siteConfig.logos.square,
        width: 779,
        height: 767,
        alt: `${siteConfig.name} Icon`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.logos.landscape],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Corporation"],
      "@id": `${siteConfig.parentCompany.url}/#organization`,
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
      logo: `${siteConfig.url}/res/pergamon-group-logo.png`,
      foundingDate: String(siteConfig.parentCompany.established),
      sameAs: [siteConfig.parentCompany.url],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: ["KE", "TZ", "RW", "UG"],
        availableLanguage: ["en", "sw"],
      },
    },
    {
      "@type": ["SoftwareApplication", "Product"],
      "@id": `${siteConfig.url}/#software`,
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      url: siteConfig.url,
      image: `${siteConfig.url}${siteConfig.logos.landscape}`,
      description: siteConfig.description,
      creator: {
        "@id": `${siteConfig.parentCompany.url}/#organization`,
      },
      publisher: {
        "@id": `${siteConfig.parentCompany.url}/#organization`,
      },
      provider: {
        "@id": `${siteConfig.parentCompany.url}/#organization`,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        description: "Request a custom forecourt automation demo and quotation",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: {
        "@id": `${siteConfig.parentCompany.url}/#organization`,
      },
      inLanguage: "en-KE",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} font-body-md bg-background text-on-surface antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
