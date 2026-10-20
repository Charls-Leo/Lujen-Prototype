/**
 * Catálogo de soluciones: fuente única de nombres, resúmenes y disponibilidad. Lo usa el diagnóstico.
 *
 * `priceFrom` (COP, "desde", propuesta abierta entre socios; ver PRODUCT.md) NO se publica en la
 * home: solo ordena la ruta del diagnóstico de menor a mayor inversión y sirve de referencia
 * interna para las propuestas. Las soluciones "proyectado" pertenecen a etapas futuras.
 */

export type Pillar = 'digitaliza' | 'organiza' | 'automatiza';
export type Availability = 'disponible' | 'proyectado';

export const pillarLabels: Record<Pillar, string> = {
  digitaliza: 'Digitaliza',
  organiza: 'Organiza',
  automatiza: 'Automatiza',
};

export const availabilityLabels: Record<Availability, string> = {
  disponible: 'Disponible hoy',
  proyectado: 'En camino',
};

export type OfferingId =
  | 'qr-resenas'
  | 'landing'
  | 'pagina-profesional'
  | 'pagina-sistema'
  | 'excel-automatizacion'
  | 'excel-sistema'
  | 'power-bi'
  | 'whatsapp-crm'
  | 'ia-procesos';

interface OfferingBase {
  id: OfferingId;
  name: string;
  pillar: Pillar;
  summary: string;
}

export type Offering =
  | (OfferingBase & { availability: 'disponible'; priceFrom: number })
  | (OfferingBase & { availability: 'proyectado' });

export const offerings: readonly Offering[] = [
  {
    id: 'qr-resenas',
    name: 'QR de reseñas en Google',
    pillar: 'digitaliza',
    availability: 'disponible',
    priceFrom: 50_000,
    summary: 'Un código que lleva directo a dejar la reseña: digital, con tu logo o en kit físico.',
  },
  {
    id: 'landing',
    name: 'Página básica',
    pillar: 'digitaliza',
    availability: 'disponible',
    priceFrom: 700_000,
    summary: 'Tu negocio, servicios, galería, ubicación en Google Maps, redes y botón de WhatsApp.',
  },
  {
    id: 'pagina-profesional',
    name: 'Página profesional',
    pillar: 'digitaliza',
    availability: 'disponible',
    priceFrom: 1_300_000,
    summary: 'Catálogo o portafolio, formularios de cotización, SEO local y medición de visitas.',
  },
  {
    id: 'pagina-sistema',
    name: 'Página con sistema',
    pillar: 'digitaliza',
    availability: 'disponible',
    priceFrom: 2_500_000,
    summary: 'Reservas, cotizadores, panel de administración y gestión de productos.',
  },
  {
    id: 'excel-automatizacion',
    name: 'Automatización de Excel',
    pillar: 'organiza',
    availability: 'disponible',
    priceFrom: 300_000,
    summary: 'Fórmulas, validaciones y plantillas para dejar de copiar y pegar a mano.',
  },
  {
    id: 'excel-sistema',
    name: 'Sistema completo en Excel',
    pillar: 'organiza',
    availability: 'disponible',
    priceFrom: 600_000,
    summary: 'Control de ventas, inventario, gastos o clientes con reportes que se arman solos.',
  },
  {
    id: 'power-bi',
    name: 'Tableros en Power BI',
    pillar: 'organiza',
    availability: 'proyectado',
    summary: 'Indicadores del negocio en un tablero que se actualiza con tus datos.',
  },
  {
    id: 'whatsapp-crm',
    name: 'WhatsApp conectado a un CRM',
    pillar: 'automatiza',
    availability: 'proyectado',
    summary: 'Clientes que llegan por WhatsApp quedan registrados, calificados y con seguimiento.',
  },
  {
    id: 'ia-procesos',
    name: 'IA aplicada a procesos',
    pillar: 'automatiza',
    availability: 'proyectado',
    summary: 'Documentos, respuestas frecuentes y reportes procesados sobre tus procesos reales.',
  },
];

const offeringIndex = new Map(offerings.map((offering) => [offering.id, offering]));

export function getOffering(id: OfferingId): Offering {
  const offering = offeringIndex.get(id);
  if (!offering) throw new Error(`Solución desconocida: ${id}`);
  return offering;
}

export function isAvailable(
  offering: Offering,
): offering is Extract<Offering, { availability: 'disponible' }> {
  return offering.availability === 'disponible';
}
