const { test, expect } = require("@playwright/test");
const url = "http://localhost:3000";

//Tests for GUEST users

//Verify "All Books" link is visible
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
test("Submit the login form with valid credentials", async ({ page }) => {
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

// Test the register page

// Submit the form with valid credentials
test("Submit the register form with valid credentials", async ({ page }) => {
  await page.goto(url + "/register");
  await page.fill('input[name="email"]', `peter${Math.random()}@abv.bg`);
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirm-pass"]', "123456");
  await page.click('input[type="submit"]');
  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe(url + "/catalog");
});

// Submit the form with empty input fields
test("Submit the register form with empty input fields", async ({ page }) => {
  await page.goto(url + "/register");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/register"]');
  expect(page.url()).toBe(url + "/register");
});

// Submit the form with empty email and valid passwords
test("Submit the register form with empty email and valid passwords", async ({
  page,
}) => {
  await page.goto(url + "/register");
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirm-pass"]', "123456");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/register"]');
  expect(page.url()).toBe(url + "/register");
});

// Submit the form with valid email and empty passwords
test("Submit the register form with valid email and empty passwords", async ({
  page,
}) => {
  await page.goto(url + "/register");
  await page.fill('input[name="email"]', `peter${Math.random()}@abv.bg`);
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/register"]');
  expect(page.url()).toBe(url + "/register");
});

// Submit the form with empty confirm password
test("Submit the register form with empty confirm password", async ({
  page,
}) => {
  await page.goto(url + "/register");
  await page.fill('input[name="email"]', `peter${Math.random()}@abv.bg`);
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/register"]');
  expect(page.url()).toBe(url + "/register");
});

// Submit the register form with different passwords
test("Submit the register form with different passwords", async ({ page }) => {
  await page.goto(url + "/register");
  await page.fill('input[name="email"]', `peter${Math.random()}@abv.bg`);
  await page.fill('input[name="password"]', "123456");
  await page.fill('input[name="confirm-pass"]', "1234567");
  await page.click('input[type="submit"]');
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("Passwords don't match");
    dialog.accept();
  });
  await page.$('a[href="/register"]');
  expect(page.url()).toBe(url + "/register");
});

// "Add Book" page

// add a book with correct data
test("Add book with correct data", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");
  await page.fill("#title", "The Lord of the Rings");
  await page.fill(
    "#description",
    "The Lord of the Rings is an epic high-fantasy novel written by English author J. R. R. Tolkien."
  );
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.selectOption("#type", "Fiction");
  await page.click("#create-form input[type=submit]");
  await page.waitForURL(url + "/catalog");
  expect(page.url()).toBe(url + "/catalog");
});

// sumbmit the book with empty title field
test("Submit the book with empty title field", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");
  await page.fill(
    "#description",
    "The Lord of the Rings is an epic high-fantasy novel written by English author J. R. R. Tolkien."
  );
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.selectOption("#type", "Fiction");
  await page.click("#create-form input[type=submit]");
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/create"]');
  expect(page.url()).toBe(url + "/create");
});

// Submit the form with empty description field
test("Submit the book with empty description field", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");
  await page.fill("#title", "The Lord of the Rings");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.selectOption("#type", "Fiction");
  await page.click("#create-form input[type=submit]");
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/create"]');
  expect(page.url()).toBe(url + "/create");
});

// Submit the form with empty image field
test("Submit the book with empty image field", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");
  await page.fill("#title", "The Lord of the Rings");
  await page.fill(
    "#description",
    "The Lord of the Rings is an epic high-fantasy novel written by English author J. R. R. Tolkien."
  );
  await page.selectOption("#type", "Fiction");
  await page.click("#create-form input[type=submit]");
  page.on("dialog", (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain("All fields are required");
    dialog.accept();
  });
  await page.$('a[href="/create"]');
  expect(page.url()).toBe(url + "/create");
});

// "All Books" page

// Verify that all books are displayed
test("Verify that all books are displayed", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.waitForSelector(".dashboard");
  const books = await page.$$(".other-books-list li");
  expect(books.length).toBeGreaterThan(0);
});

// Verify that no books are displayed
// for this to work you have to delete all books in the database
// test("Verify that no books are displayed", async ({ page }) => {
//   await page.goto(url + "/login");
//   await page.fill('input[name="email"]', "peter@abv.bg");
//   await page.fill('input[name="password"]', "123456");

//   await Promise.all([
//     page.click('input[type="submit"]'),
//     page.waitForURL(url + "/catalog"),
//   ]);

