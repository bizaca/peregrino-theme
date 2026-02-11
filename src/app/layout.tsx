import { Suspense } from "react";
import dynamic from "next/dynamic";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2D2926",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://peregrinocoffee.cl"),
  title: {
    default: "Peregrino Coffee Roasters | Café de Especialidad",
    template: "%s | Peregrino Coffee",
  },
  description:
    "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Bolivia, Costa Rica y Brasil. Envíos a todo Chile.",
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
    title: "Peregrino Coffee Roasters | Café de Especialidad",
    description:
      "Tostadores de café de especialidad desde 2016. Granos frescos de Perú, Colombia, Bolivia, Costa Rica y Brasil.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peregrino Coffee Roasters",
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
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://v3b.fal.media" />
        <link rel="dns-prefetch" href="https://v3b.fal.media" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
          >
            Saltar al contenido
          </a>
          <ScrollProgress />
          <AnnouncementBar />
          <Suspense
            fallback={
              <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="w-6 h-6 md:hidden" />
                    <div className="flex flex-col items-center">
                      <span className="font-heading text-xl md:text-2xl font-bold text-dark tracking-wider">PEREGRINO</span>
                      <span className="text-[10px] md:text-xs text-text-secondary tracking-[0.3em] uppercase">Coffee Roasters</span>
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
