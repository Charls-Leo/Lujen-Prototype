import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Evita abrir WhatsApp real durante las pruebas: captura la URL y responde vacío. */
async function stubWhatsApp(page: Page) {
  await page.route(/(wa\.me|whatsapp\.com)/, (route) => route.fulfill({ status: 200, body: 'ok' }));
}

/** Espera a que la isla del diagnóstico esté hidratada antes de interactuar. */
async function gotoDiagnosis(page: Page) {
  await page.goto('./#diagnostico');
  await expect(page.locator('#diagnostico astro-island')).not.toHaveAttribute('ssr', '');
}

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test.describe('Página principal', () => {
  test('carga sin errores y con la marca visible', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('./');
    await expect(page).toHaveTitle(/Lujen/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Digitaliza, organiza y automatiza tu negocio.');
    await expect(page.getByRole('link', { name: 'Lujen, ir al inicio' }).locator('img')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test('cada ancla de la navegación apunta a una sección existente', async ({ page }) => {
    await page.goto('./');
    const hrefs = await page.locator('a[href^="#"]').evaluateAll((links) =>
      [...new Set(links.map((link) => link.getAttribute('href')))].filter((href) => href && href !== '#'),
    );
    expect(hrefs.length).toBeGreaterThan(5);
    for (const href of hrefs) {
      await expect(page.locator(href as string), `destino de ${href}`).toHaveCount(1);
    }
  });

  test('metadatos de SEO presentes', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /negocios/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-lujen\.png$/);
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-CO');
  });

  test('sin violaciones de accesibilidad graves (axe)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
  });
});

test.describe('Diagnóstico rápido', () => {
  test('traza la ruta y compone el mensaje de WhatsApp', async ({ page }) => {
    await gotoDiagnosis(page);
    const send = page.getByRole('link', { name: 'Enviar por WhatsApp' });
    await expect(send).toHaveAttribute('aria-disabled', 'true');

    await page.getByRole('checkbox', { name: /No tengo página web/ }).check();
    await page.getByRole('checkbox', { name: /pocas reseñas/ }).check();

    const stops = page.locator('#diagnostico ol li strong');
    await expect(stops).toHaveText(['QR de reseñas en Google', 'Página básica']);
    await expect(send).not.toHaveAttribute('aria-disabled', 'true');

    const href = decodeURIComponent((await send.getAttribute('href')) ?? '');
    expect(href).toContain('https://wa.me/');
    expect(href).toContain('Me interesa empezar por: QR de reseñas en Google.');

    await page.getByRole('checkbox', { name: /pocas reseñas/ }).uncheck();
    await expect(stops).toHaveText(['Página básica']);
  });

  test('las líneas guía no se cruzan con todas las situaciones marcadas', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Las líneas guía solo se dibujan con los paneles lado a lado');
    await gotoDiagnosis(page);
    for (const checkbox of await page.getByRole('checkbox').all()) await checkbox.check();
    const paths = page.locator('#diagnostico svg[class*="leaders"] path');
    await expect(paths).toHaveCount(5);
    await page.waitForTimeout(700);
    const ends = await paths.evaluateAll((nodes) =>
      nodes.map((node) => {
        const numbers = (node.getAttribute('d') ?? '').match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
        return { from: numbers[1], to: numbers[numbers.length - 1] };
      }),
    );
    const byOrigin = [...ends].sort((a, b) => a.from - b.from).map((end) => end.to);
    expect(byOrigin).toEqual([...byOrigin].sort((a, b) => a - b));
  });

  test('las soluciones proyectadas no muestran precio', async ({ page }) => {
    await gotoDiagnosis(page);
    await page.getByRole('checkbox', { name: /cotizaciones/ }).check();
    const projected = page.locator('#diagnostico ol li').filter({ hasText: 'WhatsApp conectado a un CRM' });
    await expect(projected).toContainText('En camino');
    await expect(projected).not.toContainText('$');
  });
});

test.describe('Servicios', () => {
  test('las bandas se abren al llegar a ellas y al recibir foco', async ({ page }) => {
    await page.goto('./');
    const bands = page.locator('[data-band]');
    await expect(bands).toHaveCount(4);
    await expect(bands.last()).not.toHaveClass(/is-open/);

    await bands.first().scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 0.25));
    await expect(bands.first()).toHaveClass(/is-open/);

    await bands.last().getByRole('link').focus();
    await expect(bands.last()).toHaveClass(/is-open/);
  });

  test('lo que viene se marca como en camino', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('[data-band][data-status="en-camino"]')).toContainText('En camino');
  });
});

test.describe('Contacto', () => {
  test('valida el campo obligatorio y abre WhatsApp con el mensaje', async ({ page, context }) => {
    await stubWhatsApp(page);
    await context.route(/(wa\.me|whatsapp\.com)/, (route) => route.fulfill({ status: 200, body: 'ok' }));
    await page.goto('./#contacto');

    const submit = page.getByRole('button', { name: 'Enviar' });
    await submit.click();
    await expect(page.locator('input[name="need"]')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('[data-composer-error]')).not.toBeEmpty();

    await page.getByRole('textbox', { name: 'Tu nombre' }).fill('Ana');
    await page.getByRole('textbox', { name: /Qué necesitas resolver/ }).fill('Quiero más reseñas.');

    const [popup] = await Promise.all([context.waitForEvent('page'), submit.click()]);
    const url = decodeURIComponent(popup.url());
    expect(url).toContain('Soy Ana.');
    expect(url).toContain('Quiero más reseñas.');
  });
});

test.describe('Navegación móvil', () => {
  test('el menú abre, navega y se cierra', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Solo en móvil');
    await page.goto('./');
    const toggle = page.getByRole('button', { name: 'Abrir menú' });
    await toggle.click();
    await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'true');
    await page.locator('#menu').getByRole('link', { name: /Preguntas/ }).click();
    await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/#preguntas$/);
  });

  test('Escape cierra el menú y devuelve el foco', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Solo en móvil');
    await page.goto('./');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('[data-menu-toggle]')).toBeFocused();
  });
});

test('página 404 con regreso al inicio', async ({ page }) => {
  const response = await page.goto('./ruta-que-no-existe');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esta página se nos escapó.');
  await page.getByRole('link', { name: 'Volver al inicio' }).click();
  await expect(page).toHaveURL(/\/$/);
});
