export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: readonly FaqItem[] = [
  {
    question: '¿Necesito saber de tecnología?',
    answer: 'No. Nos cuentas el problema con tus palabras; la parte técnica es nuestra.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Depende de lo que necesites. Después de una conversación corta te enviamos una propuesta con precio claro, sin paquetes genéricos.',
  },
  {
    question: '¿Por dónde empiezo?',
    answer:
      'Por lo más pequeño que resuelva algo real. Muchas veces es una página sencilla con WhatsApp y un QR para pedir reseñas.',
  },
  {
    question: '¿Qué pasa después de la entrega?',
    answer: 'Te enseñamos a usarlo. Si quieres, seguimos con mantenimiento y soporte mensual.',
  },
  {
    question: '¿Hacen chatbots o IA?',
    answer:
      'La automatización y la IA están en camino. Hoy nos enfocamos en webs, reseñas y Excel; si ya lo necesitas, lo evaluamos contigo.',
  },
];
