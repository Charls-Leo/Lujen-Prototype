/**
 * Situaciones del diagnóstico rápido y la solución con la que empezaríamos en cada una.
 * Las recomendaciones apuntan al catálogo de offerings.ts.
 *
 * Orden: las situaciones van en el mismo orden que su primera recomendación ocupa en la
 * ruta (disponibles de menor a mayor inversión). Así las líneas guía del diagnóstico,
 * que unen cada situación con esa recomendación, nunca se cruzan. Lo verifica
 * tests/site.spec.ts; al agregar una situación, ubícala según el precio de su recomendación.
 */
import type { OfferingId } from './offerings';

export interface Symptom {
  id: string;
  /** Escrito en primera persona, como lo diría el dueño del negocio. */
  statement: string;
  /** La primera es la recomendación principal (la que une la línea guía). */
  recommends: readonly OfferingId[];
}

export const symptoms: readonly Symptom[] = [
  {
    id: 'pocas-resenas',
    statement: 'Tengo pocas reseñas en Google y a los clientes nuevos les cuesta confiar.',
    recommends: ['qr-resenas'],
  },
  {
    id: 'excel-manual',
    statement: 'Llevo ventas, gastos o inventario en Excel, a mano y con errores.',
    recommends: ['excel-automatizacion'],
  },
  {
    id: 'info-regada',
    statement: 'Tengo la información en varios archivos y no sé bien cómo va el negocio.',
    recommends: ['excel-sistema', 'power-bi'],
  },
  {
    id: 'sin-web',
    statement: 'No tengo página web, o la que tengo ya no muestra lo que hago.',
    recommends: ['landing'],
  },
  {
    id: 'cotizaciones',
    statement: 'Me piden cotizaciones por WhatsApp y no doy abasto.',
    recommends: ['pagina-profesional', 'whatsapp-crm'],
  },
];
