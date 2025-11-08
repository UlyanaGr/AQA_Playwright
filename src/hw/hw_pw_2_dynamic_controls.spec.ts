// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!


import { test, expect } from '@playwright/test';

test.describe("[heroku App] [Dynamic Controls]", () => {
    test("Find link Get by role", async ({page}) => {
        const url = "https://the-internet.herokuapp.com/";
        const link = page.getByRole("link", {name: "Dynamic Controls"});
        // const link = page.locator('a[href="/dynamic_controls"]');
        const buttonRemove = page.getByRole('button', { name: 'Remove' });
        const title = page.getByRole("heading", { name: 'Dynamic Controls' });
        const subTitle = page.locator("p");
        const checkbox1 = page.locator('div#checkbox > input[type="checkbox"]');
        // const buttonRemoveLocator = page.locator('//button[@type="button"]');
        const buttonAdd = page.getByRole('button', { name: 'Add' });
        const messageGone = page.locator('p#message');
        const checkbox2 = page.locator('//input[@type="checkbox"][@id="checkbox"]');
        const messageBack = page.locator('#message');



        await page.goto(url);
        await link.click();
        await expect(buttonRemove).toBeVisible({timeout: 20000});
        await expect(title, "Check the page title").toHaveText('Dynamic Controls');
        await expect(subTitle, "Check the subtitle text").toHaveText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.');
        await checkbox1.check();
        await checkbox1.uncheck();
        await buttonRemove.click();
        await expect(checkbox1, 'checking if a checkbox1 has disappeared').toBeHidden({timeout: 20000});
        await expect(buttonAdd, 'checking for button appearance').toBeInViewport({timeout: 20000});
        await expect(messageGone, 'Check the message').toHaveText("It's gone!");
        await buttonAdd.click();
        await expect(checkbox2, 'checking for checkbox2 appearance').toBeVisible({timeout: 20000});
        await expect(messageBack).toHaveText("It's back!");
    });
});
