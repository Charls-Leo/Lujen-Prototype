/**
 * Construcción de enlaces de WhatsApp (wa.me). Sin dependencias del DOM:
 * se usa tanto en componentes Astro (servidor) como en islas y scripts del cliente.
 */

const WA_BASE = 'https://wa.me/';

/**
 * Devuelve el enlace para abrir un chat con el mensaje prellenado.
 * Si no hay número configurado, WhatsApp abre el mensaje y permite elegir el contacto.
 */
export function buildWhatsAppUrl(message: string, phoneNumber = ''): string {
  const digits = phoneNumber.replace(/\D/g, '');
  const text = encodeURIComponent(message.trim());
  return `${WA_BASE}${digits}${text ? `?text=${text}` : ''}`;
}

/**
 * Une las líneas de un mensaje. Las cadenas vacías se conservan como separación;
 * los valores falsos se descartan, lo que permite incluir líneas condicionales.
 */
export function composeMessage(lines: ReadonlyArray<string | false | null | undefined>): string {
  return lines
    .filter((line): line is string => typeof line === 'string')
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
