import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import positiveChecks from "data/salesPortal/products/createPositiveChecks";

test.describe("[API] [Sales Portal] [Products Positive Checks]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
    expect(token).toBeTruthy();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const { title, value } of positiveChecks) {
    test(`[Positive] Should return 201 for valid data: ${title}`, async ({
      productsApi,
    }) => {
      const productDataValid = generateProductData(value);
      const createdProduct = await productsApi.create(productDataValid, token);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const actualProductData = createdProduct.body.Product;
      expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(
        productDataValid
      );
    });
  }
});
