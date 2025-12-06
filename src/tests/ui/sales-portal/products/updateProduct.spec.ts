import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { expect, test } from "fixtures/business.fixture";
import _ from "lodash";

test.describe("[Sales Portal] [e2e test => Edit Product]", () => {
  let id = "";
  let token = "";

  test("Update product with services", async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
    editProductPage
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    await productsListUIService.open();
    await productsListPage.clickAction(createdProduct.name, "edit");
    await editProductPage.waitForOpened();

    const updatedProductData = generateProductData();
    await editProductPage.fillForm(updatedProductData);
    await editProductPage.clickSaveChanges();

    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_UPDATED
    );
    await expect(
      productsListPage.tableRowByName(updatedProductData.name)
    ).toBeVisible();

    const updatedTableRow = _.omit(
      await productsListPage.getProductData(updatedProductData.name),
      ["createdOn"]
    );
    expect(updatedTableRow).toEqual(
      _.omit(updatedProductData, ["amount", "notes"])
    );

    await productsListUIService.openDetailsModal(updatedProductData.name);
    //await productsListPage.clickAction(updatedProductData.name, "details");
    await productsListPage.detailsModal.waitForOpened();
    const actualDetails = _.omit(
      await productsListPage.detailsModal.getData(),
      ["createdOn"]
    );
    expect(actualDetails).toEqual(updatedProductData);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});