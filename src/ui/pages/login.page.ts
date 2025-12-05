import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.page.locator("#signInPage");

  async fillCredentials(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailInput.fill(credentials.username);
    if (credentials.password) await this.passwordInput.fill(credentials.password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}




// import { Locator } from "@playwright/test";
// import { SalesPortalPage } from "./salesPortal.page";
// import { credentials, SALES_PORTAL_URL } from "config/env";

// export class LoginPage extends SalesPortalPage {
//   readonly welcomeText = this.page.locator(".welcome-text");
//   readonly emailInput = this.page.locator("#emailinput");
//   readonly passwordInput = this.page.locator("#passwordinput");
//   readonly loginButton = this.page.locator("button[type='submit']");
//   readonly uniqueElement = this.welcomeText;

//   async clickOnLoginButton() {
//     await this.loginButton.click();
//   }

//   async fillCredentials() {
//     await this.emailInput.fill(credentials.username);
//     await this.passwordInput.fill(credentials.password);
//   }

//   async open() {
//     await this.page.goto(SALES_PORTAL_URL);
//   }
// }
