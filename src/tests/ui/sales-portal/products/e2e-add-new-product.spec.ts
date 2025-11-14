import { test, expect } from '@playwright/test';
import { credentials } from "config/env.js"; 
import { NOTIFICATIONS } from "data/salesPortal/notifications.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import { HomePage } from "ui/pages/home.page.js";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page.js";
import { ProductsListPage } from "ui/pages/products/productsList.page.js";
import { LoginPage } from "ui/pages/login.page.js";

// Разработать е2е теста со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)



test.describe("[e2e test -> Add New Product] [Products]", async () => {

  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    //login page
    await loginPage.open();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.fillCredentials();
    await loginPage.clickOnLoginButton();
    await loginPage.waitForOpened();
    await expect(loginPage.welcomeText).toBeVisible();
    
    // Home Page
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    // Add new Product
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    // Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)
    const actualData = await productsListPage.getFirstRowProductData();
    const expectedPriceText = `$${productData.price}`;
    await expect(actualData.name, "Product name sshould be match").toEqual(productData.name);
    await expect(actualData.price, "Price should be match").toEqual(expectedPriceText);
    await expect(actualData.manufacturer, "Manufacturer should be match").toEqual(productData.manufacturer);
    await expect(productsListPage.firstRow).toBeVisible();

  });
});