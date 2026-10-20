/**
 * Bandas de servicio de la home: un nombre con presencia, una frase y tres etiquetas.
 * Lo proyectado aparece como "En camino" (ver PRODUCT.md: honestidad sobre la etapa).
 */

export type ServiceArt = 'web' | 'reviews' | 'data' | 'automation';

export interface ServiceBand {
  id: string;
  title: string;
  tagline: string;
  tags: readonly [string, string, string];
  art: ServiceArt;
  status: 'disponible' | 'en-camino';
}

export const serviceBands: readonly ServiceBand[] = [
  {
    id: 'web',
    title: 'Webs que venden',
    tagline: 'Tu negocio visible en Google y a un toque de WhatsApp.',
    tags: ['Landing', 'Página profesional', 'Reservas y catálogo'],
    art: 'web',
    status: 'disponible',
  },
  {
    id: 'resenas',
    title: 'Reseñas en Google',
    tagline: 'Un QR en tu mostrador y los clientes felices te recomiendan.',
    tags: ['QR digital', 'Con tu marca', 'Kit físico'],
    art: 'reviews',
    status: 'disponible',
  },
  {
    id: 'excel',
    title: 'Excel que trabaja solo',
    tagline: 'Ventas, inventario y gastos en orden, con reportes que se arman solos.',
    tags: ['Plantillas', 'Automatización', 'Reportes'],
    art: 'data',
    status: 'disponible',
  },
  {
    id: 'automatizacion',
    title: 'Automatización e IA',
    tagline: 'WhatsApp conectado a un CRM, tableros y procesos que avanzan sin ti.',
    tags: ['Power BI', 'CRM', 'IA aplicada'],
    art: 'automation',
    status: 'en-camino',
  },
];
