// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное


import { test, expect } from '@playwright/test';
import { beforeEach } from "node:test";

// импорт ts файла =>
import invalidCredentialsData from './data/demo_register_form/credentials_data.data';


test.describe("[Demo Login Form] [Registration with invalid credentials => DDT]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

    

        for (const { title, credentials, message } of invalidCredentialsData) {
          test(title, async ({ page }) => {
        
        await page.goto(url);
        const registerButtonOnLogin = page.locator(
          '.loginForm input[value = "Register"]'
        );
        await expect(registerButtonOnLogin).toBeVisible({ timeout: 20000 });
        await registerButtonOnLogin.click();

        const registerFormTitle = page.locator("h2#registerForm");
        await expect(registerFormTitle).toBeVisible({ timeout: 20000 });

        const usernameInputOnRegistration = page.locator(
          'input[id="userNameOnRegister"]'
        );
        const passwordInputOnRegistration = page.locator(
          'input[id="passwordOnRegister"]'
        );
        const registerButtonOnRegistration = page.locator(
          "input#register.button"
        );
        const notification = page.locator("#errorMessageOnRegister");

        const { username, password } = credentials;
        await usernameInputOnRegistration.fill(username);
        await passwordInputOnRegistration.fill(password);
        await registerButtonOnRegistration.click();
        // await page.waitForTimeout(1000);
        await expect(notification).toContainText(message);
      });
    }
}); 