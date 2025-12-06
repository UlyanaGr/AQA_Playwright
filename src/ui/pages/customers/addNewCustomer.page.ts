import { ICustomer } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewCustomerPage extends SalesPortalPage {
    readonly title = this.page.locator("h2.page-title-text");
    readonly customerEmail = this.page.locator("#inputEmail");
    readonly customerName = this.page.locator("#inputName");
    readonly customerCountry = this.page.locator("#inputCountry");
    readonly customerCity = this.page.locator("#inputCity");
    readonly customerStreet = this.page.locator("#inputStreet");
    readonly customerHouse = this.page.locator("#inputHouse");
    readonly customerFlat = this.page.locator("#inputFlat");
    readonly customerPhone = this.page.locator("#inputPhone");
    readonly customerNotes = this.page.locator("#textareaNotes");
    readonly saveCustomerButton = this.page.locator("#save-new-customer");
    readonly uniqueElement = this.title;

    async fillForm(customerData: Partial<ICustomer>) {
        if (customerData.email) await this.customerEmail.fill(customerData.email);
        if (customerData.name) await this.customerName.fill(customerData.name);
        if (customerData.country) await this.customerCountry.selectOption(customerData.country);
        if (customerData.city) await this.customerCity.fill(customerData.city);
        if (customerData.street) await this.customerStreet.fill(customerData.street);
        if (customerData.house) await this.customerHouse.fill(customerData.house.toString());
        if (customerData.flat) await this.customerFlat.fill(customerData.flat.toString());
        if (customerData.phone) await this.customerPhone.fill(customerData.phone);
        if (customerData.notes) await this.customerNotes.fill(customerData.notes);
    }

    async clickSave() {
        await this.saveCustomerButton.click()
    }
}