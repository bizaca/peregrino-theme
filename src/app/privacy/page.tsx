import type { Metadata } from "next";
import PrivacyContent from "@/components/PrivacyContent";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad y protección de datos personales de Peregrino Coffee Roasters.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
