import { test, expect } from "fixtures/business.fixture";
import { SALES_PORTAL_URL } from "config/env";
import { generateMetricData } from "data/salesPortal/products/metrics/generateHomePageMetrics";
import { metricsCases, metricsDataMock } from "data/salesPortal/products/metrics/metricsCases";

// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics
//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных


test.describe("[Integration] [Sales Portal] [Metrics]", () => {
  test.beforeEach(async ({ loginAsAdmin, mock, homePage }) => {
    await mock.homePageMetrics({
      IsSuccess: true,
      ErrorMessage: null,
      Metrics: metricsDataMock
    });
    await loginAsAdmin();
    await homePage.waitForOpened();
  });

  for (const { title, locator, expectedValue } of metricsCases) {
    test(`[Home Page Metrics] ${title}`, async ({ homePage }) => {
      await expect(locator(homePage)).toHaveText(expectedValue);
    });
  }
});



// test.describe("[Integration] [Sales Portal] [Home Page Metrics]", () => {
//     test("Metrics: Orders This Year", async ({ loginAsAdmin, homePage, page, mock }) => {
//       const expectedMetricBody = generateMetricData();
//       const totalOrdersValue = expectedMetricBody.orders.totalOrders;  
  
//       await mock.homePageMetrics({
//         ErrorMessage: null,
//         IsSuccess: true,
//         Metrics: expectedMetricBody,
//       });
  
//       await loginAsAdmin();
//       await page.goto(SALES_PORTAL_URL + "home");
//       await homePage.waitForOpened();
//     await expect(homePage.ordersThisYear).toHaveText(String(totalOrdersValue));
//     });

//     test("Metrics: New Customers", async ({ loginAsAdmin, homePage, page, mock }) => {
//         const expectedMetricBody = generateMetricData();
//         const newCustomersValue = expectedMetricBody.customers.totalNewCustomers;  
    
//         await mock.homePageMetrics({
//           ErrorMessage: null,
//           IsSuccess: true,
//           Metrics: expectedMetricBody,
//         });
    
//         await loginAsAdmin();
//         await page.goto(SALES_PORTAL_URL + "home");
//         await homePage.waitForOpened();
//       await expect(homePage.newCustomers).toHaveText(String(newCustomersValue));
//       });

//       test("Metrics: Canceled Orders", async ({ loginAsAdmin, homePage, page, mock }) => {
//         const expectedMetricBody = generateMetricData();
//         const totalCanceledOrders = expectedMetricBody.orders.totalCanceledOrders;  
    
//         await mock.homePageMetrics({
//           ErrorMessage: null,
//           IsSuccess: true,
//           Metrics: expectedMetricBody,
//         });
    
//         await loginAsAdmin();
//         await page.goto(SALES_PORTAL_URL + "home");
//         await homePage.waitForOpened();
//       await expect(homePage.cancelledOrders).toHaveText(String(totalCanceledOrders));
//       });
// });