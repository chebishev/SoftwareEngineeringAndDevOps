import { test, expect } from '@playwright/test';

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("nav.navbar");

    const allBooksLink = await page.$(".navbar-dashboard a");
    const isAllBooksLinVisible = await allBooksLink.isVisible();

    expect(isAllBooksLinVisible).toBe(true);
})

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector("nav.navbar");

    const loginButton = await page.$('[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();

    expect(isLoginButtonVisible).toBe(true);
})

test('Verify "All Books" link is visible for logged in users', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    const logoutBtn = await page.$("#logoutBtn");
    const isLogoutBtnVisible = await logoutBtn.isVisible();
    const allBooksLink = await page.$(".navbar-dashboard a");
    const isAllBooksLinVisible = await allBooksLink.isVisible();

    expect(isLogoutBtnVisible).toBe(true);
    expect(isAllBooksLinVisible).toBe(true);
})

test('Verify "My Books" link is visible for logged in users', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    const logoutBtn = await page.$("#logoutBtn");
    const isLogoutBtnVisible = await logoutBtn.isVisible();
    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksLinkVisible = await myBooksLink.isVisible();

    expect(isLogoutBtnVisible).toBe(true);
    expect(isMyBooksLinkVisible).toBe(true);
})

test('Verify "Add Book" link is visible for logged in users', async ({ page }) => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    const logoutBtn = await page.$("#logoutBtn");
    const isLogoutBtnVisible = await logoutBtn.isVisible();
    const createBookLink = await page.$('a[href="/create"]');
    const isCreateBookLinkVisible = await createBookLink.isVisible();

    expect(isLogoutBtnVisible).toBe(true);
    expect(isCreateBookLinkVisible).toBe(true);
})

test('Verify corect greeting apears for logged in users', async ({ page }) => {
    const greetingText = "Welcome, peter@abv.bg";

    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    const logoutBtn = await page.$("#logoutBtn");
    const isLogoutBtnVisible = await logoutBtn.isVisible();
    const actualGreeting = await page.$('#user span');
    const actualGreetingText = await actualGreeting.textContent();

    expect(isLogoutBtnVisible).toBe(true);
    expect(actualGreetingText).toContain(greetingText);
})

//Login page
test('Login with valid credentials', async ({ page }) => {

    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "peter@abv.bg");
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe("http://localhost:3000/catalog");
})

test('Submiting empty login form', async ({ page }) => {

    await page.goto("http://localhost:3000/login");
    await page.waitForSelector("nav.navbar");

    await page.click('input[type="submit"]');

    page.on("dialog", async dialog =>{
        expect(dialog.type.toContain("alert"));
        expect(dialog.message.toContain("All fields are required!"));
        await dialog.accept();
    })

    expect(page.url()).toBe("http://localhost:3000/login");
})

//Register page

test('Register with valid credentials', async ({ page }) => {

    await page.goto("http://localhost:3000/register");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", `suffer${Math.random()}@abv.bg`);
    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "123456")
    await page.click('input[type="submit"]');

    const logoutBtn = await page.$("#logoutBtn");
    const isLogoutBtnVisible = await logoutBtn.isVisible();

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe("http://localhost:3000/catalog");
    expect(isLogoutBtnVisible).toBe(true);
})

test('Submit empty register form', async ({ page }) => {

    await page.goto("http://localhost:3000/register");
    await page.waitForSelector("nav.navbar");

    await page.click('input[type="submit"]');

    page.on("dialog", async dialog =>{
        expect(dialog.type.toContain("alert"));
        expect(dialog.message.toContain("All fields are required!"));
        await dialog.accept();
    })

    expect(page.url()).toBe("http://localhost:3000/register");
})

test('Submit form with empty email', async ({ page }) => {

    await page.goto("http://localhost:3000/register");
    await page.waitForSelector("nav.navbar");

    await page.fill("#password", "123456");
    await page.fill("#repeat-pass", "123456")
    await page.click('input[type="submit"]');

    page.on("dialog", async dialog =>{
        expect(dialog.type.toContain("alert"));
        expect(dialog.message.toContain("All fields are required!"));
        await dialog.accept();
    })

    expect(page.url()).toBe("http://localhost:3000/register");
})

test('Submit form with empty password', async ({ page }) => {

    await page.goto("http://localhost:3000/register");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "joro@abv.bg")
    await page.fill("#repeat-pass", "123456")
    await page.click('input[type="submit"]');

    page.on("dialog", async dialog =>{
        expect(dialog.type.toContain("alert"));
        expect(dialog.message.toContain("All fields are required!"));
        await dialog.accept();
    })

    expect(page.url()).toBe("http://localhost:3000/register");
})

test('Submit form with empty repeat password', async ({ page }) => {

    await page.goto("http://localhost:3000/register");
    await page.waitForSelector("nav.navbar");

    await page.fill("#email", "joro@abv.bg")
    await page.fill("#password", "123456");
    await page.click('input[type="submit"]');

    page.on("dialog", async dialog =>{
        expect(dialog.type.toContain("alert"));
        expect(dialog.message.toContain("All fields are required!"));
        await dialog.accept();
    })

    expect(page.url()).toBe("http://localhost:3000/register");
})