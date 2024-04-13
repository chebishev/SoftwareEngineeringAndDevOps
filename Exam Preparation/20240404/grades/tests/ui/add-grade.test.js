const { test, expect } = require('@playwright/test');

test('Check add grades page', async ({ page }) => {
    await page.goto('http://localhost:8090/Add-Grade');
    const form = await page.$('form');
    expect(form).toBeTruthy();
  });
  