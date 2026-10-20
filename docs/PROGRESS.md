# Avance — sitio oficial de LUJEN

Estado: **primera versión funcional** (octubre de 2026).

## Cómo ejecutar

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check + build estático en dist/
npm run preview    # sirve dist/
npm test           # Playwright (requiere build previo)
npm run brand      # regenera recortes de marca, favicons e imagen OG
```

Variables de entorno (copiar `.env.example` a `.env`):

- `PUBLIC_WHATSAPP_NUMBER`: número comercial, solo dígitos con indicativo (p. ej. `57…`). **Pendiente.** Sin él, los enlaces abren WhatsApp con el mensaje listo y el visitante elige el contacto.
- `SITE_URL`: dominio público. **Provisional:** `https://lujen.co`.

Para las pruebas con un Chromium ya instalado: `PW_CHROMIUM_PATH=<ruta a chrome> npm test` (si no, `npx playwright install chromium`).

## Qué se construyó

Una página principal y una 404, con este recorrido:

1. **Portada (lámina 00)**: titular "Tu negocio ya funciona. Ahora, pongámoslo en orden." con una cota que mide el eslogan, CTA a WhatsApp, y la **escalera de servicios** (Web → Datos → Organización → Automatización → IA) dibujada con línea continua para lo disponible hoy y punteada para lo proyectado.
2. **Diagnóstico rápido** (interacción insignia): el visitante marca situaciones de su negocio; se traza la ruta recomendada con precio "desde" y se compone un mensaje de WhatsApp listo para enviar.
3. **Servicios**: tres láminas técnicas apiladas (página web, QR de reseñas, Excel y datos), cada una con problema, qué incluye, opciones con precio de referencia, dibujo SVG propio y cajetín. Al final, lo proyectado (Power BI, WhatsApp + CRM, IA) en línea punteada y sin precio.
4. **Cómo trabajamos**: única sección oscura, impresa como cianotipo; cuatro pasos y un escenario ilustrativo rotulado como tal.
5. **Precios de referencia**: cuadro de cantidades con soluciones disponibles y acompañamiento mensual opcional.
6. **Preguntas frecuentes** con `<details>` nativo.
7. **Contacto**: WhatsApp directo y formulario que compone el mensaje (no guarda datos).
8. **Pie como cajetín de plano**, botón flotante de WhatsApp en móvil.

## Decisiones importantes

- **Dirección creativa: el plano técnico.** El sitio se presenta como el plano de obra de un negocio: diagnóstico dibujado antes de construir. Papel claro con retícula, tinta Deep Navy, trazos Electric Blue, cotas y marcadores Bright Cyan. La sección oscura se justifica como cianotipo, el plano impreso.
- **Honestidad como sistema visual**: línea continua = disponible; punteada = proyectado. El catálogo (`src/data/offerings.ts`) obliga a que lo proyectado no tenga precio.
- **Tipografía**: Archivo variable con ancho expandido para los titulares (eco del logotipo) y Martian Mono solo para rótulos de medida. Ambas autoalojadas con Fontsource.
- **Islas**: solo el diagnóstico usa React + Motion (`client:idle`). Menú, formulario y botón flotante son scripts pequeños; los trazados son CSS + IntersectionObserver.
- **Datos centralizados**: precios, servicios, escalera, diagnóstico, proceso y preguntas viven en `src/data/` y alimentan todos los componentes.
- **Marca**: los originales en `public/brand/` se mantienen intactos; `npm run brand` genera recortes (nombre sin eslogan para la cabecera, logotipo completo para el pie), favicons e imagen Open Graph.

Más detalle técnico en [ARCHITECTURE.md](ARCHITECTURE.md). El sistema visual (tokens, reglas y componentes) está documentado en [DESIGN.md](../DESIGN.md).

## Iteración 2 — rediseño (referencia: Cuberto)

**Qué cambió.** Se reemplazó el mundo de «plano técnico» (cuadrícula, cotas, cajas, bordes, monoespaciada) por un minimalismo expresivo:
- Habitaciones que se alternan: claras, navy y un momento azul eléctrico a sangre. Los paneles entran con esquinas amplias superpuestos a la sección anterior, y el cierre lleva el resplandor de la N.
- Una sola familia (Archivo); la jerarquía va por tamaño. Mucho menos texto.
- Portada con titular cinético (el verbo rota: Digitaliza, Organiza, Automatiza) y un escenario navy con el isotipo real y objetos de servicio que flotan, siguen al puntero y crecen con el scroll.
- Frase de declaración que se ilumina palabra por palabra con el scroll.
- Servicios rediseñados como bandas que entran plegadas y se expanden y oscurecen al llegar, cada una con su arte. La cuarta banda, «Automatización e IA», va marcada «En camino».
- Método en cuatro pasos de una línea sobre azul, con un trazo que se dibuja con el scroll.
- Se eliminó la sección de precios: la home invita a pedir una propuesta y una pregunta frecuente explica cómo se cotiza.
- Interacciones: cursor propio con mezcla «difference», botones píldora con relleno que sube, texto que rueda y efecto magnético, menú en <dialog> con entrada animada.
- Imagen para redes y logotipos claros para fondos oscuros, generados por .

**Qué se conservó.** El diagnóstico «¿Dónde se te está escapando el negocio?», con su lógica, las líneas guía y la lista fija. Ahora va sobre panel navy, sin precios y con lo futuro como «En camino». También la arquitectura de datos, el formulario que abre WhatsApp, las pruebas y los recursos de marca.

