// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Сайт: https://the-internet.herokuapp.com/tables


import { test, expect, Page } from "@playwright/test"
import expectedTable, { ITableRowData } from "../data/table_data/get_table_row.data"


async function getTableRow(page: Page, email: string) {
    const table = page.locator('#table2');
    const headersLocators = await table.locator("th").all();
    headersLocators.pop();
    const headers = await Promise.all(
      headersLocators.map((el) => el.innerText())
    );

    const rowLocator = table.locator("tbody tr").filter({ hasText: email })
    const cellLocator = await rowLocator.locator("td").all();
    const cells = await Promise.all(cellLocator.map(el => el.innerText()));

    const rowData = headers.reduce <Record<string, string>> ((result, header, i) => {
      result[header] = cells[i] ?? "";
      return result;
  }, {});
  return rowData;
}

// Тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

test("Validate getTableRow function for ALL emails in Example 2 table", async ({
  page,
}) => {
  const url = "https://the-internet.herokuapp.com/tables";
  await page.goto(url);

  const table = page.locator("#table2");
  const emails = await table
    .locator("tbody tr td:nth-child(3)")
    .allInnerTexts(); // ВСЕ email-адреса таблицы

  for (const email of emails) {
    const expectedRowData = (expectedTable as ITableRowData[]).find(
      (row) => row.Email === email
    ); // Поиск строки в массиве 'expectedTable' по полю 'Email'

    expect(
      expectedRowData,
      `Expected email ${email} was not found in the array of expectedTable.`
    ).toBeDefined();

    const actualRowData = await getTableRow(page, email); //вызов Функции
    expect(actualRowData).not.toBeNull();
    expect(actualRowData).toEqual(expectedRowData);
  }
});
    

  



