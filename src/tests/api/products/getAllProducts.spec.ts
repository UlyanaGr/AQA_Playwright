import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";
import { IProductFromResponse } from "data/types/product.types";
// New schema:
import { GetAllProductsResponseSchema } from "data/schemas/products/getAllProducts.schema";


const { baseURL, endpoints } = apiConfig;

test.describe("[API Smoke] [GET All Products] [Products]", () => {
    let token = "";
    let createdProductId = "";

    test.afterEach(async ({ request }) => {
        // Deleting the created product after testing is completed
        if (createdProductId) {
            const response = await request.delete(
                `${baseURL}${endpoints.productById(createdProductId)}`,
                {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            expect(response.status()).toBe(STATUS_CODES.DELETED);
        }
    });

    test("GET All Products, validate schema and check the newly created product", async ({ request }) => {
        // LOGIN
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: { "content-type": "application/json" },
        });
        const loginBody = await loginResponse.json();
        expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect.soft(loginBody.IsSuccess).toBe(true);
        expect.soft(loginBody.ErrorMessage).toBe(null);
        expect.soft(loginBody.User.username).toBe(credentials.username);

        token = loginResponse.headers()["authorization"]!;
        expect(token).toBeTruthy();

        // CREATE PRODUCT
        const productData = generateProductData();
        const createProductResponse = await request.post(baseURL + endpoints.products, {
            data: productData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const createProductBody = await createProductResponse.json();
        
        // Checking the response (create product)
        await validateResponse(createProductResponse, {
            status: STATUS_CODES.CREATED,
            schema: createProductSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        const actualProductData = createProductBody.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
        createdProductId = actualProductData._id;
        expect(createdProductId).toBeTruthy();
        

        // GET All Products
        const getAllProductsResponse = await request.get(`${baseURL}${endpoints.productsAll}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const getAllProductsBody = await getAllProductsResponse.json();

        // Checking the response (Status, Schema, IsSuccess, and ErrorMessage)
        await validateResponse(getAllProductsResponse, {
            status: STATUS_CODES.OK,
            schema: GetAllProductsResponseSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });
        
        // Check that the response body array contains the Created product
        const newProductFound = getAllProductsBody.Products.some(
            (product: IProductFromResponse) => product._id === createdProductId
        );
        expect.soft(newProductFound).toBe(true);
        
        // IsSuccess and ErrorMessage 
        expect(getAllProductsBody.IsSuccess).toBe(true);
        expect(getAllProductsBody.ErrorMessage).toBeNull();
        
        // Check that array is not empty
        expect(getAllProductsBody.Products.length).toBeGreaterThan(0);
    });
});