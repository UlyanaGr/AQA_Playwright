import { test, expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { LoginPage } from "ui/pages/login.page";

// Разработать е2е теста со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

test.describe("[e2e test -> Add New Product] [Products]", () => {
  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    // Login page
    await loginPage.open();
    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();
    await homePage.waitForOpened();
    // await expect(homePage.welcomeText).toBeVisible();

    // Home Page -> Products List
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    // Add new Product
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_CREATED
    );

    // Верификация
    // Ожидаем, что getFirstRowProductData возвращает { name: string, price: number, manufacturer: string, createdOn: string }
    const actualData = await productsListPage.getFirstRowProductData();

    // 1. Проверка имени (string == string)
    await expect(actualData.name, "Product name should match").toEqual(
      productData.name
    );

    // 2. Проверка цены (number == number)
    // Если getFirstRowProductData парсит цену в число:
    await expect(actualData.price, "Price should match").toEqual(
      productData.price
    );

    // 3. Проверка производителя (string == string, или Enum)
    await expect(actualData.manufacturer, "Manufacturer should match").toEqual(
      productData.manufacturer
    );

    // 4: Проверка, что продукт является самым верхним (индекс 0) и дата создания не пуста.

    await expect(productsListPage.tableRowByIndex(0)).toBeVisible();
    await expect(actualData.createdOn, "CreatedOn field must be present").not.toBeFalsy();
  });
});
