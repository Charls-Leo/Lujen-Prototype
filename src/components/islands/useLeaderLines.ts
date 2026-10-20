/**
 * Líneas guía entre dos elementos de una misma lámina: mide las posiciones de origen y destino
 * (relativas al contenedor) y devuelve trazos SVG listos para dibujar.
 *
 * Se vuelve a medir al cambiar las conexiones, al cambiar el tamaño del contenedor, al hacer
 * scroll (el origen puede ser fijo con `position: sticky`) y cuando terminan las animaciones
 * de entrada de los destinos.
 */
import { useLayoutEffect, useState, useSyncExternalStore, type RefObject } from 'react';

export interface LeaderLink {
  id: string;
  /** Selector del elemento de origen dentro del contenedor. */
  from: string;
  /** Selector del elemento de destino dentro del contenedor. */
  to: string;
}

export interface LeaderLine {
  id: string;
  d: string;
  start: { x: number; y: number };
}

/** Margen para volver a medir cuando terminan las animaciones de entrada (~450 ms). */
const SETTLE_MS = 520;

function measure(container: HTMLElement, links: readonly LeaderLink[]): LeaderLine[] {
  const box = container.getBoundingClientRect();
  return links.flatMap((link) => {
    const from = container.querySelector<HTMLElement>(link.from)?.getBoundingClientRect();
    const to = container.querySelector<HTMLElement>(link.to)?.getBoundingClientRect();
    if (!from || !to) return [];

    const start = { x: from.right - box.left, y: from.top + from.height / 2 - box.top };
    const end = { x: to.left - box.left - 6, y: to.top + to.height / 2 - box.top };
    const bend = Math.max(24, (end.x - start.x) / 2);
    const d = `M${start.x} ${start.y} C${start.x + bend} ${start.y} ${end.x - bend} ${end.y} ${end.x} ${end.y}`;
    return [{ id: link.id, d, start }];
  });
}

export function useLeaderLines(
  containerRef: RefObject<HTMLElement | null>,
  links: readonly LeaderLink[],
  enabled: boolean,
): LeaderLine[] {
  const [lines, setLines] = useState<LeaderLine[]>([]);
  // Resume `links`: solo se vuelve a suscribir cuando cambian las conexiones.
  const signature = links.map((link) => `${link.id}:${link.to}`).join('|');

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container || links.length === 0) {
      setLines([]);
      return;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLines(measure(container, links)));
    };

    setLines(measure(container, links));
    const settle = window.setTimeout(update, SETTLE_MS);
    const observer = new ResizeObserver(update);
    observer.observe(container);
    window.addEventListener('scroll', update, { passive: true });
    document.fonts?.ready.then(update).catch(() => undefined);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [containerRef, enabled, signature]);

  return lines;
}

/** Suscripción a una media query, segura en el renderizado del servidor (devuelve false). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
