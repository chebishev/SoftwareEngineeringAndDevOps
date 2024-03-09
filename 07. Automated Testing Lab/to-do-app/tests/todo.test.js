const { test, expect } = require('@playwright/test');
const appAddress = 'http://127.0.0.1:5500/07.%20Automated%20Testing/to-do-app/';

// Verify if the user can add a new task
test("User can add a new task", async ({ page }) => {
    await page.goto(appAddress);
    await page.fill("#task-input", "Buy milk");
    await page.click("#add-task");
    const taskText = await page.textContent(".task");
    expect(taskText).toContain("Buy milk");
});

//Verify if the user can delete a task
test("User can delete a task", async ({ page }) => {
    // Add a task
    await page.goto(appAddress);
    await page.fill("#task-input", "Buy chips");
    await page.click("#add-task");

    // Delete the task
    await page.click(".task .delete-task");

    const tasks = await page.$$eval(".task", tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain("Buy chips");
});

// Verify if the user can complete a task
test("User can complete a task", async ({ page }) => {
    // Add a task
    await page.goto(appAddress);
    await page.fill("#task-input", "Buy bread");
    await page.click("#add-task");

    // Complete the task
    await page.click(".task .task-complete");
    const completedTasks = await page.$(".completed.task");
    expect(completedTasks).not.toBeNull();
});

// Verify if the user can filter the tasks
test("User can filter the tasks", async ({ page }) => {
    // Add task
    await page.goto(appAddress);
    await page.fill("#task-input", "Buy bread");
    await page.click("#add-task");

    // Mark a task as completed
    await page.click(".task .task-complete");

    // Filter tasks
    await page.selectOption("#filter", "Completed");
    const incompleteTask = await page.$(".task:not(.completed)");
    expect(incompleteTask).toBeNull();
});