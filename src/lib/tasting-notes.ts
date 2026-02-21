import type { LucideIcon } from "lucide-react";
import {
  Droplet,
  Citrus,
  Cherry,
  Cookie,
  Candy,
  Nut,
  Flower2,
  Wheat,
  Leaf,
  Scale,
  Flame,
  CircleDot,
  Sparkles,
  Heart,
  Coffee,
} from "lucide-react";

interface TastingNoteKeyword {
  keywords: string[];
  icon: LucideIcon;
  category: string;
}

const keywordMap: TastingNoteKeyword[] = [
  { keywords: ["miel"], icon: Droplet, category: "dulce" },
  { keywords: ["naranja", "mandarina", "cítric", "citric"], icon: Citrus, category: "frutal" },
  { keywords: ["frutos rojos", "frutas", "durazno", "tropical"], icon: Cherry, category: "frutal" },
  { keywords: ["chocolate", "cacao", "bitter"], icon: Cookie, category: "tostado" },
  { keywords: ["caramelo"], icon: Candy, category: "dulce" },
  { keywords: ["nuez", "almendra"], icon: Nut, category: "fruto seco" },
  { keywords: ["flores", "floral"], icon: Flower2, category: "floral" },
  { keywords: ["panela"], icon: Wheat, category: "dulce" },
  { keywords: ["tabaco"], icon: Leaf, category: "terroso" },
  { keywords: ["equilibrado"], icon: Scale, category: "perfil" },
  { keywords: ["intenso", "tostado"], icon: Flame, category: "tostado" },
  { keywords: ["cuerpo"], icon: CircleDot, category: "cuerpo" },
  { keywords: ["acidez"], icon: Sparkles, category: "acidez" },
  { keywords: ["dulce"], icon: Heart, category: "dulce" },
];

export interface ParsedTastingNote {
  label: string;
  icon: LucideIcon;
  category: string;
}

export function parseTastingNotes(notes: string): ParsedTastingNote[] {
  if (!notes.trim()) return [];

  return notes.split(",").map((raw) => {
    const label = raw.trim();
    const lower = label.toLowerCase();

    const match = keywordMap.find((entry) =>
      entry.keywords.some((kw) => lower.includes(kw))
    );

    return {
      label,
      icon: match?.icon ?? Coffee,
      category: match?.category ?? "general",
    };
  });
}
