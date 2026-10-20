/**
 * Diagnóstico rápido (isla interactiva).
 * El visitante marca situaciones de su negocio; la ruta recomendada se traza en vivo,
 * cada situación queda unida por una línea guía al paso que la resuelve y el mensaje
 * de WhatsApp queda listo para enviar.
 *
 * React se justifica por el estado derivado (selección → ruta → líneas → mensaje) y
 * Motion por la entrada/salida coordinada de estaciones y el trazado de las líneas guía.
 */
import { useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from 'motion/react';

import { contact } from '@/config/site';
import { symptoms } from '@/data/diagnosis';
import { availabilityLabels, isAvailable, pillarLabels, type OfferingId } from '@/data/offerings';
import { buildDiagnosisMessage, buildRoute } from '@/lib/diagnosis';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { useLeaderLines, useMediaQuery, type LeaderLink } from './useLeaderLines';
import styles from './DiagnosisTool.module.css';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
/** Desde este ancho los paneles van lado a lado y las líneas guía tienen espacio. */
const WIDE_QUERY = '(min-width: 56rem)';

const symptomNumber = new Map(symptoms.map((symptom, index) => [symptom.id, index + 1]));

function listNumbers(numbers: readonly number[]): string {
  if (numbers.length === 1) return `la situación ${numbers[0]}`;
  return `las situaciones ${numbers.slice(0, -1).join(', ')} y ${numbers.at(-1)}`;
}

export default function DiagnosisTool() {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());
  const headingId = useId();
  const toolRef = useRef<HTMLDivElement>(null);
  const isWide = useMediaQuery(WIDE_QUERY);
  const reduceMotion = useReducedMotion();

  const selected = useMemo(() => symptoms.filter((symptom) => selectedIds.has(symptom.id)), [selectedIds]);
  const route = useMemo(() => buildRoute(selected), [selected]);
  const message = useMemo(() => buildDiagnosisMessage(selected, route), [selected, route]);
  const hasRoute = route.length > 0;

  /** Qué situaciones responde cada paso de la ruta. */
  const answeredBy = useMemo(() => {
    const map = new Map<OfferingId, number[]>();
    for (const symptom of selected) {
      for (const id of symptom.recommends) {
        map.set(id, [...(map.get(id) ?? []), symptomNumber.get(symptom.id) ?? 0]);
      }
    }
    return map;
  }, [selected]);

  /** Una línea por situación, hacia su recomendación principal. */
  const links = useMemo<LeaderLink[]>(
    () =>
      selected.map((symptom) => ({
        id: symptom.id,
        from: `[data-symptom="${symptom.id}"]`,
        to: `[data-stop="${symptom.recommends[0]}"] [data-anchor]`,
      })),
    [selected],
  );
  const leaders = useLeaderLines(toolRef, links, isWide);

  const toggle = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease: EASE_OUT }}>
      <LazyMotion features={domAnimation} strict>
        <div className={styles.tool} ref={toolRef}>
          <fieldset className={styles.symptoms}>
            <legend className={styles.legend}>
              <span className={styles.panelTitle}>Lo que te pasa hoy</span>
              <span className={styles.instruction}>Marca una o varias</span>
            </legend>
            <ul className={styles.symptomList} role="list">
              {symptoms.map((symptom, index) => {
                const checked = selectedIds.has(symptom.id);
                return (
                  <li key={symptom.id}>
                    <label className={styles.symptom} data-checked={checked} data-symptom={symptom.id}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={checked}
                        onChange={() => toggle(symptom.id)}
                      />
                      <span className={styles.callout} aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className={styles.statement}>{symptom.statement}</span>
                      <svg className={styles.tick} viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </label>
                  </li>
                );
              })}
            </ul>
            <p className={styles.escape}>
              ¿Tu caso no aparece?{' '}
              <a
                href={buildWhatsAppUrl(contact.defaultMessage, contact.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cuéntanoslo por WhatsApp
              </a>
              ; el diagnóstico de verdad lo hacemos contigo.
            </p>
          </fieldset>

          <section className={styles.plan} aria-labelledby={headingId}>
            <header className={styles.planHeader}>
              <h3 id={headingId} className={styles.panelTitle}>
                Tu ruta
              </h3>
              <span className={styles.hint} aria-live="polite">
                {hasRoute ? `${route.length} ${route.length === 1 ? 'paso' : 'pasos'}` : 'Aún vacía'}
              </span>
            </header>

            {hasRoute ? (
              <ol className={styles.route} role="list">
                <AnimatePresence initial={false} mode="popLayout">
                  {route.map((offering, index) => {
                    const available = isAvailable(offering);
                    const answers = answeredBy.get(offering.id) ?? [];
                    return (
                      <m.li
                        key={offering.id}
                        className={styles.stop}
                        data-stop={offering.id}
                        data-available={available}
                        data-first={index === 0}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      >
                        <m.span
                          className={styles.connector}
                          aria-hidden="true"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                        <span className={styles.marker} aria-hidden="true" data-anchor />
                        <div className={styles.stopBody}>
                          <strong className={styles.stopName}>{offering.name}</strong>
                          <span className={styles.stopSummary}>{offering.summary}</span>
                          {!available && <span className={styles.stopSoon}>{availabilityLabels.proyectado}</span>}
                          <span className={styles.stopMeta}>
                            {index === 0 ? 'Primer paso' : 'Después'} · {pillarLabels[offering.pillar]}
                            {answers.length > 0 && (
                              <span className={styles.answers}>
                                <span className="visually-hidden">, responde a {listNumbers(answers)}</span>
                                {answers.map((n) => (
                                  <span key={n} className={styles.answer} aria-hidden="true">
                                    {n}
                                  </span>
                                ))}
                              </span>
                            )}
                          </span>
                        </div>
                      </m.li>
                    );
                  })}
                </AnimatePresence>
              </ol>
            ) : (
              <div className={styles.empty}>
                <svg className={styles.emptyDrawing} viewBox="0 0 120 150" aria-hidden="true">
                  <path d="M20 14 V136" />
                  <circle cx="20" cy="14" r="7" />
                  <circle cx="20" cy="75" r="7" />
                  <circle cx="20" cy="136" r="7" />
                  <path d="M38 10 H104 M38 20 H84 M38 71 H100 M38 81 H72 M38 132 H96 M38 142 H78" />
                </svg>
                <p>Marca al menos una situación y aquí aparece por dónde empezaríamos.</p>
              </div>
            )}

            <footer className={styles.planFooter}>
              <a
                className={styles.send}
                href={hasRoute ? buildWhatsAppUrl(message, contact.whatsappNumber) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!hasRoute}
                tabIndex={hasRoute ? undefined : -1}
                role={hasRoute ? undefined : 'link'}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.sendIcon}>
                  <path d="M4.2 19.8l1.15-3.7a8.1 8.1 0 1 1 2.95 2.75z" />
                </svg>
                Enviar por WhatsApp
              </a>
              <p className={styles.footnote}>
                Se abre WhatsApp con el mensaje listo; tú decides si lo envías. No guardamos tus respuestas.
              </p>
              {hasRoute && (
                <details className={styles.preview}>
                  <summary>Ver el mensaje</summary>
                  <pre>{message}</pre>
                </details>
              )}
            </footer>
          </section>

          {isWide && leaders.length > 0 && (
            <svg className={styles.leaders} aria-hidden="true">
              {leaders.map((line) => (
                <g key={line.id}>
                  <m.path
                    className={styles.leaderPath}
                    d={line.d}
                    initial={{ pathLength: reduceMotion ? 1 : 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.15 }}
                  />
                  <circle className={styles.leaderDot} cx={line.start.x} cy={line.start.y} r={3.5} />
                </g>
              ))}
            </svg>
          )}
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
