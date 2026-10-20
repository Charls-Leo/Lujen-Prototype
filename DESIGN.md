---
name: LUJEN Desarrolladores
description: El plano de obra de un negocio, dibujado antes de construir.
colors:
  deep-navy: "#081a3a"
  midnight: "#0d2d8f"
  electric: "#176bff"
  cyan: "#26c6ff"
  soft-white: "#f6f8fc"
  paper-raised: "#ffffff"
  paper-sunken: "#edf1f9"
  ink-soft: "#3c4a66"
  ink-muted: "#5a6680"
  blueprint-ink: "#e9f0ff"
  blueprint-ink-soft: "#a9bbe0"
  danger: "#b0302a"
  on-action: "#ffffff"
  grid-minor: "rgb(13 45 143 / 0.055)"
  grid-major: "rgb(13 45 143 / 0.09)"
  rule: "rgb(8 26 58 / 0.14)"
  rule-strong: "rgb(8 26 58 / 0.42)"
  ghost-ink: "rgb(8 26 58 / 0.34)"
  blueprint-rule: "rgb(38 198 255 / 0.22)"
  blueprint-grid: "rgb(38 198 255 / 0.07)"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 1.35rem + 4.9vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "font-stretch 118%"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 1.45rem + 2.4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "font-stretch 118%"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontVariation: "font-stretch 118%"
  title-sm:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "font-stretch 108%"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "'Archivo Variable', 'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "'Martian Mono Variable', 'Martian Mono', ui-monospace, 'Cascadia Mono', monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.06em"
    fontFeature: "tnum"
    fontVariation: "font-stretch 87.5%"
rounded:
  sheet: "2px"
  s: "6px"
  m: "10px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  section: "clamp(4.5rem, 2.75rem + 6vw, 8rem)"
  gutter: "clamp(1rem, 0.4rem + 2.6vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.electric}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.m}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.on-action}"
  button-secondary:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.m}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-quiet:
    textColor: "{colors.midnight}"
    padding: "0.25rem 0"
  sheet:
    backgroundColor: "{colors.paper-raised}"
    rounded: "{rounded.sheet}"
    padding: "3rem"
  input-field:
    backgroundColor: "{colors.soft-white}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.m}"
    padding: "0.75rem 1rem"
  symptom-option:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.deep-navy}"
    rounded: "{rounded.m}"
    padding: "0.75rem 1rem 0.75rem 0.75rem"
  callout-marker:
    textColor: "{colors.ink-soft}"
    rounded: "50%"
    size: "2rem"
  whatsapp-dock:
    backgroundColor: "{colors.electric}"
    textColor: "{colors.on-action}"
    rounded: "{rounded.pill}"
    height: "3.25rem"
---

# Design System: LUJEN Desarrolladores

## Overview

**Creative North Star: "La lámina de obra"**

El sitio es una lámina de dibujo técnico: papel Soft White con retícula Midnight tenue, tinta Deep Navy para el texto, trazo Electric Blue para lo que existe y cotas Bright Cyan para lo que se mide. Cada superficie se comporta como un pliego impreso: marco, marcas de corte, cajetín, cuadro de cantidades y llamadas de detalle numeradas con su línea guía. Nada es decorativo por sí mismo; cada línea dice algo sobre el estado de lo que dibuja.

La densidad es la de un plano: mucha información ordenada en celdas con filetes finos, aire generoso entre secciones y una sola tipografía de texto (Archivo) que se ensancha y engorda para los titulares, eco del logotipo. La medida y la referencia se rotulan en Martian Mono, pequeña, en mayúsculas y con cifras tabulares. La profundidad es la del papel sobre la mesa: sombras cortas y suaves, esquinas casi rectas.

El ritmo de la página es papel claro de principio a fin, con una única excepción en cianotipo (Deep Navy con retícula cian) para el proceso de trabajo. El movimiento es de dibujo: los trazos se trazan al entrar en pantalla y todo se ve completo si el script no corre o el usuario prefiere menos movimiento.

**Key Characteristics:**
- Papel cuadriculado (24px menor, 120px mayor) como fondo de toda la página.
- Línea continua = disponible hoy; línea punteada = proyectado.
- Láminas casi rectas (2px) con marcas de corte en las esquinas; controles con el redondeo del logotipo (6px y 10px).
- Display Archivo expandido (118%) y pesado (800); Martian Mono solo para medidas, referencias y valores.
- Una sola sección oscura: el cianotipo de "Cómo trabajamos".
- Llamadas de detalle (círculo numerado) unidas por líneas guía cian al elemento que explican.

