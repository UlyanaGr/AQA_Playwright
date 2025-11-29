import { generateMetricData } from "./generateHomePageMetrics";
import { HomePage } from "ui/pages/home.page";

export const metricsDataMock = generateMetricData();
export const { totalNewCustomers } = metricsDataMock.customers;
export const { totalOrders, totalCanceledOrders } = metricsDataMock.orders;

export const metricsCases = [
  {
    title: "Orders this Year",
    locator: (homePage: any) => homePage.ordersThisYear,
    expectedValue: totalOrders.toString()
  },
  {
    title: "New Customers",
    locator: (homePage: any) => homePage.newCustomers,
    expectedValue: totalNewCustomers.toString()
  },
  {
    title: "Cancelled Orders",
    locator: (homePage: any) => homePage.cancelledOrders,
    expectedValue: totalCanceledOrders.toString()
  }
];