/** Rutas del sitio y de public/, relativas a la base configurada en Astro. */
export const homePath = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;

export const withBase = (path: string) => `${homePath}${path.replace(/^\/+/, '')}`;
