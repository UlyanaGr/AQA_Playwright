import { faker } from "@faker-js/faker";
import { IMetrics, IOrdersMetrics, ICustomersMetrics, IProducts } from "data/types/metrics.types"; 


export function generateOrdersMetrics(params?: Partial<IOrdersMetrics>): IOrdersMetrics {
    return {
        totalRevenue: faker.number.int({ min: 0, max: 10000 }),
        totalOrders: faker.number.int({ min: 0, max: 100 }),
        averageOrderValue: faker.number.int({ min: 0, max: 100 }),
        totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
        recentOrders: [], 
        ordersCountPerDay: [],
        ...params,
    };
}

export function generateCustomersMetrics(params?: Partial<ICustomersMetrics>): ICustomersMetrics {
    return {
        totalNewCustomers: faker.number.int({ min: 1, max: 100 }),
        topCustomers: [],
        customerGrowth: [],
        ...params,
    };
}

export function generateProductsMetrics(params?: Partial<IProducts>): IProducts {
    return {
        topProducts: [],
        ...params,
    };
}

export function generateMetricData(params?: Partial<IMetrics>): IMetrics {
    return {
        orders: generateOrdersMetrics(params?.orders),
        customers: generateCustomersMetrics(params?.customers),
        products: generateProductsMetrics(params?.products),
        ...params, 
    } as IMetrics;
}