**Cómo se verificó.**
-  y  sin errores.
- Playwright: 23 pruebas aprobadas y 3 omitidas por dispositivo. Incluye bandas que se abren al hacer scroll y al recibir foco, «En camino», el diagnóstico, el formulario, el menú, la 404 y axe.
- Capturas y fotogramas de scroll a 1440 y 390 px.
- Estudio de la referencia en .

**Problemas resueltos en esta iteración:**
- El minificador fusionaba  dentro del atajo  y rompía en producción las tres animaciones ligadas al scroll. Ahora van en reglas separadas.
- Los titulares partidos en líneas se leían pegados para lectores de pantalla.
- El efecto magnético se retroalimentaba.
- La mezcla del cursor no invertía lo que había debajo.
- El  tapaba el botón de cierre.
- Error «_jsxDEV» en desarrollo por dependencias pre-empaquetadas.

**Pendiente de esta iteración:**
- Revisión final independiente sobre las capturas corregidas: la primera pidió recapturar.
- Regenerar DESIGN.md para la v2; el actual describe la v1.
- Sigue pendiente lo de la v1: número de WhatsApp, dominio y confirmación de servicios.

## Verificaciones ejecutadas (v1)

- `astro check`: 0 errores, 0 advertencias.
- `npm run build`: correcto (2 páginas, sitemap, robots.txt, imágenes optimizadas a WebP).
- Playwright (`tests/site.spec.ts`), escritorio 1440 y móvil Pixel 7: **19 pruebas aprobadas** (3 omitidas por ser exclusivas de un tipo de dispositivo): carga sin errores de consola, sin desbordamiento horizontal, anclas válidas, metadatos SEO, accesibilidad con axe (sin violaciones graves ni críticas WCAG A/AA), flujo del diagnóstico, líneas guía sin cruces, soluciones proyectadas sin precio, validación y composición del formulario, menú móvil (abrir, navegar, Escape devuelve foco), 404.
- Capturas revisadas a 390, 768, 1280 y 1440 px y con `prefers-reduced-motion: reduce`.
- Contrastes calculados: texto secundario 8,4:1 y 5,4:1; botón primario 4,6:1; textos del cianotipo 8,9:1.
- Detector de Impeccable: solo avisos sobre fondos de retícula (intencionales en esta dirección); se eliminó uno redundante.

## Problemas resueltos

- Estaciones de la escalera desalineadas por reparto de espacio en la cuadrícula → `align-content: start`.
- Leyenda de la escalera superpuesta a los botones → reubicada.
- Doble espaciado entre portada y diagnóstico.
- Contenido de la hoja de ruta que dependía de la animación para verse → ahora siempre visible.
- Nombres de archivo recortados en el dibujo de Excel; rótulos SVG demasiado pequeños en móvil.
- `layout` de Motion sin efecto con `domAnimation` → eliminado.
- Apilado fijo de láminas solo en pantallas altas, para que ninguna quede cortada.
- Error de desarrollo «Outdated Optimize Dep» al hidratar la isla → dependencias declaradas en `vite.optimizeDeps`.
- Clics en el diagnóstico antes de la hidratación se perdían (visto como prueba intermitente) → la isla pasa a `client:idle` y las pruebas esperan la hidratación.

### Revisión final de diseño (revisor independiente)

La revisión devolvió «fix» con seis correcciones, todas aplicadas:

1. Se eliminaron los antetítulos sobre encabezados (escalera, hoja de ruta, escenario, pasos del diagnóstico); la línea y el estado pasan debajo.
2. La portada móvil conserva el plano: escuadras de esquina, cajetín al pie y la cota del eslogan bajo el titular.
3. El diagnóstico dibuja líneas guía animadas desde cada situación marcada hasta el paso que la resuelve (`useLeaderLines.ts`); en todos los anchos cada paso indica qué situaciones responde. En una segunda ronda: las situaciones se ordenaron según la inversión de su solución principal, para que las líneas nunca se crucen (lo verifica una prueba), y la lista queda fija al hacer scroll para que no quede espacio muerto.
4. Un solo lenguaje de lámina: esquinas rectas (`--radius-sheet`), sombra de papel ajustada y marcas de corte (`.sheet-trim`).
5. Interlineado de los nombres de la hoja de ruta.
6. La leyenda de precios ahora es una muestra del tinte de las filas resaltadas, no un cuadro que parecía casilla.

## Pendiente

- **Número de WhatsApp y dominio definitivos** (`.env`).
- **Precios y paquetes**: son la propuesta abierta de PRODUCT.md, mostrados como "desde" y orientativos; confirmar entre socios. Los paquetes (Presencia, Negocio, Crecimiento, Inteligente) no se publicaron porque su contenido no está definido.
- **Disponibilidad de "Página con sistema"**: se muestra como disponible; confirmar si pertenece a la etapa actual.
- Política de tratamiento de datos (Ley 1581) si en el futuro el formulario guarda información; hoy no guarda nada.
- Redes sociales, correo y ubicación de la empresa (no hay datos).
- Cuando existan casos reales, reemplazar el escenario ilustrativo de `src/data/process.ts`.
- Los originales de `public/brand/` (≈1,2 MB) se publican tal cual; moverlos fuera de `public/` si no se quieren descargables.
