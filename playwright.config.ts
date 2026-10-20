import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas de extremo a extremo sobre el build de producción (`npm run build` antes de `npm test`).
 * PW_CHROMIUM_PATH permite usar un Chromium ya instalado en lugar de descargar uno.
 */
const PORT = 4322;
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npx astro preview --port ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
