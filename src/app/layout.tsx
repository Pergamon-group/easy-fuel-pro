import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyFuel Pro | Pergamon Group",
  description: "Smart Forecourt Management by Pergamon Group. eTIMS compliant and real-time.",
  authors: [
    {
      name: "Pergamon Group",
      url: "https://pergamongroup.com",
    },
    {
      name: "MURAGEH",
      url: "https://murageh.co.ke",
    }
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
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} font-body-md bg-background text-on-surface antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
