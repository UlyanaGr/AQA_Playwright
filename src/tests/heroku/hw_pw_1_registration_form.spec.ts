import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";


interface IRegstrationFormInputs {
    userFirstName: string;
    userLastName: string;
    userAddress: string;
    userEmailAddress: string;
    userPhone: string;
    language: string;
    userPassword: string;
    userConfirmPassword: string;
}


test.describe("[anatoly-karpovich website] [Registration Form]", () => {
    const validInputs: IRegstrationFormInputs = {
        userFirstName: "Ulyana",
        userLastName: "AQA",
        userAddress: "Test Address",
        userEmailAddress: "user@gmail.com",
        userPhone: "2355555",
        language: "English",
        userPassword: "TestPassword!",
        userConfirmPassword: "TestPassword!",
    };


    test.beforeEach(async ({page}) => {
            const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
            await page.goto(url);
        })

test("Should successfully registered with valid values", async ({ page }) => {
     
        const userFirstName = page.locator('#firstName');
        const userLastName = page.locator('input[id="lastName"]');
        const userAddress = page.locator('textarea[id="address"]');
        const userEmailAddress = page.locator('input[id="email"]');
        const userPhone = page.locator('input[id="phone"]');
        const dropdownCountry = page.locator("#country"); 
        const userGenderRadio = page.locator("input[name=\'gender\']");
        const userHobbiesCheckbox = page.locator('input[type="checkbox"][class="hobby"]');
        const language = page.locator("input[id='language']");
        const skillsDropdown = page.locator("#skills");
        const dateOfBirthYear = page.locator("#year");
        const dateOfBirthMonth = page.locator("#month");
        const dateOfBirthDay = page.locator("#day");
        const userPassword = page.locator('input[id="password"]');
        const userConfirmPassword = page.locator('input[id="password-confirm"]');
        const buttonSubmit = page.locator('button[type="submit"][class="btn btn-primary"]');
        const pageTitle = page.locator('h2[class="text-center"]');
        
       
        await page.waitForTimeout(2000);
        await userFirstName.fill(validInputs.userFirstName);
        await userLastName.fill(validInputs.userLastName);
        await userAddress.fill(validInputs.userAddress);
        await userEmailAddress.fill(validInputs.userEmailAddress);
        await userPhone.fill(validInputs.userPhone);

        // dropdown list "Country"
        await dropdownCountry.selectOption("USA");
        await expect(dropdownCountry).toHaveValue("USA");

        // radio button Gender
        await page.getByRole('radio').nth(1).click();

        // checkbox 
        await page.getByRole('checkbox').nth(2).click();

        await language.fill(validInputs.language);

        // dropdown Skills
        await skillsDropdown.selectOption("JavaScript");
        await expect(skillsDropdown).toHaveValue("JavaScript");

        // dropdown Year
        await dateOfBirthYear.selectOption("2000");
        await expect(dateOfBirthYear).toHaveValue("2000");

         // dropdown Month
         await dateOfBirthMonth.selectOption("September");
         await expect(dateOfBirthMonth).toHaveValue("September");

          // dropdown Day
        await dateOfBirthDay.selectOption("20");
        await expect(dateOfBirthDay).toHaveValue("20");

        await userPassword.fill(validInputs.userPassword);
        await userConfirmPassword.fill(validInputs.userConfirmPassword)

        await buttonSubmit.click();
        await expect(pageTitle).toHaveText("Registration Details");
        
        
    });
})