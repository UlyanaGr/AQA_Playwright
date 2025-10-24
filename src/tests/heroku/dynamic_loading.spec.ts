import test, { expect } from "@playwright/test";

test.describe("[heroku App] [Dynamic Loading]", () => {
  test("Get by text/role", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    await page.goto(url);

    // поиск ссылки по названию
    const link = page.getByRole("link", { name: "Dynamic Loading" });
    await link.click();
    const heading = page.getByRole("heading");

    // expect который проверит текст
    const expectedText = "Dynamically Loaded Page Elements";
    await expect(heading).toHaveText(expectedText);

    // const example1 = page.getByText('Example 1: Element on page that is hidden');
    // await expect(example1).toHaveText('Example 1: Element on page that is hidden');

    // поиск по части текста
    const example1 = page.getByText("Example 1", { exact: false });
    await expect(example1).toBeInViewport();
    // чтобы удостовериться, что элемент точно находится в зоне видимости юзера
  });

  // Поиск по Тексту
  test("Get By Label", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/login";
    await page.goto(url);
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { name: "Login" }).click();

    // await page.getByTitle('Submit'); поиск по тексту тултипа. Title - аттрибут, который м.б у любого html элемента;
    // await page.getByPlaceholder('Enter your username'); поиск по тексту плэйсхолдера

    // если картинка не подгрузилась, нужно что-то альтернативное на фронт выводить
    // await page.getByAltText('Please wait. The page is loading');
  });

  test("Advanced locator", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);

    const form = page.locator("form", {
      // hasText: '',
      // hasNotText: '', поиск по тому элементу, которого НЕТ в тексте

      // аттрибут has позволяет искать по вложенному элементу
      has: page.locator("input#userName"),
    });
    // от формы двигаемся к инпуту
    const usernameInput = form.locator("input#userName");
  });

  test("Waits with expect", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/dynamic_loading";
    await page.goto(url);
    await page.locator('a[href="/dynamic_loading/2"]').click();
    await page.getByRole("button", { name: "Start" }).click();
    // const text = await page.locator('#finish').getByRole('heading', {level: 4}).innerText();
    // console.log(text);

    // toHaveText  ждёт ровно 5 сек, поэтому выставляем доп параметром ожидание:
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    // await expect(heading).toBeVisible({timeout: 20000});

    const loader = page.locator("#loading");
    await expect(loader).toBeVisible();
    const isDisplayed = loader.isVisible();
    // возвращает булевое значение, что лоудер отображается или нет
    console.log(isDisplayed);
    await expect(loader, "Waiting for load bar to disappear").toBeVisible({
      visible: false,
      timeout: 20000,
    });
    await expect(heading).toHaveText("Hello World!");

    // Можно добавлять парамер timeout  внутрь в toHaveText:
    // await expect(heading).toHaveText('Hello World!', {timeout: 20000});
  });

  test("Explicit wait", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading");
    await page.getByRole("link", { name: "Example 1" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    const heading = page.locator("#finish").getByRole("heading", { level: 4 });
    await heading.waitFor({ state: "visible", timeout: 20000 });
    await expect(heading).toHaveText("Hello World!");
  });

  test("Custom waits", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    await page.getByRole("button", { name: "Remove" }).click();

    // input[label='blah'] - checkbox hides
    // "#checkbox-example > button"
    // p#message - is visible

//     await page.waitForFunction(
//       () => {
//         const checkbox = document.querySelector("input[label='blah']");
//         const buttonText = document.querySelector(
//           "#checkbox-example > button"
//         )?.textContent;
//         const message = document.querySelector(
//           "#checkbox-example > #message"
//         )?.textContent;

//         return !checkbox && buttonText === "Add" && message === "It's gone!";
//       },
//       "",
//       { timeout: 10000 }
//     );
//   });
// });


await page.waitForFunction(
    (selectors: {checkbox: string, button:string, label: string}) => {
      const checkbox = document.querySelector(selectors.checkbox);
      const buttonText = document.querySelector(selectors.button)?.textContent;
      const message = document.querySelector(selectors.label)?.textContent;

      return !checkbox && buttonText === "Add" && message === "It's gone!";
    },
    {checkbox: "input[label='blah']", button: "#checkbox-example > button", label: "p#message"},
    { timeout: 10000 }
  );
});

test("Soft", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes");
    const title = page.locator('h3');

    // const checkbox = (index: number) => page.locator(`//input[@type=checkbox][${index}]`);
    // const checkbox1 = page.locator("//input[@type=checkbox][1]");
    // const checkbox2 = page.locator("//input[@type=checkbox][2]");

    await expect.soft(title).toHaveText('Checkboxes');
    const form = page.locator('form#checkboxes');
    const formText = await form.innerText();
    const checkboxesTexts = formText!.split('\n').map((el) => el.trim);
    expect.soft(checkboxesTexts[0], 'Check text content for checkbox 1').toBe('checkbox 1');
    expect.soft(checkboxesTexts[1], 'Check text content for checkbox 2').toBe('checkbox 2');

    // await expect(checkbox(1)).toHaveValue('checkbox 1');
    // await expect(checkbox(2)).toHaveValue('checkbox 2');


});

});