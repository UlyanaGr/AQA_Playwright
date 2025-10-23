import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";



interface ICredentials {
    username: string;
    password: string;
}


enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    INVALID_PASSWORD = "Invalid credentials",
    INVALID_USERNAME = "Invalid credentials",
    EMPTY_CREDENTIALS = "Credentials are required",
    SHORT_PASSWORD = "Password should contain at least 8 characters",
    SHORT_USERNAME = "Username should contain at least 3 characters"
    
}

test.describe("[anatoly-karpovich website] [Login Form]", () => {

    const validCredentials: ICredentials[] = [{
        username: "Ula",
        password: "TestPass"
    },
    {
        username: "Ulyana_QA_test1234",
        password: "TestPassword_test,*^)"
    },
    {
        username: "TestUserNameWithExactlyFortyCharacte",
        password: "TestPasswordExample123"
    }];

     
    

    test.beforeEach(async ({page}) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url);
        

    })

    test("Should register with userName length = 3 and userPassword length = 8", async ({ page }) => {
     
        const registerButton = page.locator('input[id="register"]');
        const usernameInputOnRegister = page.locator('input[id="userNameOnRegister"]');
        const passwordInputOnRegister = page.locator('input[id="passwordOnRegister"]');
        const registerButtonOnLogin = page.locator("input[id='registerOnLogin']");
        const notification = page.locator('#errorMessageOnRegister');
        
       
        await registerButtonOnLogin.click();
        const {username, password} = validCredentials[0]!
        await usernameInputOnRegister.fill(username);
        await passwordInputOnRegister.fill(password);
        await registerButton.click();
        // await page.waitForTimeout(1000);
        await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        
    });

    test("Should register with LONG userName AND LONG userPassword with special symbols numbers", async ({ page }) => {
     
        const registerButton = page.locator('input[id="register"]');
        const usernameInputOnRegister = page.locator('input[id="userNameOnRegister"]');
        const passwordInputOnRegister = page.locator('input[id="passwordOnRegister"]');
        const registerButtonOnLogin = page.locator("input[id='registerOnLogin']");
        const notification = page.locator('#errorMessageOnRegister');
        
       
       await registerButtonOnLogin.click();
       const {username, password} = validCredentials[1]!
       await usernameInputOnRegister.fill(username);
       await passwordInputOnRegister.fill(password);
       await registerButton.click();
       // await page.waitForTimeout(1000);
       await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        
    });

    test("Should register with userName = 40 characters AND userPassword = 20 characters", async ({ page }) => {
     
        const registerButton = page.locator('input[id="register"]');
        const usernameInputOnRegister = page.locator('input[id="userNameOnRegister"]');
        const passwordInputOnRegister = page.locator('input[id="passwordOnRegister"]');
        const registerButtonOnLogin = page.locator("input[id='registerOnLogin']");
        const notification = page.locator('#errorMessageOnRegister');
        
       
       await registerButtonOnLogin.click();
       const {username, password} = validCredentials[2]!
       await usernameInputOnRegister.fill(username);
       await passwordInputOnRegister.fill(password);
       await registerButton.click();
       // await page.waitForTimeout(1000);
       await expect(notification).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
        
    });

});


