# Arquitectura

Sitio estático de una página (más 404) construido con **Astro 7 + TypeScript**. Todo se renderiza en el build; solo el diagnóstico rápido se hidrata con React en el navegador. Las interacciones de puntero y scroll son CSS y scripts pequeños.

## Estructura

```
src/
  config/site.ts          Identidad, navegación, canales de contacto (lee variables de entorno)
  data/                   Contenido tipado: la única fuente de textos de negocio
    offerings.ts          Catálogo de soluciones del diagnóstico (nombre, resumen, disponibilidad;
                          priceFrom es referencia interna: ordena la ruta, no se publica)
    services.ts           Bandas de servicio: título, frase, tres etiquetas, arte y estado
    diagnosis.ts          Situaciones del diagnóstico y qué solución recomiendan
    process.ts, faq.ts    Método (cuatro pasos de una línea) y preguntas
  lib/                    Funciones puras, sin DOM ni framework (se usan en servidor y cliente)
    whatsapp.ts           Enlaces wa.me y composición de mensajes
    diagnosis.ts          Selección → ruta ordenada → mensaje
  styles/
    tokens.css            Tokens: paleta y roles por habitación, tipografía, espacio, radios, movimiento
    global.css            Reset, tipografía compartida, habitaciones, revelados y texto que rueda
  layouts/BaseLayout.astro  <head>, fuente, cabecera, pie, cursor y scripts compartidos
  components/
    layout/               Marco del sitio: SeoHead, SiteHeader (barra + menú <dialog>), SiteFooter,
                          Cursor, WhatsAppDock
    ui/                   Primitivas: Button (píldora con relleno, texto que rueda, magnetismo), Icon
    art/                  Arte de marca: BrandStage (escenario de la portada), ServiceArt (bandas)
    sections/             Una sección de la página por archivo
    islands/              React hidratado en el cliente: DiagnosisTool (+ hook useLeaderLines)
  scripts/
    reveal.ts             Marca `.is-in` en [data-reveal] al entrar en pantalla
    magnetic.ts           Desplazamiento magnético de [data-magnetic] hacia el puntero
  pages/                  index, 404 y robots.txt generado
scripts/generate-brand-assets.mjs  Derivados de marca (recortes, versiones claras, favicons, OG)
tests/site.spec.ts        Pruebas e2e con Playwright + axe
docs/research/            Análisis Taste de la referencia (cuberto.com)
```

## Flujo de datos

`data/*` → componentes. Ningún componente define textos de negocio propios. `lib/*` no importa componentes; `data/*` no importa `lib/*` (salvo tipos). `config/site.ts` solo depende de `lib/whatsapp.ts`. No hay dependencias circulares.

## Sistema visual en código

- **Habitaciones** (`global.css`): cada sección es `.room`; `.room--dark` (navy), `.room--blue` (azul eléctrico) y `.room--lift` (clara después de una oscura) entran con esquinas superiores amplias (`--radius-panel`) y se superponen a la anterior. La profundidad la da el cambio de superficie, no las sombras ni los bordes.
- **Tokens por rol**: los componentes usan `--surface-*` y `--text-*`, no colores de marca crudos. El arte SVG es la excepción: usa los hex de marca porque es ilustración.
- **Una familia**: Archivo variable (ancho 110 %, pesos 400–650); la jerarquía va por tamaño (`--step-*`).

## Movimiento e interacción

| Comportamiento | Implementación |
|---|---|
| Titulares que suben desde su máscara, bloques que aparecen | `[data-reveal="lines" \| "fade"]` + `scripts/reveal.ts` (IntersectionObserver) |
| Verbo rotativo del titular | Keyframes CSS en `Hero.astro` (texto completo para lectores de pantalla) |
| Escenario que crece, frase que se ilumina, trazo del método | CSS scroll-driven (`animation-timeline: view()`), con `@supports`; sin soporte se ve completo |
| Bandas de servicio que se expanden | `IntersectionObserver` en `Services.astro` + transición de `grid-template-rows` |
| Cursor propio, botones magnéticos, parallax del escenario | `Cursor.astro`, `scripts/magnetic.ts`, script de `BrandStage.astro` (solo puntero fino) |
| Menú | `<dialog>` nativo con `@starting-style` y cierre animado |
| Diagnóstico: estaciones y líneas guía | React + Motion (`LazyMotion`/`domAnimation`, `m.*`, `pathLength`), `client:idle` |

Regla: si un comportamiento cabe en CSS o en un script pequeño, no se usa React. Todo respeta `prefers-reduced-motion` (sin desplazamientos ni rotaciones; el contenido queda visible) y los efectos de puntero se limitan a `(hover: hover) and (pointer: fine)`.

## Convenciones

- **Visible por defecto**: los estados ocultos de entrada solo existen con `.js` y sin movimiento reducido. Un contenido nunca depende de una animación para verse.
- **Curvas**: `--ease-out` (expo) para entradas y respuestas, `--ease-in-out` para movimientos en pantalla, `--ease-panel` para expansiones. Hover en `--dur-hover`; presión en `--dur-press`.
- **Botones**: siempre `Button.astro` con `label` (el texto se duplica para el efecto de rodar). Variantes `primary`, `light` (sobre oscuro/azul), `ghost`.
- **Titulares en líneas**: cada `.line` lleva su texto con un espacio final si sigue otra línea, para que el texto accesible no quede pegado.
- **Sin antetítulos, sin texto con degradado, sin tarjetas con borde como estructura.**
- **Honestidad**: lo de etapas futuras se marca "En camino" y no tiene precio. La home no publica precios.
- **Alias**: `@/` apunta a `src/`.

## Cómo extender

- **Nueva página**: `src/pages/<ruta>.astro` con `BaseLayout` (título y descripción por props) y secciones `.room`.
- **Nuevo servicio**: una entrada en `data/services.ts` y, si necesita arte nuevo, una variante en `art/ServiceArt.astro`.
- **Nueva solución o situación del diagnóstico**: `data/offerings.ts` y `data/diagnosis.ts`. Ubica la situación según el `priceFrom` de su recomendación principal, para que las líneas guía no se crucen; la prueba e2e lo comprueba.
