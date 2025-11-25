import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProductFromResponse } from "data/types/product.types";
// New schema:
import { GetAllProductsResponseSchema } from "data/schemas/products/getAllProducts.schema";

test.describe("[API Smoke] [GET All Products] [Products]", () => {
  let token = "";
  let id = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("GET All Products, validate schema and check the newly created product", async ({
    loginApiService,
    productsApi,
  }) => {
    // token = (await loginApiService.loginAsAdmin())!;
    token = await loginApiService.loginAsAdmin();
    expect(token).toBeTruthy();

    const productData = generateProductData();
    const createProductBody = await productsApi.create(productData, token);
    validateResponse(createProductBody, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createProductBody.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

    id = actualProductData._id;

    // GET All Products
    const getAllProductsResponse = await productsApi.getAll(token);
    validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: GetAllProductsResponseSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // Check that the response body array contains the Created product
    const getAllProductsResponseBody = await getAllProductsResponse.body;
    const newProduct = await getAllProductsResponseBody["Products"].find(
      (object: IProductFromResponse) => object._id === id
    );

    expect(_.omit(newProduct, ["_id", "createdOn"])).toEqual(productData);

    // CHECK that the response body array contains the Created product
    // const newProductFound = getAllProductsBody.Products.some(
    //     (product: IProductFromResponse) => product._id === createdProductId
    // );
    // expect.soft(newProductFound).toBe(true);
    
    // // IsSuccess and ErrorMessage 
    // expect(getAllProductsBody.IsSuccess).toBe(true);
    // expect(getAllProductsBody.ErrorMessage).toBeNull();
    
    // // Check that array is not empty
    // expect(getAllProductsBody.Products.length).toBeGreaterThan(0);
  });
});