## Colors

Una paleta de plano técnico: papel frío, tinta azul marino casi negra y dos azules de trazo, uno para la línea y otro para la cota.

### Primary
- **Azul Eléctrico de Trazo** (electric): acción primaria (botones, envío del diagnóstico, dock de WhatsApp), trazo principal de los dibujos, estado marcado de las opciones y anillo de foco. Es el color de lo que se puede hacer hoy.
- **Azul Medianoche** (midnight): estado hover de la acción primaria, enlaces y cifras de precio. También tiñe la retícula del papel en baja opacidad.

### Secondary
- **Cian de Cota** (cyan): cotas, líneas guía del diagnóstico, subrayado de navegación que se extiende desde el centro, halo del primer paso recomendado y marcadores encendidos del cianotipo. Nunca rellena superficies ni lleva texto largo sobre papel.

### Neutral
- **Papel Soft White** (soft-white): fondo de página y de campos de formulario.
- **Papel Alzado** (paper-raised): láminas, tablas, cajetines y controles secundarios que se apoyan sobre el papel.
- **Papel Hundido** (paper-sunken): cabeceras de tabla, vista previa del mensaje, carril de la barra de desplazamiento.
- **Tinta Deep Navy** (deep-navy): texto principal, trazo de línea de los dibujos y fondo del cianotipo.
- **Tinta Suave** (ink-soft, 8.4:1 sobre papel): ledes, resúmenes y texto secundario.
- **Tinta Apagada** (ink-muted, 5.4:1 sobre papel): rótulos, referencias, notas y placeholders.
- **Filete** (rule) y **Filete Fuerte** (rule-strong): divisiones internas y bordes de lámina, respectivamente; el filete fuerte también dibuja las marcas de corte.
- **Tinta Fantasma** (ghost-ink): trazos y marcadores de lo proyectado o aún sin trazar: tramos y estaciones punteadas, marcadores de la hoja de ruta, trazado vacío del diagnóstico y trazo suave de los dibujos.
- **Tinta de Cianotipo** (blueprint-ink, blueprint-ink-soft, blueprint-rule, blueprint-grid): los mismos roles invertidos, solo dentro de la sección cianotipo (blueprint-ink-soft, 8.9:1 sobre Deep Navy).
- **Rojo de Error** (danger, 6:1 sobre papel): solo validación de campos, con su anillo danger-ring.

### Named Rules
**The Línea Firme Rule.** Lo disponible se dibuja con línea continua y trazo Electric; lo proyectado, con línea punteada en Tinta Fantasma y texto en ink-soft o ink-muted. Esta distinción se mantiene en escalera, diagnóstico, hoja de ruta y bordes: nunca se usa punteado como adorno.

**The Una Sola Noche Rule.** El cianotipo (Deep Navy con retícula cian a 24px) aparece una vez por página y solo para el proceso de trabajo. Todo lo demás es papel claro.

**The Cota No Rellena Rule.** El cian mide y señala (líneas de 1.5px, puntos, halos); no es fondo de superficie ni color de texto corrido sobre papel.

## Typography

