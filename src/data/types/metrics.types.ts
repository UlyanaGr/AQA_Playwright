import { IResponseFields } from "./core.types";

export interface IHomePageMetrics extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrdersMetrics;
  customers: ICustomersMetrics;
  products: IProducts;
}

export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number; // Orders This Year
  averageOrderValue: number;
  totalCanceledOrders: number; // Canceled Orders
  recentOrders: [];
  ordersCountPerDay: [];
}

export interface ICustomersMetrics {
  totalNewCustomers: number; //New Customers
  topCustomers: any; 
  customerGrowth: any; 
}

export interface IProducts {
  topProducts: any;
}
