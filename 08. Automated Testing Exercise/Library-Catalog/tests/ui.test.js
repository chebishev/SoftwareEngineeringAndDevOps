const { test, expect } = require("@playwright/test");
const url = "http://localhost:3000";

// Tests for GUEST users

// Verify "All Books" link is visible
test('Verify "All Books" link is visible', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector("nav.navbar");
  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();
  expect(isLinkVisible).toBe(true);
});

// Verify that the "Login" button is visible
test('Verify that the "Login" button is visible', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector("nav.navbar");
  const loginButton = await page.$('a[href="/login"]');
  const isLoginButtonVisisble = await loginButton.isVisible();
  expect(isLoginButtonVisisble).toBe(true);
});

// Verify that the "Register" button is visible
test('Verify that the "Register" button is visible', async ({ page }) => {
  await page.goto(url);
  await page.waitForSelector("nav.navbar");
  const registerButton = await page.$('a[href="/register"]');
  const isRegisterButtonVisisble = await registerButton.isVisible();
  expect(isRegisterButtonVisisble).toBe(true);
});

// Tests for LOGGED-IN users

// Verify that "All Books" link is visible
test('Verify that "All Books" link is visible', async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();
  expect(isLinkVisible).toBe(true);
});

// Verify that "My Books" link is visible
test('Verify that "My Books" link is visible', async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  const myBooksLink = await page.$('a[href="/profile"]');
  const isLinkVisible = await myBooksLink.isVisible();
  expect(isLinkVisible).toBe(true);
});

// Verify that "Add Book" button is visible
test('Verify that "Add Book" button is visible', async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  const addBookButton = await page.$('a[href="/create"]');
  const isButtonVisible = await addBookButton.isVisible();
  expect(isButtonVisible).toBe(true);
});

// Verify that the User's email address is visible
test("Verify that the User's email address is visible", async ({ page }) => {
  await page.goto(url + "/login");
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  await page.waitForSelector("div#user");
  const user = await page.$("div#user span");
  const isVisible = await user.isVisible();
  expect(isVisible).toBe(true);
  expect(user.textContent === "peter@abv.bg");
});

// Test the login page

// Submit the form with valid credentials
test("Submit the form with valid credentials", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe(url + "/catalog");
});

// Submit the form with empty input fields
test("Submit the form with empty input fields", async ({ page }) => {
  await page.goto(url + "/login");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/login"]');
  expect(page.url()).toBe(url + "/login");
});

// Submit the form with empty email and valid password
test("Submit the form with empty email and valid password", async ({
  page,
}) => {
  await page.goto(url + "/login");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/login"]');
  expect(page.url()).toBe(url + "/login");
});

// Submit the form with valid email and empty password
test("Submit the form with valid email and empty password", async ({
  page,
}) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/login"]');
  expect(page.url()).toBe(url + "/login");
});
