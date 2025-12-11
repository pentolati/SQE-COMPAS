const { chromium } = require('playwright');

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:5176';
  const screenshotDir = './screenshots';

  // Wait for app to load and switch to light mode
  console.log('Taking screenshots in LIGHT mode...');

  // Dashboard
  console.log('1. Dashboard...');
  await page.goto(baseUrl);
  await page.waitForTimeout(2000);

  // Click light mode toggle (sun icon)
  const themeToggle = page.locator('button[aria-label="Toggle theme"]');
  if (await themeToggle.count() > 0) {
    await themeToggle.click();
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: `${screenshotDir}/01-dashboard-light.png`, fullPage: false });
  console.log('   Dashboard saved!');

  // Alerts
  console.log('2. Alerts...');
  await page.goto(`${baseUrl}/alerts`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}/02-alerts-light.png`, fullPage: false });
  console.log('   Alerts saved!');

  // Gamification
  console.log('3. Gamification...');
  await page.goto(`${baseUrl}/gamification`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}/03-gamification-light.png`, fullPage: false });
  console.log('   Gamification saved!');

  // AI Assistant
  console.log('4. AI Assistant...');
  await page.goto(`${baseUrl}/ai-assistant`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${screenshotDir}/04-ai-assistant-light.png`, fullPage: false });
  console.log('   AI Assistant saved!');

  await browser.close();
  console.log('\nAll screenshots saved to ./screenshots folder!');
}

takeScreenshots().catch(console.error);
