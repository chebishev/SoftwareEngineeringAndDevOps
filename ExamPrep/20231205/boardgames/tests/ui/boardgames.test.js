const { test, expect } = require("@playwright/test");

test("Check boardgames page", async ({ page }) => {
  await page.goto("https://exam-prep-k51a.onrender.com/boardgames");
  const list = await page.$("ul");
  expect(list).toBeTruthy();
});
