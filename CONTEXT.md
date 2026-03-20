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

## TAREA PRINCIPAL PENDIENTE
Implementar la estetica del archivo peregrino_v6_1.html en el repo Next.js.
Este HTML es la version mas refinada del diseno y tiene:

### Identidad visual v6
- Nav: fondo petrol blue oscuro #0D2030 sticky, links crema rgba(244,238,228,0.65)
- Hero: imagen pantalla completa 88vh + overlay gradiente + badge del cafe del mes (esquina derecha)
- Ticker animado horizontal con puntos dorados separadores
- Grid de productos con flip de imagen al hover (pimg-front / pimg-back)
- Cards con: origen, nombre, notas de cata, specs (proceso/acidez), precio, boton
- Colores: --bg #F7F3EE, --bg2 #EDE7DE, --card #E4DDD4, --accent #8B6914, --accent2 #B8912A
- Tipografia: Syne (headings) + Outfit (body)
- Botones: btn-primary (dorado solido) + btn-secondary (outline crema)
- Seccion split 50/50 con imagen izquierda y texto derecha
- Footer oscuro petrol blue

### Componentes a actualizar/crear en orden
1. globals.css — actualizar variables CSS a la paleta v6 (Syne + Outfit, colores)
2. Header.tsx — nav oscuro sticky, links crema, boton carro dorado
3. HeroCarousel.tsx — hero pantalla completa con overlay + badge lateral del cafe del mes
4. TrustBadges.tsx — convertir a ticker animado horizontal
5. FeaturedProducts.tsx + ProductCard.tsx — cards con flip de imagen al hover
6. AnnouncementBar.tsx — barra petrol blue (ya esta bien)
7. Footer.tsx — footer oscuro
8. AboutSection.tsx — layout split 50/50

### Archivos clave
- src/data/generated-images.ts — rutas de imagenes
- src/data/products.ts — datos de productos
- src/data/categories.ts — categorias
- src/app/globals.css — variables CSS y estilos globales
- src/components/ — todos los componentes

## Cambios ya realizados antes de esta tarea
1. Imagenes de categorias reemplazadas con imagenes reales propias del repo
2. Imagen Nuestra Historia -> coffee-roastery.jpg
3. Imagen Newsletter -> coffee-newsletter.jpg
4. AnnouncementBar ya en petrol blue

## Instrucciones de trabajo
- No preguntes, toma decisiones y avanza
- Siempre commit + push tras cada cambio para que Vercel deploje
- git add . && git commit -m descripcion && git push origin main
- El dueno prefiere iterar rapido y corregir despues
