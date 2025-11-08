// Разработать тест со следующими шагами:
//   - открыть https://anatoly-karpovich.github.io/demo-login-form/
//   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
//   - Залогиниться с данными что вы вставили в localStorage
//   - Завалидировать успешный логин

//   Рекоммендации:
//   - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

import { test, expect } from '@playwright/test';
import { beforeEach } from "node:test";

test.describe("[heroku App] [Login form + LocalStorage]", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
  });

  test("LocalStorage", async ({ page }) => {
    
      const buttonSubmit = page.locator("input#submit");
      const successMessage = page.locator('#successMessage');
      const inputUsername = page.locator("input#userName");
      const inputPassword = page.locator("input#password");

    const credentials = {
      name: "test@gmail.com",
      password: "SecretPw123!@#",
    };

    
      await page.evaluate((creds) => {
        localStorage.setItem(creds.name, JSON.stringify(creds))
    }, credentials);

    await page.reload();
    await inputUsername.fill(credentials.name);
    await inputPassword.fill(credentials.password);
    await buttonSubmit.click();
    await expect(page.locator("#successMessage")).toHaveText(`Hello, ${credentials.name}!`);
  });
});
