/**
 * Genera los derivados de marca a partir de los originales en `public/brand/`.
 *
 * Los originales se conservan intactos. Este script produce:
 *  - src/assets/brand/*  → isotipo, logotipo y nombre recortados (y versiones claras),
 *                          optimizados luego por astro:assets.
 *  - public/*            → favicons, íconos de app y la imagen Open Graph.
 *
 * Uso: npm run brand
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCE = {
  isotipo: 'public/brand/LujenLogo.png',
  marca: 'public/brand/LujenMarca.png',
};
const OUT_ASSETS = 'src/assets/brand';
const OUT_PUBLIC = 'public';

// Filas del logotipo completo (medidas sobre el alfa del original 2172×724):
// el nombre ocupa y=150–498 y el eslogan y=539–588.
const WORDMARK_BOTTOM = 510;

const COLORS = { deepNavy: '#081A3A', electric: '#176BFF', cyan: '#26C6FF' };

async function trimmed(path) {
  return sharp(path).trim({ threshold: 1 }).png().toBuffer();
}

/**
 * Recolorea la tinta navy (azul muy oscuro y poco saturado) a Soft White, preservando el alfa.
 * La N usa azules saturados (canal azul alto), por eso queda intacta.
 */
async function toLight(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (r < 70 && g < 90 && b < 110) {
      data[i] = 246;
      data[i + 1] = 248;
      data[i + 2] = 252;
    }
  }
  return sharp(data, { raw: info }).png();
}

async function main() {
  await mkdir(OUT_ASSETS, { recursive: true });

  const isotipo = await trimmed(SOURCE.isotipo);
  const marca = await trimmed(SOURCE.marca);
  // sharp aplica trim antes que extract dentro de un mismo pipeline: se hacen en dos pasos.
  const wordmarkArea = await sharp(SOURCE.marca)
    .extract({ left: 0, top: 0, width: 2172, height: WORDMARK_BOTTOM })
    .png()
    .toBuffer();
  const wordmark = await trimmed(wordmarkArea);

  await sharp(isotipo).toFile(`${OUT_ASSETS}/lujen-isotipo.png`);
  await sharp(marca).toFile(`${OUT_ASSETS}/lujen-marca.png`);
  await sharp(wordmark).toFile(`${OUT_ASSETS}/lujen-wordmark.png`);

  // Versiones para fondos oscuros: las letras navy pasan a Soft White; la N en degradado se conserva.
  await (await toLight(marca)).toFile(`${OUT_ASSETS}/lujen-marca-light.png`);
  await (await toLight(wordmark)).toFile(`${OUT_ASSETS}/lujen-wordmark-light.png`);

  // Íconos: el isotipo ya es un cuadrado redondeado, se exporta con un margen mínimo.
  const icon = (size) =>
    sharp(isotipo)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 });

  await icon(32).toFile(`${OUT_PUBLIC}/favicon-32.png`);
  await icon(192).toFile(`${OUT_PUBLIC}/icon-192.png`);
  await icon(512).toFile(`${OUT_PUBLIC}/icon-512.png`);
  // Apple no respeta la transparencia: fondo sólido del propio isotipo.
  await sharp(isotipo)
    .resize(160, 160)
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: COLORS.deepNavy })
    .flatten({ background: COLORS.deepNavy })
    .png()
    .toFile(`${OUT_PUBLIC}/apple-touch-icon.png`);

  // Imagen Open Graph 1200×630: sala navy con el resplandor de la N y el logotipo claro.
  const W = 1200;
  const H = 630;
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="glow-a" cx="0.78" cy="1" r="0.7">
          <stop offset="0" stop-color="${COLORS.electric}" stop-opacity="0.75" />
          <stop offset="1" stop-color="${COLORS.electric}" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="glow-b" cx="0.88" cy="0.95" r="0.35">
          <stop offset="0" stop-color="${COLORS.cyan}" stop-opacity="0.55" />
          <stop offset="1" stop-color="${COLORS.cyan}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="${COLORS.deepNavy}" />
      <rect width="100%" height="100%" fill="url(#glow-a)" />
      <rect width="100%" height="100%" fill="url(#glow-b)" />
    </svg>`);
  const marcaForOg = await (await toLight(marca)).resize({ width: 820 }).toBuffer();
  const { height: marcaH = 0 } = await sharp(marcaForOg).metadata();
  await sharp(background)
    .composite([{ input: marcaForOg, left: 120, top: Math.round((H - marcaH) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(`${OUT_PUBLIC}/og-lujen.png`);

  console.log('Derivados de marca generados.');
}

main().catch((error) => {
  console.error('No se pudieron generar los derivados de marca:', error);
  process.exitCode = 1;
});
