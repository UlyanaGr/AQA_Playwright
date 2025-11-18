import { test, expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env"; 
import { STATUS_CODES } from "data/statusCodes";
import { loginSuccessSchema } from "data/schemas/products/login.schema"; 
import { validateResponse } from "utils/validateResponse.utils";
import { validateJsonSchema } from "utils/schema.utils";
import _ from "lodash";

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

const { baseURL, endpoints } = apiConfig; 

test.describe("[API Smoke] [Login]", () => {
    
    test("Should successfully login, validate schema and return token", async ({ request }) => {
        
        const loginResponse = await request.post(`${baseURL}${endpoints.login}`, {
            data: credentials, 
            headers: {
                "content-type": "application/json",
            },
        });

        
        await validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSuccessSchema,
            IsSuccess: true,
            ErrorMessage: null,
        });

        const headers = loginResponse.headers();
        const tokenHeader = headers["authorization"];
        
        await expect(tokenHeader, "Authorization header (token) should be in response").toBeDefined();
        await expect(tokenHeader, "Authorization header should not be empty").not.toBe("");


        // const headers = loginResponse.headers();
        // token = headers["authorization"]!;
        // expect(token).toBeTruthy();
    });
});

