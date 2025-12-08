import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers]", async() => {
    let id = "";
    let token = "";

    test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });

    test("Create new customer with services", async ({ loginUIService, addNewCustomerUIService, customersListPage }) => {
        token = await loginUIService.loginAsAdmin();
        await addNewCustomerUIService.open();
        const createdCustomer = await addNewCustomerUIService.create()
        id = createdCustomer._id;
        await customersListPage.waitForOpened();
        await expect.soft(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
        await expect.soft(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
    });
});