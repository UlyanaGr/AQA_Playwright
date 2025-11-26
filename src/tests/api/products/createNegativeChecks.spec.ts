import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import negativeChecks from "data/salesPortal/products/createNegativeChecks";


test.describe("[API] [Sales Portal] [Products Negative Checks]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
    expect(token).toBeTruthy();
});

 test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const { title, value } of negativeChecks) {

   
    test(`[Negative] Should return 400 for invalid data: ${title}`, async ({ productsApi }) => {
      const productDataInvalid = generateProductData(value);
      const createdProduct = await productsApi.create(productDataInvalid, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        IsSuccess: false,
        ErrorMessage: "Incorrect request body"
      })
    })
  }
  })