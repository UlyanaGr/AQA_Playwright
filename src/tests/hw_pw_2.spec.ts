// import test from "@playwright/test";
import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("[heroku App] [Dynamic Controls]", () => {
    test("Find link Get by role", async ({page}) => {
        const url = "https://the-internet.herokuapp.com/";
        await page.goto(url);
        // const link = page.getByRole("link", {name: "Dynamic Controls"});
        // const link = page.locator('a[href="/dynamic_controls"]');
        const link = page.getByRole('link', { name: 'Dynamic Controls' }).filter({ has: page.locator('a[href="/dynamic_controls"]') });
        await link.click();

        const buttonRemove = page.getByRole('button', { name: 'Remove' });
        await expect(buttonRemove).toBeVisible();

        
    })
});