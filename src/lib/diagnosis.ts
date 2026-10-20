/**
 * Lógica pura del diagnóstico: de las situaciones marcadas a una ruta ordenada de soluciones
 * y al mensaje de WhatsApp. Sin React ni DOM, para poder probarla y reutilizarla.
 */
import type { Symptom } from '@/data/diagnosis';
import { getOffering, isAvailable, type Offering } from '@/data/offerings';
import { composeMessage } from './whatsapp';

/** Disponibles primero y de menor a mayor inversión (entrada pequeña); lo que viene, al final. */
function compareOfferings(a: Offering, b: Offering): number {
  if (isAvailable(a) && isAvailable(b)) return a.priceFrom - b.priceFrom;
  if (isAvailable(a)) return -1;
  if (isAvailable(b)) return 1;
  return 0;
}

export function buildRoute(selected: readonly Symptom[]): Offering[] {
  const unique = new Map<string, Offering>();
  for (const symptom of selected) {
    for (const id of symptom.recommends) unique.set(id, getOffering(id));
  }
  return [...unique.values()].sort(compareOfferings);
}

export function buildDiagnosisMessage(selected: readonly Symptom[], route: readonly Offering[]): string {
  const [first] = route;
  return composeMessage([
    'Hola, Lujen. Hice el diagnóstico en su página.',
    '',
    'Lo que me pasa hoy:',
    ...selected.map((symptom) => `• ${symptom.statement}`),
    '',
    first && `Me interesa empezar por: ${first.name}.`,
    '¿Me envían una propuesta?',
  ]);
}
