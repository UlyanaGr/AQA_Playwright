import { Locator, Page } from "@playwright/test";

export class DeleteModal {
    private readonly modal: Locator;
    
    readonly title: Locator;
    readonly confirmButton: Locator; 
    readonly cancelButton: Locator;
    
    constructor(page: Page) {
        this.modal = page.locator('[role="dialog"]').filter({ hasText: 'Delete Product' });
        this.title = this.modal.locator('h5');
        this.confirmButton = this.modal.getByRole('button', { name: 'Yes, Delete' });
        this.cancelButton = this.modal.getByRole('button', { name: 'Cancel' });
    }

    async waitForOpened() {
        await this.modal.waitFor({ state: 'visible' });
    }

   async waitForClosed() {
        await this.modal.waitFor({ state: 'hidden' });
    }

    async confirmDelete() {
        await this.confirmButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }
}