import { Page } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salesPortal.page.js"; 


export class DeleteModal extends SalesPortalPage {
    readonly uniqueElement = this.page.locator('[role="dialog"]').filter({ hasText: 'Delete Product' });

    readonly title = this.uniqueElement.locator('h5');
    readonly confirmButton = this.uniqueElement.getByRole('button', { name: 'Yes, Delete' });
    readonly cancelButton = this.uniqueElement.getByRole('button', { name: 'Cancel' });
    
    constructor(page: Page) {
        super(page);
   }
   
   async waitForOpened() {
       await this.uniqueElement.waitFor({ state: 'visible' });
   }

   async waitForClosed() {
       await this.uniqueElement.waitFor({ state: 'hidden' });
   }

   async clickConfirm() { // clickOnConfirmButton
       await this.confirmButton.click();
   }

   async clickCancel() {
       await this.cancelButton.click();
   }
}
