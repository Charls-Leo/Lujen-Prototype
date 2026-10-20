/**
 * Efecto magnético: los elementos [data-magnetic] se desplazan levemente hacia el puntero
 * mientras está encima y vuelven a su sitio al salir. Solo con puntero fino y sin
 * preferencia de movimiento reducido. Usa la propiedad `translate` (independiente de
 * `transform`), así no pisa el escalado al presionar.
 */

const STRENGTH = 0.28;
const MAX_SHIFT = 14; // px

const clamp = (value: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, value));

export function enableMagnetic(scope: ParentNode = document): void {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canHover || reduceMotion) return;

  scope.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
    let frame = 0;
    // Desplazamiento aplicado: se descuenta al medir para calcular desde la posición original.
    let shift = { x: 0, y: 0 };

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const centerX = box.left - shift.x + box.width / 2;
      const centerY = box.top - shift.y + box.height / 2;
      shift = {
        x: clamp((event.clientX - centerX) * STRENGTH),
        y: clamp((event.clientY - centerY) * STRENGTH),
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.translate = `${shift.x.toFixed(1)}px ${shift.y.toFixed(1)}px`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      shift = { x: 0, y: 0 };
      element.style.translate = '';
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
  });
}
