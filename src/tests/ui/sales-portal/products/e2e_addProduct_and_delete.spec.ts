import { test, expect} from "fixtures/pages.fixture.js";
import { NOTIFICATIONS } from "data/salesPortal/notifications.js";
import { generateProductData } from "data/salesPortal/products/generateProductData.js";
import _ from "lodash";
// import { LoginPage } from "ui/pages/login.page.js";
// import { IProductInTable } from "data/types/product.types.js";

// Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal
// 2. Залогиниться с вашими кредами
// 3. Перейти на страницу Products List
// 4. Перейти на станицу Add New Product
// 5. Создать продукта
// 6. Проверить наличие продукта в таблице
// 7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
// 8. В модалке удаления кликнуть кнопку Yes, Delete
// 9. Дождаться исчезновения модалки и загрузки страницы
// 10. Проверить, что продукт отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления продукта
// - Подключить модалку в PageObject страницы Products
// - Использовать фикстуры


test.describe("[Sales Portal] [e2e test --> Add product and delete product]", () => {
    //test with fixtures version 1
    test("Product Details", async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {
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
    // const expectedPriceText = `$${productData.price}`;
    await expect(actualData.name, "Product name sshould be match").toEqual(productData.name);
    await expect(actualData.price, "Price should match").toEqual(productData.price);
    await expect(actualData.manufacturer, "Manufacturer should be match").toEqual(productData.manufacturer);
    // await expect(productsListPage.tableRowByIndex(0)).toBeVisible(); 
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    await productsListPage.deleteButton(productData.name).click();
        

    await productsListPage.deleteModal.waitForOpened();
    await productsListPage.deleteModal.clickConfirm(); // клик на кнопку Yes, Delete

    await productsListPage.deleteModal.waitForClosed();
    await productsListPage.waitForOpened();
    
   await expect(productsListPage.tableRowByName(productData.name), 
        "Deleted product row is not displayed in the table").toBeHidden();
});
});

