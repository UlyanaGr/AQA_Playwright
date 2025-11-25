import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { loginSuccessSchema } from "data/schemas/products/login.schema"; 
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validation/validateResponse.utils";

// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

test.describe("[API Smoke] [Login]", () => {
    
    test("Should successfully login, validate schema and return token", async ({ loginApi }) => {
        const loginResponse = await loginApi.login(credentials);
        const headers = loginResponse.headers;
        const token = headers["authorization"]!;
        expect(token).toBeTruthy();
        // await expect(tokenHeader, "Authorization header (token) should be in response").toBeDefined();
        // await expect(tokenHeader, "Authorization header should not be empty").not.toBe("");

        validateResponse(loginResponse, {
            status: STATUS_CODES.OK,
            schema: loginSuccessSchema,
            IsSuccess: true,
            ErrorMessage: null
          });
        });
      });

