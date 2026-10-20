# GitHub Pages

El sitio se publica en `https://charls-leo.github.io/Lujen-Prototype/`.
Astro genera un sitio estático en `dist/`; no se compilan archivos con Jekyll.

## Verificar localmente

Usar Node.js 22.20.0 (Astro requiere al menos 22.12.0) y npm:

```sh
npm ci
npm run build
npm run preview
```

Abrir `http://localhost:4321/Lujen-Prototype/`. `npm run dev` usa la misma ruta.
No hace falta crear un `.env`: el origen de Pages está configurado por defecto.
`SITE_URL` permite cambiar el origen para otro alojamiento; la ruta base se
configura en `astro.config.mjs`. Si existe un `.env` antiguo con `lujen.co`,
actualizar `SITE_URL` o eliminar esa variable antes de comprobar los metadatos.

Las pruebas usan el build de producción y la ruta base de Pages:

```sh
npx playwright install chromium
npm test
```

También se puede definir `PW_CHROMIUM_PATH` con la ruta de un Chromium instalado.
En entornos restringidos puede usarse `ASTRO_TELEMETRY_DISABLED=1` para evitar
que Astro intente guardar preferencias fuera del proyecto.

## Activar el despliegue, cuando se autorice publicar

1. En el repositorio, abrir **Settings → Pages → Build and deployment → Source**
   y seleccionar **GitHub Actions**. Esto reemplaza el flujo automático de Jekyll
   que se usa al publicar desde una rama.
2. Subir los cambios a `main`. `.github/workflows/deploy.yml` ejecuta `npm ci`,
   `npm run build`, sube únicamente `dist/` y despliega con las acciones oficiales
   de Pages. También permite ejecución manual desde Actions.
3. Comprobar el resultado en Actions y abrir la URL del entorno `github-pages`.

El workflow concede lectura del repositorio al build y permisos `pages: write`
e `id-token: write` solo al despliegue. No necesita tokens personales, nuevas
dependencias, adaptadores de servidor ni una rama `gh-pages`. `public/.nojekyll`
se copia al artefacto como protección adicional.

Los recursos importados desde `src/` los resuelve Astro/Vite. Para nuevos enlaces
a páginas o recursos de `public/`, usar `homePath` o `withBase` de `src/lib/paths.ts`.
El manifest usa rutas relativas a su propia ubicación para conservar la base.

Nota: en un sitio de proyecto, `robots.txt` se sirve bajo la ruta del repositorio.
Los rastreadores buscan el archivo del origen en `/robots.txt`, que pertenece
al sitio raíz de la cuenta; el sitemap de este proyecto se puede enviar
directamente al buscador.