**Display Font:** Archivo Variable (con Archivo, system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Archivo Variable, la misma familia en ancho normal
**Label/Mono Font:** Martian Mono Variable (con Martian Mono, ui-monospace, Cascadia Mono, monospace)

**Character:** Una grotesca que se expande y engorda para los titulares, como el logotipo, y vuelve a ancho normal para leer; al lado, una mono estrecha y menuda que rotula como una regla de dibujante.

### Hierarchy
- **Display** (800, step-4, 0.98, ancho 118 %, -0.035em): solo el titular del hero. La palabra medida se pinta en Electric y lleva su cota debajo.
- **Headline** (800, step-3, 1.04, ancho 118 %, -0.03em): títulos de sección, máximo 20ch.
- **Title** (800, step-2, 1.08, ancho 118 %, -0.025em): títulos de lámina de servicio; con 1.1 y -0.02em para pasos del proceso, hoja de ruta y bloque de mensualidades.
- **Title pequeño** (700–750, step-1, 1.2, ancho 108 %): títulos de panel, nombres de paso en el diagnóstico, preguntas frecuentes, nombres de solución.
- **Lede** (400, step-1, 1.5, ink-soft): bajada de sección, medida 62ch.
- **Body** (400, 1.0625rem, 1.6): texto corrido; resúmenes a 0.9375rem.
- **Label** (500, 0.6875rem, ancho 87.5 %, 0.06em, MAYÚSCULAS, cifras tabulares): rótulos técnicos en Martian Mono.

Los botones y las etiquetas de acción usan Archivo a 650 con ancho 108 %.

### Named Rules
**The Mono Mide Rule.** Martian Mono solo rotula medidas, referencias, valores, numeración y celdas de cajetín. Nunca va como antetítulo encima de un titular ni como texto de párrafo.

**The Sin Antetítulo Rule.** Los títulos de sección empiezan con el titular; no llevan rótulo, categoría ni numeración encima.

**The Ancho Es Peso Rule.** La jerarquía se marca ensanchando (118 % display, 108 % títulos menores y botones) además de engordar; no se usa otra familia de display.

## Layout

Contenedor centrado de ancho mínimo entre el 100 % menos dos gutters y 82rem; gutter fluido de 1rem a 2.5rem. Las secciones respiran con un padding vertical fluido de 4.5rem a 8rem. Espaciado en base 4px (0.25rem a 6rem). Texto corrido limitado a 62ch, resúmenes a 48–52ch.

El fondo es la retícula: líneas de 1px cada 24px (grid-minor) y cada 120px (grid-major), centradas arriba. Los dibujos técnicos se apoyan sobre su propia retícula de 24px.

Las composiciones son asimétricas de dos columnas desde 52–64rem (por ejemplo 1.2fr/1fr en cabeceras, 1fr/1.15fr en el proceso, 1.08fr/1fr en el diagnóstico) y se apilan en una columna en móvil. Los paneles laterales (lista del diagnóstico, explicación del proceso) quedan fijos con sticky bajo la cabecera de 4.25rem. Las láminas de servicio se apilan con sticky solo en pantallas de al menos 64rem de ancho y 52rem de alto. Puntos de corte observados: 30rem, 40rem, 48rem, 52rem, 56rem, 60rem, 64rem.

## Elevation & Depth

Profundidad de papel sobre la mesa: casi plana, con sombras cortas, siempre con desplazamiento y desenfoque, teñidas de navy. Las láminas apenas se separan del fondo; solo la acción primaria y el dock flotante se elevan con claridad; la cabecera fija y el menú móvil proyectan una sombra de barra hacia abajo.

### Shadow Vocabulary
- **Lámina** (`box-shadow: 0 1px 1px rgb(8 26 58 / 0.05), 0 4px 10px -6px rgb(8 26 58 / 0.16)`): láminas de servicio, diagnóstico, cuadro de precios y contacto.
- **Elevación** (`box-shadow: 0 2px 4px rgb(8 26 58 / 0.06), 0 18px 32px -20px rgb(13 45 143 / 0.4)`): elementos que flotan sobre la página, como el dock de WhatsApp.
- **Barra** (`box-shadow: 0 10px 24px -20px rgb(8 26 58 / 0.4)`): cabecera fija al desplazarse y panel del menú móvil.
- **Acción** (`box-shadow: 0 1px 1px rgb(8 26 58 / 0.1), 0 8px 18px -8px rgb(23 107 255 / 0.55)`): botón primario y envío; se retira cuando está deshabilitado.

### Named Rules
**The Papel Corto Rule.** Las láminas llevan solo la sombra de lámina; nada de sombras largas, duras o desplazadas sin desenfoque.

## Shapes

Dos familias de forma. El papel (láminas, tablas, escenario, hoja de ruta) es casi recto, con 2px de radio, borde de 1px en filete fuerte y marcas de corte: escuadras de 14px en las cuatro esquinas, a 9px por fuera del borde. Los controles (botones, campos, opciones, conmutador de menú) conservan el redondeo del logotipo con 10px; elementos pequeños (casilla, rótulo de escenario, enlace de salto) con 6px. El dock de WhatsApp es la única píldora.

Los círculos son llamadas de detalle y estaciones: llamada numerada de 2rem con borde de 1.5px, marcadores de ruta de 1.125rem, marcadores de paso de 2.75rem en el cianotipo. Las celdas de cajetín se dividen con filetes de 1px, sin radio.

## Components

### Buttons
Sólidos y directos, con el ancho de display reducido (108 %, 650).
- **Shape:** redondeo de control (10px), alto mínimo 3.25rem (2.75rem en la cabecera), padding horizontal 1.5rem, borde de 1.5px.
- **Primary:** fondo Electric, texto blanco, sombra de acción.
- **Hover / Focus:** hover a Midnight solo en punteros finos; el ícono final se desplaza 3px; al presionar escala 0.97. Foco con contorno de 2px Electric a 3px de distancia.
- **Secondary:** papel alzado con borde en filete fuerte; en hover el borde pasa a tinta.
- **Quiet:** texto Midnight con subrayado cian de 2px separado 0.35em; hover a Electric.
- **Disabled:** opacidad 0.45 y sin sombra.

### Chips (opciones del diagnóstico)
- **Style:** fila de papel alzado con filete de 1px, radio 10px, llamada numerada a la izquierda y casilla de 1.5rem a la derecha.
- **State:** marcada, borde Electric y tinte Electric al 5 %; la llamada y la casilla se rellenan de Electric y la marca se dibuja con stroke-dashoffset. Hover sube el borde a filete fuerte.

### Cards / Containers (láminas)
- **Corner Style:** casi recto (2px).
- **Background:** papel alzado; los dibujos dentro de la lámina van sobre papel con retícula de 24px.
- **Shadow Strategy:** sombra de lámina.
- **Border:** 1px filete fuerte, más marcas de corte.
- **Internal Padding:** 2rem/1.5rem en móvil, 3rem desde 56rem.
- **Cajetín:** pie de lámina en celdas (2 columnas en móvil, 4 desde 56rem) con rótulo mono en ink-muted y valor en tinta.

### Inputs / Fields
- **Style:** fondo papel, borde de 1px filete fuerte, radio 10px, padding 0.75rem 1rem, texto a 1rem.
- **Focus:** borde Electric, fondo papel alzado y anillo de 3px Electric al 20 %.
- **Error:** borde Rojo de Error con anillo danger-ring y mensaje a 600 en rojo.

### Navigation
- **Escritorio (desde 60rem):** enlaces Archivo 550 a 0.9375rem en tinta; el hover dibuja una cota cian de 2px que se extiende desde el centro.
- **Cabecera:** sticky, papel; al desplazarse aparece el filete inferior y la sombra de barra.
- **Móvil:** conmutador de 2.75rem con radio 10px; panel que cae 8px con enlaces a step-2 expandidos y su número de referencia en mono.

### Diagnóstico rápido (componente firma)
Lámina de dos paneles: situaciones a la izquierda (sticky en escritorio) y plano propuesto a la derecha sobre papel, separados por un filete fuerte. La ruta se dibuja como estaciones unidas por un conector Electric de 2px; el tramo hacia una solución proyectada pasa a punteado y su estación a borde punteado, ambos en Tinta Fantasma. Rótulos: la instrucción va en Archivo (0.8125rem, ink-muted); el conteo de pasos y el rótulo de cada estación son anotaciones del dibujo en Martian Mono. El primer paso se rellena de Electric con halo cian. Líneas guía cian de 1.5px, con punto en el extremo, unen cada situación marcada con el paso que la resuelve. Estado vacío: el trazado punteado en Tinta Fantasma. El pie, separado por un filete punteado, lleva el envío por WhatsApp.

### Cota
Línea cian de 1.5px con remates verticales y rótulo mono centrado sobre el color del fondo; se dibuja desde el centro hacia los extremos al entrar en pantalla.

### Escalera de servicios y proceso
Estaciones sobre un trazado: continuas para lo disponible, punteadas para lo proyectado, con leyenda. En el cianotipo, los pasos cuelgan de una línea punteada vertical y su marcador numerado se enciende en cian al entrar en pantalla.

## Do's and Don'ts

### Do:
- **Do** dibujar lo disponible con línea continua Electric y lo proyectado con línea punteada en Tinta Fantasma, en todo componente que muestre estado.
- **Do** apoyar cada lámina en papel alzado con radio de 2px, borde de 1px en filete fuerte, sombra de lámina y marcas de corte.
- **Do** anclar cada anotación con una línea guía cian al elemento exacto que explica.
- **Do** reservar Martian Mono (0.6875rem, 500, ancho 87.5 %, 0.06em, mayúsculas, cifras tabulares) para medidas, referencias, valores y celdas de cajetín.
- **Do** usar Archivo a 800 y ancho 118 % para titulares, con interletrado negativo.
- **Do** dejar visible el estado final de todo trazado animado cuando no hay script o se prefiere menos movimiento.

### Don't:
- **Don't** poner antetítulos, categorías ni numeración en mono encima de un titular.
- **Don't** usar línea punteada como adorno: siempre significa proyectado.
- **Don't** añadir una segunda sección oscura; el cianotipo es solo para el proceso.
- **Don't** redondear las láminas como tarjetas de interfaz ni usar sombras duras o desplazadas sin desenfoque.
- **Don't** rellenar superficies con cian ni componer párrafos en Martian Mono.
- **Don't** usar íconos de fuente o glifos; los íconos son SVG de trazo 1.75 sobre retícula de 24px.
