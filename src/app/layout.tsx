import { Suspense } from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import "./globals.css";

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

export const metadata: Metadata = {
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
      <body className="antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
          >
            Saltar al contenido
          </a>
          <AnnouncementBar />
          <Suspense>
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
