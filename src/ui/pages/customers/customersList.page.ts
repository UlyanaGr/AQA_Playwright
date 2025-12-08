import { CustomersTableHeader, ICustomerInTable } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";
import { COUNTRY } from "data/salesPortal/customers/countries";

export class CustomersListPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByEmail = (email: string) => this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: email }) });
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(0);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: CustomersTableHeader) => this.tableHeader.filter({ hasText: name });
  readonly tableHeaderArrow = (name: CustomersTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");


  readonly uniqueElement = this.addNewCustomerButton;

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-customer");

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(customerEmail: string): Promise<ICustomerInTable> {
    const [email, name, country, createdOn] = await this.tableRowByEmail(customerEmail).locator("td").allInnerTexts();
    return {
     email: email!,
      name: name!,
      country: country! as COUNTRY,
      createdOn: createdOn!,
    };
  }

  async getTableData(): Promise<ICustomerInTable[]> {
      const data: ICustomerInTable[] = [];

      const rows = await this.tableRow.all();
      for (const row of rows) {
        const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
        data.push({
          email: email!,
          name: name!,
          country: country! as COUNTRY,
          createdOn: createdOn!,
        });
      }
      return data;
    }

    async clickAction(customerEmail: string, button: "edit" | "delete" | "details") {
    if(button === "edit") await this.editButton(customerEmail).click();
    if (button === "delete") await this.deleteButton(customerEmail).click();
    if (button === "details") await this.detailsButton(customerEmail).click();
  }

  async clickTableHeader(name: CustomersTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}
