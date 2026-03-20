import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const CartDrawer = dynamic(() => import("@/components/CartDrawer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D2030",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://peregrinocoffee.cl"),
  title: {
    default: "Peregrino Coffee Roasters | Café de Especialidad",
    template: "%s | Peregrino Coffee",
  },
  description:
    "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Costa Rica y Brasil. Envíos a todo Chile.",
  keywords: [
    "café especialidad",
    "coffee roasters",
    "café Chile",
    "granos café",
    "Peregrino Coffee",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Peregrino Coffee Roasters",
    description:
      "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Costa Rica y Brasil.",
    images: [
      {
        url: "/logo-peregrino.jpg",
        width: 1200,
        height: 630,
        alt: "Peregrino Coffee Roasters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@peregrinocoffee",
    description:
      "Café de especialidad tostado semanalmente con granos de Latinoamérica.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${syne.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://v3b.fal.media" />
        <link rel="dns-prefetch" href="https://v3b.fal.media" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
          >
            Saltar al contenido
          </a>
          <ScrollProgress />
          <AnnouncementBar />
          <Suspense
            fallback={
              <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border-light" role="status" aria-label="Cargando navegación">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="w-6 h-6 md:hidden" />
                    <div className="flex flex-col items-center">
                      <span className="font-heading text-xl md:text-2xl font-bold text-dark tracking-wider">PEREGRINO</span>
                      <span className="text-xs text-text-secondary tracking-[0.3em] uppercase">Coffee Roasters</span>
                    </div>
                    <div className="w-10 h-10" />
                  </div>
                </div>
              </header>
            }
          >
            <Header />
          </Suspense>
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
          <BackToTop />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
