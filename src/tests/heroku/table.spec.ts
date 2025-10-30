import test, { expect } from "@playwright/test";
import { beforeEach } from "node:test";

test.describe("[Heroku app] [Table]", () => {
  const url = "https://the-internet.herokuapp.com/";

  test("Single locator with more than 1 element", async ({ page }) => {
    await page.goto(url);
    const allLInks = page.locator("ul li a");
    const linksWithAltText = allLInks.filter({ hasText: "a" }); //возвращает локаторы
    const firstElement = allLInks.first(); //этот метод вернёт первый из соответствующих элементов
    console.log(await firstElement.innerText());

    const lastElement = allLInks.last(); //этот метод вернёт последний из соответствующих элементов
    console.log(await lastElement.innerText());

    const secondElement = allLInks.nth(1); //для поиска второго элемента
    console.log(await secondElement.innerText());

    const numberOfLinks = await allLInks.count(); //возвращает количество элементов, которое соответствует данному селектору
    const numberOfFilteredLinks = await linksWithAltText.count();

    console.log(numberOfLinks);
    console.log(numberOfFilteredLinks);

    await expect(allLInks).toHaveCount(44); //позволяет удостовериться, что изначально ссылок = 44
  });

  test("Array of locators", async ({ page }) => {
    await page.goto(url);
    const allLInks = page.locator("ul li a");
    const arrayOfLinks = await allLInks.all();

    // Способ 1: делать через Promise.all()
    // const texts = await Promise.all(arrayOfLinks.map((link) => link.innerText()));
    // console.log(texts);

    // Способ 2: делать через цикл for:
    for (const link of arrayOfLinks) {
      console.log(await link.innerText);
    }
  });

  test("Parse Table data", async ({ page }) => {

    const expectedTable = [
      {
          "Last Name": "Smith",
          "First Name": "John",
          "Email": "jsmith@gmail.com",
          "Due": "$50.00",
          "Web Site": "http://www.jsmith.com"
      },
      {
          "Last Name": "Bach",
          "First Name": "Frank",
          "Email": "fbach@yahoo.com",
          "Due": "$51.00",
          "Web Site": "http://www.frank.com"
      },
      {
          "Last Name": "Doe",
          "First Name": "Jason",
          "Email": "jdoe@hotmail.com",
          "Due": "$100.00",
          "Web Site": "http://www.jdoe.com"
      },
      {
          "Last Name": "Conway",
          "First Name": "Tim",
          "Email": "tconway@earthlink.net",
          "Due": "$50.00",
          "Web Site": "http://www.timconway.com"
      }
  ]

    await page.goto("https://the-internet.herokuapp.com/tables");
    const table = page.locator("#table1");

    const headersLocators = await table.locator("th").all();
    headersLocators.pop();
    const headers = await Promise.all(
      headersLocators.map((el) => el.innerText())
    );
    console.log(headers);

    const tableRow = await table.locator("tbody tr").all(); // локатор, который резолвает целую строку таблицы
    const tableData: Record<string, string>[] = [];
    for (const row of tableRow) {
      //вытянуть значения
      //создать объект
      //впушить объект в дату

      const cellLocators = await row
        .locator("td")
        .filter({ hasNot: page.locator("a") });
      const cells = await cellLocators.allInnerTexts();

      const rowData = headers.reduce<Record<string, string>>(
        (result, header, i) => {
          result[header] = cells[i]!;
          return result;
        },
        {}
      );
      tableData.push(rowData);
    }
    //завалидировать, что данная таблица содержит все правильные данные
    expect(expectedTable.length, `Number of rows in table should be ${expectedTable.length}`).toBe(tableData.length);

    expectedTable.forEach((el, i) => {
      expect(el, `Expected table row should be equal to actual`).toEqual(tableData[i]);
    })

  });
});
console.log("Тест запущен");

