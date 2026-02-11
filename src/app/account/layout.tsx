import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi Cuenta",
  description: "Gestiona tu cuenta, pedidos y preferencias en Peregrino Coffee.",
  alternates: { canonical: "/account" },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
