import { SalesPortalPage } from "../salesPortal.page.js";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers.js";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly uniqueElement = this.addNewProductButton;
  readonly firstRow = this.page.locator("//tbody/tr[1]");

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getFirstRowProductData() {
    const row = this.firstRow;
        
        const name = await row.locator('td:nth-child(1)').innerText();
        const priceText = await row.locator('td:nth-child(2)').innerText();
        const manufacturer = await row.locator('td:nth-child(3)').innerText();
        
        return {
            name: name.trim(),
            price: priceText.trim(),
            manufacturer: manufacturer.trim(),
        };
    }
}