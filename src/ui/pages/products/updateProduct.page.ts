import { AddNewProductPage } from "./addNewProduct.page";

export class EditProductPage extends AddNewProductPage {
  readonly saveChangesButton = this.page.locator("#save-product-changes");
  readonly deleteProductButton = this.page.locator("#delete-product-btn");

  async clickSaveChanges() {
    this.saveChangesButton.click();
  }

  async clickDelete() {
    this.deleteProductButton.click();
  }
}