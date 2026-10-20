import { test, expect } from '@playwright/test';

const base = '/Lujen-Prototype/';
const published = `https://charls-leo.github.io${base}`;

test('Pages carga los recursos y la isla React dentro de la ruta base', async ({ page, request }) => {
  const failures: string[] = [];
  page.on('requestfailed', (request) => failures.push(request.url()));
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('./');
  await expect(page.locator('#diagnostico astro-island')).not.toHaveAttribute('ssr', '');
  await page.evaluate(() => document.fonts.ready);

  const resources = await page.locator('img[src], script[src], link[href], astro-island').evaluateAll((nodes) =>
    nodes.flatMap((node) => ['src', 'href', 'component-url', 'renderer-url']
      .map((attribute) => node.getAttribute(attribute))
      .filter((value): value is string => Boolean(value)))
  );
  for (const resource of new Set(resources)) {
    const url = new URL(resource, page.url());
    if (url.origin !== new URL(page.url()).origin) continue;
    expect(url.pathname).toMatch(/^\/Lujen-Prototype\//);
    expect((await request.get(url.href)).ok(), url.href).toBe(true);
  }
  expect(await page.locator('img').evaluateAll((images: HTMLImageElement[]) =>
    images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src)
  )).toEqual([]);
  expect(failures).toEqual([]);
});

test('Pages conserva la base en SEO, manifest, sitemap y archivos públicos', async ({ page, request }) => {
  await page.goto('./');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', published);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${published}og-lujen.png`);
  const organization = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(organization.url).toBe(published);
  expect(organization.logo).toBe(`${published}icon-512.png`);

  const manifestUrl = new URL('site.webmanifest', page.url());
  const manifest = await (await request.get(manifestUrl.href)).json();
  expect(new URL(manifest.start_url, manifestUrl).pathname).toBe(base);
  expect(new URL(manifest.scope, manifestUrl).pathname).toBe(base);
  for (const icon of manifest.icons) {
    const url = new URL(icon.src, manifestUrl);
    expect(url.pathname.startsWith(base)).toBe(true);
    expect((await request.get(url.href)).ok()).toBe(true);
  }
  for (const file of ['brand/LujenLogo.png', 'brand/LujenMarca.png', '.nojekyll']) {
    expect((await request.get(`./${file}`)).ok(), file).toBe(true);
  }
  expect(await (await request.get('./robots.txt')).text()).toContain(`Sitemap: ${published}sitemap-index.xml`);
  expect(await (await request.get('./sitemap-index.xml')).text()).toContain(`<loc>${published}sitemap-0.xml</loc>`);
  expect(await (await request.get('./sitemap-0.xml')).text()).toContain(`<loc>${published}</loc>`);
});

test('la navegación desde una 404 anidada regresa a la página y sección correctas', async ({ page }) => {
  await page.goto('./ruta/anidada/inexistente');
  const links = await page.locator('header a, footer nav a, a[data-menu-link]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('href')).filter((href) => href?.startsWith('/'))
  );
  expect(links.length).toBeGreaterThan(5);
  for (const href of links) expect(href?.startsWith(base)).toBe(true);
  await page.locator('footer nav').getByRole('link', { name: 'Servicios' }).click();
  await expect(page).toHaveURL(new RegExp(`${base}#servicios$`));
  await expect(page.locator('#servicios')).toHaveCount(1);
});
