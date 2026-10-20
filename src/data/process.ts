/** Método de trabajo: cuatro pasos, una línea cada uno. */

export interface ProcessStep {
  title: string;
  line: string;
}

export const processSteps: readonly ProcessStep[] = [
  { title: 'Conversamos', line: 'Nos cuentas qué te quita tiempo o clientes.' },
  { title: 'Diagnosticamos', line: 'Encontramos el problema real, no el más visible.' },
  { title: 'Proponemos', line: 'Una solución puntual, con alcance y precio claros.' },
  { title: 'Construimos', line: 'Lo dejamos funcionando y seguimos cerca.' },
];
