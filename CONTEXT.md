# Contexto del proyecto — Peregrino Coffee Roasters

## Que es este proyecto
Rediseno del sitio web de Peregrino Coffee Roasters (peregrinocoffee.cl).
La tienda real corre sobre Jumpseller. Este repo es el diseno nuevo construido en paralelo en Next.js + Vercel, SIN bajar la tienda activa.
Cuando el diseno este listo, se adaptara a Liquid (templates de Jumpseller) y se migrara.

## Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (motion/react)
- Vercel preview: https://peregrino-theme-pi.vercel.app/
- GitHub: https://github.com/bizaca/peregrino-theme

## Identidad visual
- Petrol blue: #0D2030 (color principal, navbar, footer, acentos)
- Crema: #F7F3EE (fondo base)
- Acento azul petróleo: var(--color-accent) → #005F73
- Tipografia display: Bricolage Grotesque
- Tipografia body: DM Sans

## Archivos clave de datos
- src/data/generated-images.ts  → todas las rutas de imagenes centralizadas
- src/data/products.ts          → datos de productos
- src/data/categories.ts        → categorias
- src/app/globals.css           → variables CSS y estilos globales
- src/components/               → todos los componentes

## Cambios ya realizados (sesion actual)
1. Imagenes de categorias reemplazadas con imagenes reales:
   - Granos      → /images/hero/peru-bambu.jpg
   - Accesorios  → /images/accessories/chemex-6-cups.png
   - Packs       → /images/packs/pack-6-variedades.png
   - Infusiones  → /images/infusiones/te-earl-grey-naranja.jpg
2. Imagen seccion Nuestra Historia → /images/hero/coffee-roastery.jpg
3. Imagen Newsletter → /images/hero/coffee-newsletter.jpg
4. Color AnnouncementBar cambiado de marron a petrol blue #0D2030 en globals.css

## Pendiente
- Revisar y mejorar paginas internas: Granos, Accesorios, Locales, Contacto
- Revisar version mobile
- Afinar detalles visuales
- Eventualmente adaptar a Liquid para migrar a Jumpseller

## Instrucciones de trabajo
- El dueno prefiere iterar rapido y corregir despues
- Siempre commit + push tras cada cambio para que Vercel deploje
- Comando: git add . && git commit -m descripcion && git push origin main
