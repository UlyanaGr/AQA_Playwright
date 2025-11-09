// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method


import { test, expect } from '@playwright/test';
import { LoginPage } from "ui/pages/login.page.js";
// import { SalesPortalPage } from "ui/pages/salesPortal.page.js";
// import { HomePage } from "ui/pages/home.page.js";

test.describe("[Sign-in Form]", () => {
  
    test('Sign in', async ({ page }) => {
        
        const loginPage = new LoginPage(page);
        await loginPage.open();    
        await expect(loginPage.emailInput).toBeVisible();
        await loginPage.fillCredentials();
        await loginPage.clickOnLoginButton();
        await loginPage.waitForOpened();
        await expect(loginPage.welcomeText).toBeVisible();

    });
  }); 



