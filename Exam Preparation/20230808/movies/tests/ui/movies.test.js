const { test, expect } = require('@playwright/test');

test('Check movies page', async ({ page }) => {
    await page.goto('https://chebishev-movies-exam-prep.onrender.com/movies');
    const list = await page.$('ul');
    expect(list).toBeTruthy();
  });
  