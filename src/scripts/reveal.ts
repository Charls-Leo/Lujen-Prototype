/**
 * Revelados: marca con `.is-in` cada elemento [data-reveal] cuando entra en pantalla.
 * El CSS (global.css y cada componente) decide qué se anima; sin este script todo permanece visible.
 */

const IN_CLASS = 'is-in';

export function observeReveals(scope: ParentNode = document): void {
  const targets = Array.from(scope.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (targets.length === 0) return;

  const showAll = () => targets.forEach((target) => target.classList.add(IN_CLASS));

  // Al imprimir no hay scroll: todo sale visible.
  window.addEventListener('beforeprint', showAll);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(IN_CLASS);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((target) => observer.observe(target));
}
