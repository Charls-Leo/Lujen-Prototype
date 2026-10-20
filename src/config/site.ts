/**
 * Configuración global del sitio: identidad, navegación y canales de contacto.
 * Todo dato que dependa del entorno (dominio, número de WhatsApp) entra por variables de entorno.
 */

import { buildWhatsAppUrl } from '@/lib/whatsapp';

export const site = {
  name: 'Lujen',
  legalName: 'Lujen',
  slogan: ['Digitaliza', 'Organiza', 'Automatiza'] as const,
  title: 'Lujen — Digitaliza, organiza y automatiza tu negocio',
  description:
    'Webs, reseñas en Google y datos en orden para negocios locales en Colombia. Primero entendemos tu caso; después proponemos una solución a tu medida.',
  locale: 'es-CO',
  lang: 'es',
  country: 'Colombia',
  ogImage: '/og-lujen.png',
} as const;

export interface NavItem {
  label: string;
  href: `#${string}`;
}

/** Anclas de la página principal, en el orden en que aparecen. */
export const primaryNav: readonly NavItem[] = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Método', href: '#proceso' },
  { label: 'Preguntas', href: '#preguntas' },
];

/**
 * Número comercial de WhatsApp (solo dígitos, con indicativo 57).
 * PENDIENTE: definir PUBLIC_WHATSAPP_NUMBER en .env. Sin número, los enlaces
 * abren WhatsApp con el mensaje listo y el visitante elige el contacto.
 */
export const contact = {
  whatsappNumber: (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, ''),
  defaultMessage: 'Hola, Lujen. Quiero contarles sobre mi negocio y ver cómo me pueden ayudar.',
} as const;

/** Enlace general a WhatsApp con el saludo por defecto. */
export const whatsappUrl = buildWhatsAppUrl(contact.defaultMessage, contact.whatsappNumber);