//   await page.waitForSelector(".dashboard")
//   const noBooksMessage = await page.textContent(".no-books");
//   expect(noBooksMessage).toBe("No books in database!");
// });

// "Details" page

// Verify that logged-in user see Details button and the button works correctly
test("Login and navigate to Details page", async ({ page }) => {
  await page.goto(url + "/login");

  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click("a[href='/catalog']");
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const detailsPageTitle = await page.textContent(".book-information h3");
  expect(detailsPageTitle).toBe("The Lord of the Rings");
});

// Verify that guest user sees details button and it works correctly
test("navigate to Details page as guest", async ({ page }) => {
  await page.goto(url + "/catalog");
  await page.click("a[href='/catalog']");
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const detailsPageTitle = await page.textContent(".book-information h3");
  expect(detailsPageTitle).toBe("The Lord of the Rings");
});

// Verify that all info is displayed correctly
test("Verify that all info is displayed correctly", async ({ page }) => {
  await page.goto(url + "/catalog");
  await page.click("a[href='/catalog']");
  await page.waitForSelector(".otherBooks");

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const bookTitle = await page.textContent(".book-information h3");
  expect(bookTitle).toBe("The Lord of the Rings");
  const bookType = await page.textContent("p.type");
  expect(bookType).toContain("Fiction");
  const bookIMG = await page.$$eval("p.img img[src]", (img) => img[0].src);
  expect(bookIMG).toBe("https://example.com/book-image.jpg");
  const likesIMG = await page.$$eval(
    "div.likes img.hearts",
    (img) => img[0].src
  );
  expect(likesIMG).toContain("/images/heart.png");
  const likesCounter = await page.textContent("div.likes span#total-likes");
  expect(likesCounter).toContain("Likes: ");
  const description = await page.textContent("div.book-description p");
  expect(description).toContain(
    "The Lord of the Rings is an epic high-fantasy novel written by English author J. R. R. Tolkien."
  );
});

// Verify that edit and delete buttons are visible to book creator
test("Verify that edit and delete buttons are visible to book creator", async ({
  page,
}) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector("#create-form");
  await page.fill("#title", "Outlander-test");
  await page.fill("#description", "Just some text for testing purposes");
  await page.fill("#image", "https://example.com/book-image.jpg");
  await page.selectOption("#type", "Fiction");
  await page.click("#create-form input[type=submit]");
  await page.waitForURL(url + "/catalog");
  expect(page.url()).toBe(url + "/catalog");
  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const buttons = await page.$$eval("div.actions a.button", (btns) =>
    btns.map((btn) => btn.textContent)
  );
  expect(buttons).toEqual(["Edit", "Delete"]);
});

// Verify that edit and delete buttons are not visible to other users
test("Verify that edit and delete buttons are not visible to other users", async ({
  page,
}) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "john@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);
  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const buttons = await page.$$eval("div.actions a.button", (btns) =>
    btns.map((btn) => btn.textContent)
  );
  expect(buttons).toEqual(["Like"]);
});

// Verify If Like Button Is Not Visible for Creator

test("Verify that Like button is not visible to book creator", async ({
  page,
}) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);

  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const buttons = await page.$$eval("div.actions a.button", (btns) =>
    btns.map((btn) => btn.textContent)
  );
  // it must be only the Like button for non creators
  expect(buttons.length).toBe(2);
});

// Verify If Like Button Is Visible for Non-Creator
test("Verify that Like button is visible to other users", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "john@abv.bg");
  await page.fill('input[name="password"]', "123456");

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(url + "/catalog"),
  ]);
  await page.click(".otherBooks a.button");
  await page.waitForSelector(".book-information");
  const buttons = await page.$$eval("div.actions a.button", (btns) =>
    btns.map((btn) => btn.textContent)
  );
  expect(buttons).toEqual(["Like"]);
});

// Logout functionality

// Verify that the logout button is visible
test("Verify that the logout button is visible", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');
  const logoutButton = await page.waitForSelector("#logoutBtn");
  expect(logoutButton).toBeTruthy();
});

// Verify That the "Logout" Button Redirects Correctly
test("Verify redirection of logout link after user login", async ({ page }) => {
  await page.goto(url + "/login");
  await page.fill('input[name="email"]', "peter@abv.bg");
  await page.fill('input[name="password"]', "123456");
  await page.click('input[type="submit"]');

  const logoutLink = await page.$('a[href="javascript:void(0)"]');
  await logoutLink.click();

  const redirectURL = page.url();
  expect(redirectURL).toBe(url + "/catalog");
});
