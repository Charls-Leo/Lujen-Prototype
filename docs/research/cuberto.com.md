# Design Map

Fuente: https://cuberto.com/ (1440×900, una página; capturas y extractor DOM con Playwright). Referencia de principios para el rediseño de LUJEN, no de identidad.

## Spacing Scale
18, 36, 72, 90, 108, 135, 180 px (secciones: 180px arriba / 90px abajo; separación entre secciones 90–336px)

## Font Hierarchy
- Hero: 81px / 500 / line-height 1 / -0.81px — Suisse Intl
- Display de sección: 72px / 400
- Título de servicio: 37.8px / 400
- Lead: 23.04px / 400
- Cuerpo: 21.6px / 400
- Rótulo: 14.4px / 400

## Color Palette
- Fondo: #FFFFFF
- Superficie invertida: #000000 (76% del área de fondo medida)
- Texto: #000000; sobre negro rgba(255,255,255,0.7) para secundario
- Banda plegada: #EEEEEE
- Superficies teñidas: #E3F5F3, #F1F3FA
- Luz atmosférica: degradado violeta-azul en el cierre

## Image Ratios
- Proyectos: 1.6:1
- Marco del showreel: 16:9, radio 18px

## Component Tokens
- Radios: 7.2px, 18px (medios), 72px 72px 0 0 (paneles), 999px (botones píldora)
- Sombras: ninguna
- Retícula de proyectos: 2 columnas, gutter 90px, columna derecha desplazada
- Movimiento: cubic-bezier(0.16, 1, 0.3, 1) 0.8s; cubic-bezier(0.4, 0, 0, 1) 0.5s; hovers 0.3–0.4s
- Cursor: elemento fijo, mix-blend-mode exclusion, rotate(45deg)

---

# Taste DNA

### Una familia, dos pesos
- **Trigger**: When building hierarchy from an 81px hero down to 14.4px labels.
- **Decision**: One family (Suisse Intl) in 400/500 with size-only steps over a display/body pairing or bold weights.
- **Reason**: A single voice reads as one studio speaking; contrast comes from scale and space, so the work imagery carries the expression.
- **Evidence**: 770 nodes in Suisse Intl and no other family; weights 400 ×200, 500 ×22; steps 81 → 72 → 37.8 → 23 → 21.6 → 14.4px.

### Profundidad por inversión, no por sombra
- **Trigger**: When separating sections and grouping content.
- **Decision**: Black panels with 72px top corners sliding over white over borders, dividers or card shadows.
- **Reason**: A full-surface inversion is felt as a change of room; hairlines and shadows read as UI chrome.
- **Evidence**: zero box-shadows; black covers 76% of measured background area; panel radius 72px 72px 0 0.

### La densidad llega cuando el ojo llega
- **Trigger**: When presenting five service lines with paragraph-length descriptions.
- **Decision**: Title-only light bands that expand and darken into art cards at reading position over an always-open card grid.
- **Reason**: The visitor only pays for the detail of the band they are looking at; the rest stays a calm list of names.
- **Evidence**: collapsed bands #EEEEEE with 37.8px title + number; expanded: black gradient art + body + "Explore"; transform/border-radius 0.5s cubic-bezier(0.4,0,0,1).

### El cursor como material
- **Trigger**: When giving feedback on hover across nav, buttons and media.
- **Decision**: A blend-mode cursor, rolling text and ripple-fill buttons with long expo-out easing over color-only hover states.
- **Reason**: Motion that answers the hand makes the page feel made by people who build interfaces — the product being sold.
- **Evidence**: fixed Cursor with mix-blend-mode exclusion and rotate(45deg); nav labels duplicated via data-text for a vertical roll; Contacts button with .border + .ripple layers; transform 0.8s cubic-bezier(0.16,1,0.3,1).
